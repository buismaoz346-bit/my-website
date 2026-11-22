/* ============================================================
   WATER SOUNDSCAPE ENGINE (Zero-Delay Boot + Synchronized Web Audio)
   - Starts fetching & decoding audio immediately at boot (parallel per-file).
   - Zero-ms procedural pink-noise water stream & chirp drop bridge while
     network fetches complete, seamlessly swapping to real MP3 buffers.
   - Velocity-modulated ambient stream synced to scroll speed.
   - Isolated droplet sprites on taps/presses with cursor stereo pan.
   - Filtered bubble shimmer on desktop card/button hover.
   - Crisp splash dive on opening project modals & lightbox images.
   ============================================================ */
(function () {
    'use strict';
    if (window.__waterAudio) return;

    const STORAGE_KEY = 'maoz_water_audio';
    const AUDIO_BASE = 'Assets/Audio/';
    const FILES = {
        stream: 'stream.mp3',
        drops: 'drops.mp3',
        bubbles: 'bubbles.mp3',
        splash: 'splash.mp3'
    };

    const DROP_SLICES = [
        [0.52, 0.16],
        [1.60, 0.20],
        [2.80, 0.16]
    ];
    const BUBBLE_SLICES = [
        [0.13, 0.14], [0.69, 0.14], [0.91, 0.14], [1.09, 0.12],
        [1.31, 0.13], [1.57, 0.15], [2.07, 0.11], [2.31, 0.13]
    ];
    const SPLASH_SLICE = [0.18, 1.25];

    const ICON_SOUND_ON = '<svg class="ui-icon ui-icon-md" viewBox="0 0 24 24" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>';
    const ICON_SOUND_OFF = '<svg class="ui-icon ui-icon-md" viewBox="0 0 24 24" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/></svg>';

    const FINE_POINTER = window.matchMedia('(hover: hover) and (pointer: fine)');
    const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let enabled = localStorage.getItem(STORAGE_KEY) !== 'off';
    let ctx = null;
    let masterGain = null;
    let compressor = null;
    let buffers = {};
    let rawBytes = {};
    let preloadStarted = false;
    let unlocked = false;

    // Continuous scroll stream nodes
    let streamSource = null;
    let streamFilter = null;
    let streamGain = null;
    let streamMode = 'idle'; // 'idle' | 'synth' | 'real'
    let synthStreamBuffer = null;

    // Cooldown & anti-repeat state
    let lastDropIdx = -1;
    let lastBubbleIdx = -1;
    let lastHoverTarget = null;
    let lastHoverTime = 0;
    let lastPressTime = 0;
    let lastSectionCheckTime = 0;
    let lastActiveHref = '';

    // Scroll tracking state
    let lastScrollY = window.scrollY || 0;
    let lastScrollTime = performance.now();
    let smoothVel = 0;
    let scrollDecayTimer = 0;

    let toggleBtn = null;

    function updateToggleUI() {
        if (!toggleBtn) return;
        toggleBtn.innerHTML = enabled ? ICON_SOUND_ON : ICON_SOUND_OFF;
        toggleBtn.classList.toggle('audio-muted', !enabled);
        toggleBtn.classList.toggle('audio-ready', enabled && unlocked);
        toggleBtn.classList.toggle('audio-pending', enabled && !unlocked);
        toggleBtn.setAttribute('aria-pressed', enabled ? 'true' : 'false');
        const label = !enabled
            ? 'Water sound effects: Muted — click to enable'
            : (unlocked ? 'Water sound effects: On — click to mute' : 'Water sound effects: Ready (tap/scroll to activate) — click to mute');
        toggleBtn.title = label;
        toggleBtn.setAttribute('aria-label', label);
    }

    function createPinkWaterBuffer(audioCtx) {
        if (synthStreamBuffer) return synthStreamBuffer;
        const sr = audioCtx.sampleRate;
        const len = Math.floor(sr * 1.5);
        const buf = audioCtx.createBuffer(2, len, sr);
        for (let ch = 0; ch < 2; ch++) {
            const data = buf.getChannelData(ch);
            let b0 = 0, b1 = 0, b2 = 0, lfo = 0;
            for (let i = 0; i < len; i++) {
                const white = Math.random() * 2 - 1;
                b0 = 0.997 * b0 + white * 0.029;
                b1 = 0.985 * b1 + white * 0.032;
                b2 = 0.950 * b2 + white * 0.048;
                lfo = 0.999 * lfo + (Math.sin(i * 0.0014 + ch * 1.1) * 0.5 + 0.5);
                data[i] = (b0 + b1 + b2) * (0.28 + 0.08 * (lfo / 1000));
            }
        }
        synthStreamBuffer = buf;
        return buf;
    }

    function playSynthDroplet(gainVal) {
        if (!enabled || !ctx || ctx.state !== 'running' || document.hidden) return;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine';
        const f0 = 490 + Math.random() * 110;
        osc.frequency.setValueAtTime(f0, now);
        osc.frequency.exponentialRampToValueAtTime(f0 * 2.35, now + 0.048);
        g.gain.setValueAtTime(0.0001, now);
        g.gain.exponentialRampToValueAtTime(gainVal || 0.14, now + 0.006);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 0.055);
        osc.connect(g);
        g.connect(compressor);
        osc.start(now);
        osc.stop(now + 0.06);
    }

    function ensureStreamNodes() {
        if (!ctx || (streamFilter && streamGain)) return;
        streamFilter = ctx.createBiquadFilter();
        streamFilter.type = 'lowpass';
        streamFilter.frequency.setValueAtTime(700, ctx.currentTime);
        streamFilter.Q.setValueAtTime(0.8, ctx.currentTime);

        streamGain = ctx.createGain();
        streamGain.gain.setValueAtTime(0.0001, ctx.currentTime);
        streamFilter.connect(streamGain);
        streamGain.connect(compressor);
    }

    function startOrSwapStream(useReal) {
        if (!ctx) return;
        ensureStreamNodes();
        if (useReal && buffers.stream) {
            if (streamMode === 'real' && streamSource) return;
            if (streamSource) {
                try { streamSource.stop(); streamSource.disconnect(); } catch (_) {}
            }
            const src = ctx.createBufferSource();
            src.buffer = buffers.stream;
            src.loop = true;
            src.loopStart = 0.25;
            src.loopEnd = Math.max(1.5, buffers.stream.duration - 0.25);
            src.playbackRate.setValueAtTime(streamSource ? streamSource.playbackRate.value : 0.92, ctx.currentTime);
            src.connect(streamFilter);
            src.start(0, 0.25);
            streamSource = src;
            streamMode = 'real';
        } else if (!streamSource) {
            const src = ctx.createBufferSource();
            src.buffer = createPinkWaterBuffer(ctx);
            src.loop = true;
            src.playbackRate.setValueAtTime(0.92, ctx.currentTime);
            src.connect(streamFilter);
            src.start(0);
            streamSource = src;
            streamMode = 'synth';
        }
    }

    function removeUnlockListeners() {
        ['pointerdown', 'touchstart', 'mousedown', 'keydown', 'wheel', 'scroll'].forEach(evt => {
            window.removeEventListener(evt, resumeOnGesture, true);
        });
    }

    function syncCtxState() {
        if (!ctx) return;
        unlocked = (ctx.state === 'running');
        if (unlocked) {
            removeUnlockListeners();
            startOrSwapStream(!!buffers.stream);
        }
        updateToggleUI();
    }

    function ensureContext() {
        if (ctx) return ctx;
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return null;
        ctx = new AudioCtx({ latencyHint: 'interactive' });
        compressor = ctx.createDynamicsCompressor();
        compressor.threshold.setValueAtTime(-16, ctx.currentTime);
        compressor.knee.setValueAtTime(14, ctx.currentTime);
        compressor.ratio.setValueAtTime(4, ctx.currentTime);
        compressor.attack.setValueAtTime(0.004, ctx.currentTime);
        compressor.release.setValueAtTime(0.18, ctx.currentTime);

        masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(enabled ? 0.9 : 0.0001, ctx.currentTime);
        compressor.connect(masterGain);
        masterGain.connect(ctx.destination);

        ctx.onstatechange = syncCtxState;
        ensureStreamNodes();
        startOrSwapStream(!!buffers.stream);
        syncCtxState();
        return ctx;
    }

    function decodeBuffer(key, arrayBuf) {
        const audioCtx = ensureContext();
        if (!audioCtx || buffers[key]) return Promise.resolve(buffers[key]);
        // Clone buffer slice so decodeAudioData detaching does not reuse invalid ref
        return audioCtx.decodeAudioData(arrayBuf.slice(0))
            .then(decoded => {
                buffers[key] = decoded;
                if (key === 'stream') startOrSwapStream(true);
                return decoded;
            })
            .catch(() => null);
    }

    // Start fetching & decoding EVERY file immediately in parallel at boot (zero first-click stall)
    function startImmediatePreload() {
        if (preloadStarted) return;
        preloadStarted = true;
        if (enabled) {
            const c = ensureContext();
            if (c && c.state === 'suspended' && !document.hidden) {
                c.resume().then(syncCtxState).catch(() => {});
            }
        }
        Object.entries(FILES).forEach(([key, filename]) => {
            fetch(AUDIO_BASE + filename, { priority: key === 'stream' || key === 'drops' ? 'high' : 'auto' })
                .then(res => {
                    if (!res.ok) throw new Error('HTTP ' + res.status);
                    return res.arrayBuffer();
                })
                .then(arr => {
                    rawBytes[key] = arr;
                    if (enabled) return decodeBuffer(key, arr);
                })
                .catch(() => { /* Graceful no-op */ });
        });
    }

    function resumeOnGesture() {
        if (!enabled) return;
        startImmediatePreload();
        const audioCtx = ensureContext();
        if (!audioCtx) return;
        if (audioCtx.state === 'suspended' && !document.hidden) {
            audioCtx.resume().then(syncCtxState).catch(() => {});
        } else {
            syncCtxState();
        }
        Object.keys(rawBytes).forEach(k => {
            if (!buffers[k]) decodeBuffer(k, rawBytes[k]);
        });
    }

    function playSprite(bufferKey, offset, duration, opts) {
        if (!enabled || !ctx || document.hidden) return false;
        const buf = buffers[bufferKey];
        if (!buf) return false;
        if (ctx.state === 'suspended') {
            ctx.resume().catch(() => {});
        }

        const now = ctx.currentTime;
        const rate = (opts && opts.rate) || 1.0;
        const vol = (opts && opts.gain) || 0.2;
        const cutoff = opts && opts.lowpass;
        const clientX = opts && opts.clientX;
        const fadeIn = (opts && opts.fadeIn) || 0.006;
        const fadeOut = (opts && opts.fadeOut) || 0.035;

        const src = ctx.createBufferSource();
        src.buffer = buf;
        src.playbackRate.setValueAtTime(rate, now);

        const gainNode = ctx.createGain();
        const playDur = duration / rate;
        const attackEnd = now + Math.min(fadeIn, playDur * 0.25);
        const fadeStart = now + Math.max(attackEnd - now + 0.01, playDur - fadeOut);

        gainNode.gain.setValueAtTime(0.0001, now);
        gainNode.gain.exponentialRampToValueAtTime(Math.max(0.001, vol), attackEnd);
        gainNode.gain.setValueAtTime(Math.max(0.001, vol), fadeStart);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + playDur);

        let lastNode = src;
        if (cutoff) {
            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(cutoff, now);
            filter.Q.setValueAtTime(0.7, now);
            lastNode.connect(filter);
            lastNode = filter;
        }
        lastNode.connect(gainNode);

        if (typeof clientX === 'number' && typeof ctx.createStereoPanner === 'function') {
            const pan = ctx.createStereoPanner();
            const panVal = Math.max(-0.45, Math.min(0.45, ((clientX / (window.innerWidth || 1280)) * 2 - 1) * 0.42));
            pan.pan.setValueAtTime(panVal, now);
            gainNode.connect(pan);
            pan.connect(compressor);
        } else {
            gainNode.connect(compressor);
        }

        src.start(now, offset, Math.min(duration, Math.max(0.05, buf.duration - offset)));
        return true;
    }

    function pickSlice(arr, lastIdx) {
        let idx = Math.floor(Math.random() * arr.length);
        if (arr.length > 1 && idx === lastIdx) {
            idx = (idx + 1 + Math.floor(Math.random() * (arr.length - 1))) % arr.length;
        }
        return [idx, arr[idx]];
    }

    function playDroplet(clientX, pitchBoost) {
        const [idx, slice] = pickSlice(DROP_SLICES, lastDropIdx);
        lastDropIdx = idx;
        const rate = (pitchBoost || 1.0) * (0.94 + Math.random() * 0.16);
        if (!playSprite('drops', slice[0], slice[1], { gain: 0.24, rate, clientX, fadeIn: 0.005, fadeOut: 0.03 })) {
            playSynthDroplet(0.14);
        }
    }

    function playBubble(clientX) {
        const [idx, slice] = pickSlice(BUBBLE_SLICES, lastBubbleIdx);
        lastBubbleIdx = idx;
        const rate = 1.06 + Math.random() * 0.22;
        if (!playSprite('bubbles', slice[0], slice[1], { gain: 0.085, rate, lowpass: 1850, clientX, fadeIn: 0.008, fadeOut: 0.035 })) {
            playSynthDroplet(0.055);
        }
    }

    function playSplash(clientX) {
        if (!playSprite('splash', SPLASH_SLICE[0], SPLASH_SLICE[1], {
            gain: 0.24,
            rate: 0.98 + Math.random() * 0.06,
            lowpass: 3400,
            clientX,
            fadeIn: 0.012,
            fadeOut: 0.18
        })) {
            playSynthDroplet(0.16);
        }
    }

    function decayStream() {
        scrollDecayTimer = 0;
        smoothVel = 0;
        if (!ctx || !streamGain || !streamFilter || !streamSource) return;
        const now = ctx.currentTime;
        streamGain.gain.setTargetAtTime(0.0001, now, 0.09);
        streamFilter.frequency.setTargetAtTime(700, now, 0.08);
        streamSource.playbackRate.setTargetAtTime(0.92, now, 0.09);
    }

    function handleScroll() {
        if (!enabled || REDUCED_MOTION || document.hidden) return;
        const nowMs = performance.now();
        const curY = window.scrollY || 0;
        const dt = Math.max(8, nowMs - lastScrollTime);
        const rawVel = Math.abs(curY - lastScrollY) / dt;
        lastScrollY = curY;
        lastScrollTime = nowMs;

        smoothVel = smoothVel * 0.55 + Math.min(rawVel, 3.6) * 0.45;
        if (scrollDecayTimer) clearTimeout(scrollDecayTimer);
        scrollDecayTimer = setTimeout(decayStream, 120);

        if (!ctx) ensureContext();
        if (ctx && ctx.state === 'suspended') {
            ctx.resume().then(syncCtxState).catch(() => {});
        }
        if (!ctx || !streamGain || !streamSource) return;

        const norm = Math.min(1, smoothVel / 2.5);
        const t = ctx.currentTime;
        const baseScale = streamMode === 'real' ? 1.45 : 0.38;
        const floorGain = streamMode === 'real' ? 0.08 : 0.03;
        const targetGain = norm > 0.02 ? (floorGain + norm * baseScale) : 0.0001;

        streamGain.gain.setTargetAtTime(targetGain, t, 0.045);
        streamFilter.frequency.setTargetAtTime(700 + norm * 3500, t, 0.05);
        streamSource.playbackRate.setTargetAtTime(0.90 + norm * 0.30, t, 0.06);

        if (nowMs - lastSectionCheckTime >= 800) {
            lastSectionCheckTime = nowMs;
            const activeNav = document.querySelector('.nav-links a.active');
            const href = activeNav ? activeNav.getAttribute('href') : '';
            if (href && href !== lastActiveHref) {
                if (lastActiveHref) {
                    playSprite('drops', 1.60, 0.18, { gain: 0.09, rate: 1.15, fadeIn: 0.008, fadeOut: 0.04 });
                }
                lastActiveHref = href;
            }
        }
    }

    const PRESS_SELECTOR = [
        'a', 'button', '.btn-primary', '.btn-secondary', '.btn-download',
        '.filter-tab', '.cert-card', '.stl-download-btn', '.like-btn',
        '.gallery-thumbnails img', '.gallery-nav-left', '.gallery-nav-right',
        '.ai-toggle-btn', '.back-to-top', '.social-container button'
    ].join(',');

    function handlePointerDown(e) {
        if (!enabled) return;
        const target = e.target;
        if (target && target.closest && target.closest('#water-audio-toggle')) return;
        resumeOnGesture();
        if (!target || !target.closest) return;

        if (target.closest('.modal-close, .lightbox-close')) {
            if (!playSprite('drops', 2.80, 0.16, { gain: 0.18, rate: 1.26, clientX: e.clientX })) {
                playSynthDroplet(0.14);
            }
            return;
        }
        if (target.closest('.project-card, .clickable-image')) {
            playSplash(e.clientX);
            return;
        }
        if (target.closest(PRESS_SELECTOR)) {
            const now = performance.now();
            if (now - lastPressTime > 55) {
                lastPressTime = now;
                playDroplet(e.clientX, 1.0);
            }
        }
    }

    const HOVER_SELECTOR = [
        '.project-card', '.cert-card', '.trait-card', '.edu-card',
        '.premium-skill-card', '.timeline-content', '.nav-links a',
        '.btn-primary', '.btn-secondary', '.btn-download', '.filter-tab',
        '.stl-download-btn', '.social-container', '.ai-toggle-btn'
    ].join(',');

    function handlePointerOver(e) {
        if (!enabled || REDUCED_MOTION || document.hidden) return;
        if (!ctx || ctx.state !== 'running') return;
        const target = e.target && e.target.closest ? e.target.closest(HOVER_SELECTOR) : null;
        if (!target) {
            lastHoverTarget = null;
            return;
        }
        if (target === lastHoverTarget) return;
        lastHoverTarget = target;

        const now = performance.now();
        if (now - lastHoverTime < 95) return;
        lastHoverTime = now;
        playBubble(e.clientX);
    }

    function mountToggleButton() {
        if (document.getElementById('water-audio-toggle')) return;
        toggleBtn = document.createElement('button');
        toggleBtn.id = 'water-audio-toggle';
        toggleBtn.type = 'button';
        toggleBtn.addEventListener('click', () => {
            enabled = !enabled;
            localStorage.setItem(STORAGE_KEY, enabled ? 'on' : 'off');
            if (enabled) {
                startImmediatePreload();
                const c = ensureContext();
                if (c) {
                    c.resume().then(() => {
                        syncCtxState();
                        if (masterGain) masterGain.gain.setTargetAtTime(0.9, c.currentTime, 0.03);
                        playDroplet(undefined, 1.08);
                    }).catch(() => {});
                }
            } else {
                if (scrollDecayTimer) clearTimeout(scrollDecayTimer);
                decayStream();
                if (masterGain && ctx) {
                    masterGain.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.03);
                }
            }
            updateToggleUI();
        });
        document.body.appendChild(toggleBtn);
        updateToggleUI();
    }

    // Boot immediately so fetch, decode, and AudioContext resume start at millisecond 0
    startImmediatePreload();

    // Auto-unlock on earliest user interaction if browser suspended cold AudioContext
    ['pointerdown', 'touchstart', 'mousedown', 'keydown', 'wheel', 'scroll'].forEach(evt => {
        window.addEventListener(evt, resumeOnGesture, { passive: true, capture: true });
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('pointerdown', handlePointerDown, { passive: true });

    if (FINE_POINTER.matches) {
        document.addEventListener('pointerover', handlePointerOver, { passive: true });
        document.addEventListener('pointerout', (e) => {
            if (!e.relatedTarget) lastHoverTarget = null;
        }, { passive: true });
    }

    document.addEventListener('visibilitychange', () => {
        if (!ctx) return;
        if (document.hidden) {
            decayStream();
            ctx.suspend().catch(() => {});
        } else if (enabled) {
            ctx.resume().then(syncCtxState).catch(() => {});
        }
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mountToggleButton);
    } else {
        mountToggleButton();
    }

    window.__waterAudio = {
        getState: () => ({
            enabled,
            unlocked,
            ctxState: ctx ? ctx.state : 'uninitialized',
            streamMode,
            decoded: Object.fromEntries(
                Object.entries(buffers).map(([k, b]) => [k, Number(b.duration.toFixed(2))])
            )
        })
    };
})();
