/* ============================================================
   WATER SOUNDSCAPE ENGINE (Synchronized Interactive Web Audio)
   - Velocity-modulated ambient stream synchronized to scroll speed.
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

    // Exact measured active transient slices [offsetSec, durationSec]
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
    let loadPromise = null;
    let unlocked = false;

    // Continuous scroll stream nodes (started once stream buffer decodes)
    let streamSource = null;
    let streamFilter = null;
    let streamGain = null;

    // Cooldown & anti-repeat state
    let lastDropIdx = -1;
    let lastBubbleIdx = -1;
    let lastHoverTarget = null;
    let lastHoverTime = 0;
    let lastPressTime = 0;
    let lastSectionCheckTime = 0;
    let lastActiveHref = '';

    // Scroll tracking state (zero layout reads during scroll)
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
            : (unlocked ? 'Water sound effects: On — click to mute' : 'Water sound effects: Ready (activates on interaction) — click to mute');
        toggleBtn.title = label;
        toggleBtn.setAttribute('aria-label', label);
    }

    function ensureContext() {
        if (ctx) return ctx;
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return null;
        ctx = new AudioCtx();
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
        return ctx;
    }

    function loadAllBuffers() {
        if (loadPromise) return loadPromise;
        const audioCtx = ensureContext();
        if (!audioCtx) return Promise.resolve(buffers);

        loadPromise = Promise.all(
            Object.entries(FILES).map(([key, filename]) =>
                fetch(AUDIO_BASE + filename)
                    .then(res => {
                        if (!res.ok) throw new Error('HTTP ' + res.status);
                        return res.arrayBuffer();
                    })
                    .then(arr => audioCtx.decodeAudioData(arr))
                    .then(decoded => {
                        buffers[key] = decoded;
                    })
                    .catch(() => { /* Graceful no-op on offline/file:// restrictions */ })
            )
        ).then(() => {
            startStreamLoop();
            return buffers;
        });
        return loadPromise;
    }

    function startStreamLoop() {
        if (!ctx || streamSource || !buffers.stream) return;
        streamSource = ctx.createBufferSource();
        streamSource.buffer = buffers.stream;
        streamSource.loop = true;
        streamSource.loopStart = 0.4;
        streamSource.loopEnd = Math.min(26.2, Math.max(2.0, buffers.stream.duration - 0.5));
        streamSource.playbackRate.setValueAtTime(0.92, ctx.currentTime);

        streamFilter = ctx.createBiquadFilter();
        streamFilter.type = 'lowpass';
        streamFilter.frequency.setValueAtTime(700, ctx.currentTime);
        streamFilter.Q.setValueAtTime(0.8, ctx.currentTime);

        streamGain = ctx.createGain();
        streamGain.gain.setValueAtTime(0.0001, ctx.currentTime);

        streamSource.connect(streamFilter);
        streamFilter.connect(streamGain);
        streamGain.connect(compressor);
        streamSource.start(0, 0.4);
    }

    function unlockAndPreload() {
        const audioCtx = ensureContext();
        if (!audioCtx) return;
        if (audioCtx.state === 'suspended' && enabled && !document.hidden) {
            audioCtx.resume().catch(() => {});
        }
        if (!unlocked && enabled) {
            unlocked = true;
            updateToggleUI();
        }
        loadAllBuffers();
    }

    function playSprite(bufferKey, offset, duration, opts) {
        if (!enabled || !ctx || document.hidden) return;
        const buf = buffers[bufferKey];
        if (!buf) return;
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
        playSprite('drops', slice[0], slice[1], { gain: 0.24, rate, clientX, fadeIn: 0.005, fadeOut: 0.03 });
    }

    function playBubble(clientX) {
        const [idx, slice] = pickSlice(BUBBLE_SLICES, lastBubbleIdx);
        lastBubbleIdx = idx;
        const rate = 1.06 + Math.random() * 0.22;
        playSprite('bubbles', slice[0], slice[1], { gain: 0.085, rate, lowpass: 1850, clientX, fadeIn: 0.008, fadeOut: 0.035 });
    }

    function playSplash(clientX) {
        playSprite('splash', SPLASH_SLICE[0], SPLASH_SLICE[1], {
            gain: 0.24,
            rate: 0.98 + Math.random() * 0.06,
            lowpass: 3400,
            clientX,
            fadeIn: 0.012,
            fadeOut: 0.18
        });
    }

    // --- Scroll Velocity Stream Sync (zero forced layout, zero idle rAF) ---
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
        const rawVel = Math.abs(curY - lastScrollY) / dt; // px / ms
        lastScrollY = curY;
        lastScrollTime = nowMs;

        smoothVel = smoothVel * 0.55 + Math.min(rawVel, 3.6) * 0.45;
        if (scrollDecayTimer) clearTimeout(scrollDecayTimer);
        scrollDecayTimer = setTimeout(decayStream, 120);

        if (!ctx || !unlocked || !buffers.stream || !streamGain) return;

        const norm = Math.min(1, smoothVel / 2.5);
        const t = ctx.currentTime;
        // Compensate gently for stream.mp3's low RMS (0.024)
        const targetGain = norm > 0.02 ? (0.08 + norm * 1.45) : 0.0001;
        streamGain.gain.setTargetAtTime(targetGain, t, 0.045);
        streamFilter.frequency.setTargetAtTime(700 + norm * 3500, t, 0.05);
        streamSource.playbackRate.setTargetAtTime(0.90 + norm * 0.30, t, 0.06);

        // Whisper-soft droplet when crossing into a new section (throttled >= 800ms)
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

    // --- Pointer Press / Modal Dive & Close ---
    const PRESS_SELECTOR = [
        'a', 'button', '.btn-primary', '.btn-secondary', '.btn-download',
        '.filter-tab', '.cert-card', '.stl-download-btn', '.like-btn',
        '.gallery-thumbnails img', '.gallery-nav-left', '.gallery-nav-right',
        '.ai-toggle-btn', '.back-to-top', '.social-container button'
    ].join(',');

    function handlePointerDown(e) {
        if (!enabled) return;
        const target = e.target;
        if (target && target.closest && target.closest('#water-audio-toggle')) {
            return; // Toggle handles its own confirmation sound cleanly
        }
        unlockAndPreload();
        if (!target || !target.closest) return;

        if (target.closest('.modal-close, .lightbox-close')) {
            playSprite('drops', 2.80, 0.16, { gain: 0.18, rate: 1.26, clientX: e.clientX });
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

    // --- Hover Liquid Shimmer (Desktop Fine Pointers Only) ---
    const HOVER_SELECTOR = [
        '.project-card', '.cert-card', '.trait-card', '.edu-card',
        '.premium-skill-card', '.timeline-content', '.nav-links a',
        '.btn-primary', '.btn-secondary', '.btn-download', '.filter-tab',
        '.stl-download-btn', '.social-container', '.ai-toggle-btn'
    ].join(',');

    function handlePointerOver(e) {
        if (!enabled || !unlocked || REDUCED_MOTION || document.hidden) return;
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

    // --- Floating Liquid Glass Toggle Button ---
    function mountToggleButton() {
        if (document.getElementById('water-audio-toggle')) return;
        toggleBtn = document.createElement('button');
        toggleBtn.id = 'water-audio-toggle';
        toggleBtn.type = 'button';
        toggleBtn.addEventListener('click', () => {
            enabled = !enabled;
            localStorage.setItem(STORAGE_KEY, enabled ? 'on' : 'off');
            if (enabled) {
                unlocked = true;
                ensureContext();
                if (ctx && ctx.state === 'suspended') {
                    ctx.resume().catch(() => {});
                }
                if (masterGain && ctx) {
                    masterGain.gain.setTargetAtTime(0.9, ctx.currentTime, 0.03);
                }
                loadAllBuffers().then(() => {
                    playDroplet(undefined, 1.08);
                    updateToggleUI();
                });
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

    // Bind events cleanly
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('pointerdown', handlePointerDown, { passive: true });
    document.addEventListener('keydown', () => {
        if (enabled && !unlocked) unlockAndPreload();
    }, { passive: true, once: true });

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
        } else if (enabled && unlocked) {
            ctx.resume().catch(() => {});
        }
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mountToggleButton);
    } else {
        mountToggleButton();
    }

    // Minimal diagnostic/state API
    window.__waterAudio = {
        getState: () => ({
            enabled,
            unlocked,
            ctxState: ctx ? ctx.state : 'uninitialized',
            decoded: Object.fromEntries(
                Object.entries(buffers).map(([k, b]) => [k, Number(b.duration.toFixed(2))])
            )
        })
    };
})();
