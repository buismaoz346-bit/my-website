/* ============================================================
   REAL LIQUID GLASS ENGINE (WebGL SDF Optical Refraction)
   Based on the liquid-glass skill (dashersw/liquid-glass-js).
   - Samples Picture/glass-bg.jpg directly on the GPU with cover crop.
   - Crystal-clear optical glass (NO heavy frosted blur):
     multi-band Edge / Rim / Base lens bending, Corner Boost,
     R/G/B Chromatic Dispersion, Fresnel Specular Rim Lighting,
     Cursor-Reactive Ripple Effect, and Soft Drop Shadows.
   - Zero getComputedStyle calls in the render loop + immediate
     scroll-synced draws for silky, zero-jitter scrolling.
   - Zero control panel UI; graceful CSS fallback if WebGL fails.
   ============================================================ */
(function () {
    'use strict';
    if (window.__liquidGlass) return;
    window.__liquidGlass = true;

    var root = document.documentElement;
    var MAX = 24;
    var coarse = window.matchMedia('(pointer: coarse)').matches;
    var DPR_CAP = coarse ? 1.25 : 1.75;
    var reduceMQ = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Curated clear liquid-glass optical parameters (no control panel UI)
    var PARAMS = {
        edgeIntensity: 0.145,
        rimIntensity:  0.280,
        baseIntensity: 0.045,
        edgeDistance:  0.550,
        rimDistance:   2.100,
        baseDistance:  0.350,
        cornerBoost:   0.260,
        rippleEffect:  0.350,
        tintOpacity:   0.380
    };

    // In-flow page cards directly above #lg-canvas (fixed .navbar & .project-card excluded)
    var SELECTOR = [
        '.freelance-badge',
        '.hero-stats',
        '.about-card',
        '.traits-summary',
        '.trait-card',
        '.cert-card',
        '.timeline-content',
        '.premium-skill-card',
        '.edu-card',
        '.contact-card',
        '.filter-search-container'
    ].join(',');

    var canvas = document.createElement('canvas');
    canvas.id = 'lg-canvas';
    canvas.setAttribute('aria-hidden', 'true');

    var gl = null;
    try {
        gl = canvas.getContext('webgl', {
            alpha: false,
            antialias: false,
            depth: false,
            stencil: false,
            premultipliedAlpha: false,
            preserveDrawingBuffer: false,
            powerPreference: 'high-performance'
        });
    } catch (e) {
        gl = null;
    }
    if (!gl) return;

    var VERT = 'attribute vec2 aPos; void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }';

    var FRAG = [
        'precision highp float;',
        '#define MAX ' + MAX,
        'uniform sampler2D uBg;',
        'uniform vec2  uRes;',
        'uniform vec2  uImgRes;',
        'uniform float uDpr;',
        'uniform float uTime;',
        'uniform float uMotion;',
        'uniform vec2  uMouse;',
        'uniform vec3  uClick;',
        'uniform int   uCount;',
        'uniform vec4  uRects[MAX];',   // x, y, w, h (device px, top-left origin)
        'uniform float uRadius[MAX];',
        'uniform vec2  uState[MAX];',   // x = opacity, y = hover

        'uniform float uEdgeIntensity;',
        'uniform float uRimIntensity;',
        'uniform float uBaseIntensity;',
        'uniform float uEdgeDistance;',
        'uniform float uRimDistance;',
        'uniform float uBaseDistance;',
        'uniform float uCornerBoost;',
        'uniform float uRippleEffect;',
        'uniform float uTintOpacity;',

        'float sdRoundBox(vec2 p, vec2 b, float r){',
        '  vec2 q = abs(p) - b + r;',
        '  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;',
        '}',

        // CSS background-size: cover UV mapping with subtle outer vignette
        'vec3 sampleWallpaper(vec2 px){',
        '  vec2 sUv = px / uRes;',
        '  float va = uRes.x / max(uRes.y, 1.0);',
        '  float ia = uImgRes.x / max(uImgRes.y, 1.0);',
        '  vec2 sc = va > ia ? vec2(1.0, ia / va) : vec2(va / ia, 1.0);',
        '  vec2 uv = clamp((sUv - 0.5) * sc + 0.5, vec2(0.001), vec2(0.999));',
        '  vec3 c = texture2D(uBg, uv).rgb;',
        '  float vig = length((sUv - 0.5) * vec2(1.15, 1.05));',
        '  c *= 1.0 - smoothstep(0.35, 1.05, vig) * 0.34;',
        '  return c;',
        '}',

        // Clear optical glass sample: crisp refraction + R/G/B chromatic prism dispersion (NO muddy blur)
        'vec3 clearGlassSample(vec2 base, vec2 off, float chroma){',
        '  float aaPx = 1.15 * uDpr;',
        '  vec3 acc = vec3(0.0);',
        '  vec2 pR = base + off * (1.0 + chroma);',
        '  vec2 pG = base + off;',
        '  vec2 pB = base + off * (1.0 - chroma);',
        '  vec2 d0 = vec2( aaPx,  aaPx * 0.5);',
        '  vec2 d1 = vec2(-aaPx,  aaPx * 0.5);',
        '  vec2 d2 = vec2( aaPx * 0.5, -aaPx);',
        '  vec2 d3 = vec2(-aaPx * 0.5, -aaPx);',
        '  acc.r = (sampleWallpaper(pR + d0).r + sampleWallpaper(pR + d1).r + sampleWallpaper(pR + d2).r + sampleWallpaper(pR + d3).r) * 0.25;',
        '  acc.g = (sampleWallpaper(pG + d0).g + sampleWallpaper(pG + d1).g + sampleWallpaper(pG + d2).g + sampleWallpaper(pG + d3).g) * 0.25;',
        '  acc.b = (sampleWallpaper(pB + d0).b + sampleWallpaper(pB + d1).b + sampleWallpaper(pB + d2).b + sampleWallpaper(pB + d3).b) * 0.25;',
        '  return acc;',
        '}',

        'void main(){',
        '  vec2 frag = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);',
        '  vec3 bgc = sampleWallpaper(frag);',

        '  float shadow = 0.0;',
        '  float found = 0.0; float selD = 1e5; float selR = 0.0; float selA = 0.0; float selHov = 0.0;',
        '  vec2 selC = vec2(0.0); vec2 selH = vec2(1.0);',

        '  for (int i = 0; i < MAX; i++){',
        '    if (i >= uCount) break;',
        '    vec4 r = uRects[i];',
        '    vec2 h = r.zw * 0.5;',
        '    vec2 c = r.xy + h;',
        '    float rad = min(uRadius[i], min(h.x, h.y));',
        '    float a = uState[i].x;',
        '    float d = sdRoundBox(frag - c, h, rad);',
        '    float ds = sdRoundBox(frag - c - vec2(0.0, 12.0 * uDpr), h, rad);',
        '    shadow = max(shadow, (1.0 - smoothstep(-10.0 * uDpr, 34.0 * uDpr, ds)) * a);',
        '    if (d < 1.5 * uDpr){',
        '      found = 1.0; selD = d; selC = c; selH = h; selR = rad; selA = a; selHov = uState[i].y;',
        '    }',
        '  }',

        '  vec3 outside = bgc * (1.0 - 0.52 * shadow);',
        '  if (found < 0.5){ gl_FragColor = vec4(outside, 1.0); return; }',

        '  vec2 p = frag - selC;',
        '  float depth = max(-selD, 0.0);',

        // Surface normal via SDF gradient
        '  float e = 1.2;',
        '  vec2 n = vec2(',
        '    sdRoundBox(p + vec2(e, 0.0), selH, selR) - sdRoundBox(p - vec2(e, 0.0), selH, selR),',
        '    sdRoundBox(p + vec2(0.0, e), selH, selR) - sdRoundBox(p - vec2(0.0, e), selH, selR));',
        '  n = length(n) > 1e-5 ? normalize(n) : vec2(0.0);',

        // Multi-band optical refraction falloffs (Edge, Rim, Base)
        '  float edgeFalloff = exp(-depth / max(uEdgeDistance * 16.0 * uDpr, 1.0));',
        '  float rimFalloff  = exp(-depth / max(uRimDistance  * 22.0 * uDpr, 1.0));',
        '  float baseFalloff = exp(-depth / max(uBaseDistance * 90.0 * uDpr, 1.0));',

        // Corner boost: amplifies refraction where both axes approach rounded corners
        '  vec2 cornerVec = max(abs(p) - (selH - selR), 0.0) / max(selR, 1.0);',
        '  float cornerFactor = clamp(length(cornerVec), 0.0, 1.0) * edgeFalloff;',
        '  float cornerAmt = cornerFactor * uCornerBoost * 1.8;',

        '  float totalIntensity = (',
        '      uEdgeIntensity * 3.0 * edgeFalloff +',
        '      uRimIntensity  * 2.1 * rimFalloff  +',
        '      uBaseIntensity * 1.4 * baseFalloff +',
        '      cornerAmt',
        '  ) * (1.0 + 0.22 * selHov);',

        '  vec2 off = -n * totalIntensity * 145.0 * uDpr;',

        // Cursor-centered liquid ripple + gentle ambient bevel wave
        '  if (uRippleEffect > 0.001 && uMotion > 0.5){',
        '    float md = length(frag - uMouse);',
        '    float mouseWave = sin(md * 0.065 / uDpr - uTime * 6.0) * exp(-md / (170.0 * uDpr)) * selHov;',
        '    float ambientWave = sin((p.x * 0.025 + p.y * 0.025) / uDpr - uTime * 2.0) * 0.16 * rimFalloff;',
        '    vec2 rDir = md > 1.0 ? (frag - uMouse) / md : n;',
        '    off += (rDir * mouseWave + n * ambientWave) * uRippleEffect * 14.0 * uDpr;',
        '  }',

        // Crisp tap ripple wave on pointerdown
        '  float age = uTime - uClick.z;',
        '  if (age > 0.0 && age < 1.25 && uMotion > 0.5){',
        '    vec2 dc = frag - uClick.xy;',
        '    float dist = length(dc);',
        '    float front = age * 520.0 * uDpr;',
        '    float w = exp(-pow((dist - front) / (24.0 * uDpr), 2.0)) * exp(-age * 2.8);',
        '    off += (dist > 1.0 ? dc / dist : n) * w * 18.0 * uDpr;',
        '  }',

        // Chromatic prism dispersion concentrated at the curved glass bezel & corners
        '  float chroma = clamp((edgeFalloff * 0.20 + cornerFactor * 0.18 + rimFalloff * 0.06), 0.02, 0.30);',
        '  vec3 g = clearGlassSample(frag, off, chroma);',

        // Clear smoked optical glass absorption (preserves crisp refracted image while guaranteeing high-contrast white text)
        '  float bodyTint = uTintOpacity * (1.0 - 0.52 * edgeFalloff) + 0.04 * selHov;',
        '  g = mix(g, vec3(0.025, 0.035, 0.065), bodyTint);',

        // Glass body subtle glossy surface reflection from top-left
        '  float topSheen = clamp(1.0 - ((p.y + selH.y) / max(selH.y * 0.85, 1.0)), 0.0, 1.0);',
        '  g += pow(topSheen, 2.6) * 0.075;',

        // Specular Fresnel bezel rim lighting (authentic curved glass lip)
        '  g += (edgeFalloff * uEdgeIntensity + rimFalloff * uRimIntensity * 0.55) * 0.28;',
        '  float rim = 1.0 - smoothstep(0.0, 2.2 * uDpr, depth);',
        '  float lightAlign = abs(dot(n, normalize(vec2(-0.68, -0.74))));',
        '  g += rim * (0.14 + 0.68 * pow(lightAlign, 3.5));',

        // Top inner highlight & bottom inner thickness shade
        '  float topLight = (1.0 - smoothstep(0.0, 18.0 * uDpr, depth)) * max(-n.y, 0.0);',
        '  g += topLight * 0.14;',
        '  float botShade = (1.0 - smoothstep(0.0, 14.0 * uDpr, depth)) * max(n.y, 0.0);',
        '  g *= 1.0 - botShade * 0.18;',

        // Anti-aliased glass boundary + razor-thin crisp specular hairline
        '  float aa = smoothstep(-0.75 * uDpr, 0.75 * uDpr, selD);',
        '  vec3 col = mix(g, outside, aa);',
        '  float hair = exp(-pow((selD - 0.3 * uDpr) / (0.8 * uDpr), 2.0));',
        '  col = mix(col, min(col + vec3(0.28, 0.34, 0.44), vec3(1.0)), hair * (0.28 + 0.32 * pow(lightAlign, 2.0)));',
        '  col = mix(outside, col, selA);',

        '  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);',
        '}'
    ].join('\n');

    var prog = null, loc = {}, tex = null;
    var imgW = 1920, imgH = 1080;

    function compile(type, src) {
        var s = gl.createShader(type);
        gl.shaderSource(s, src);
        gl.compileShader(s);
        if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
            console.warn('[liquid-glass] shader error:', gl.getShaderInfoLog(s));
            return null;
        }
        return s;
    }

    function initGL() {
        var vs = compile(gl.VERTEX_SHADER, VERT);
        var fs = compile(gl.FRAGMENT_SHADER, FRAG);
        if (!vs || !fs) return false;
        prog = gl.createProgram();
        gl.attachShader(prog, vs);
        gl.attachShader(prog, fs);
        gl.linkProgram(prog);
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
            console.warn('[liquid-glass] link error:', gl.getProgramInfoLog(prog));
            return false;
        }
        gl.useProgram(prog);

        var buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        var aPos = gl.getAttribLocation(prog, 'aPos');
        gl.enableVertexAttribArray(aPos);
        gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

        [
            'uBg', 'uRes', 'uImgRes', 'uDpr', 'uTime', 'uMotion', 'uMouse', 'uClick',
            'uCount', 'uRects', 'uRadius', 'uState',
            'uEdgeIntensity', 'uRimIntensity', 'uBaseIntensity',
            'uEdgeDistance', 'uRimDistance', 'uBaseDistance',
            'uCornerBoost', 'uRippleEffect', 'uTintOpacity'
        ].forEach(function (name) {
            loc[name] = gl.getUniformLocation(prog, name);
        });

        tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        // 1x1 black placeholder until Picture/glass-bg.jpg finishes loading
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]));
        gl.uniform1i(loc.uBg, 0);

        // Upload static optical parameters once
        gl.uniform1f(loc.uEdgeIntensity, PARAMS.edgeIntensity);
        gl.uniform1f(loc.uRimIntensity,  PARAMS.rimIntensity);
        gl.uniform1f(loc.uBaseIntensity, PARAMS.baseIntensity);
        gl.uniform1f(loc.uEdgeDistance,  PARAMS.edgeDistance);
        gl.uniform1f(loc.uRimDistance,   PARAMS.rimDistance);
        gl.uniform1f(loc.uBaseDistance,  PARAMS.baseDistance);
        gl.uniform1f(loc.uCornerBoost,   PARAMS.cornerBoost);
        gl.uniform1f(loc.uRippleEffect,  PARAMS.rippleEffect);
        gl.uniform1f(loc.uTintOpacity,   PARAMS.tintOpacity);

        return true;
    }

    function teardown() {
        stop();
        root.classList.remove('lg-active');
        if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    }

    var bgImage = null;
    function uploadBgTexture(img) {
        if (!gl || !tex || !img) return false;
        try {
            gl.bindTexture(gl.TEXTURE_2D, tex);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
            imgW = img.naturalWidth || 1920;
            imgH = img.naturalHeight || 1080;
            return true;
        } catch (err) {
            // SecurityError on file:// protocol — cleanly fall back to CSS wallpaper + clear glass
            console.warn('[liquid-glass] texture upload blocked (likely file://), using CSS fallback.');
            teardown();
            return false;
        }
    }

    function loadWallpaper() {
        var img = new Image();
        img.onload = function () {
            bgImage = img;
            if (uploadBgTexture(img)) drawFrame(performance.now());
        };
        img.src = 'Picture/glass-bg.jpg';
    }

    // ---------- Fast Zero-Layout-Thrashing Element Tracking ----------
    var stateMap = new WeakMap();
    var items = [];

    function parseRadius(str) {
        var v = parseFloat(str) || 22;
        return { val: v, pct: str && str.indexOf('%') !== -1 };
    }

    function refresh() {
        var els = Array.prototype.slice.call(document.querySelectorAll(SELECTOR)).filter(function (el) {
            return !el.closest('.modal, .lightbox, .ai-overlay, .shortcuts-modal-overlay') &&
                   !el.classList.contains('project-card');
        });
        items = els.map(function (el) {
            var s = stateMap.get(el);
            if (!s) {
                s = { el: el, h: 0, rad: { val: 22, pct: false } };
                stateMap.set(el, s);
            }
            el.classList.add('lg-glass');
            var cs = getComputedStyle(el);
            s.rad = parseRadius(cs.borderTopLeftRadius);
            return s;
        });
    }

    // Fast opacity read without calling getComputedStyle() per frame during scroll
    function fastOpacity(el) {
        if (el.classList.contains('card-filtered-out') || el.classList.contains('hidden')) return 0;
        var o = el.style.opacity;
        if (o === '') return 1;
        var v = parseFloat(o);
        return isNaN(v) ? 1 : v;
    }

    // ---------- Pointer ----------
    var mx = -1e4, my = -1e4, pointerIn = false;
    var click = [-1e4, -1e4, -100];

    window.addEventListener('pointermove', function (e) {
        if (e.pointerType === 'mouse') {
            mx = e.clientX;
            my = e.clientY;
            pointerIn = true;
        }
    }, { passive: true });
    window.addEventListener('pointerout', function (e) {
        if (!e.relatedTarget) pointerIn = false;
    });
    window.addEventListener('blur', function () { pointerIn = false; });
    window.addEventListener('pointerdown', function (e) {
        if (e.pointerType === 'mouse') {
            mx = e.clientX;
            my = e.clientY;
        }
        if (e.target && e.target.closest && e.target.closest('.lg-glass')) {
            click[0] = e.clientX;
            click[1] = e.clientY;
            click[2] = performance.now() / 1000;
        }
    }, { passive: true });

    // ---------- Sizing ----------
    var cssW = 0, cssH = 0, scale = 1;
    function resize(force) {
        var w = window.innerWidth;
        var h = window.innerHeight;
        var target = Math.min(window.devicePixelRatio || 1, DPR_CAP);
        if (!force && w === cssW && h === cssH && Math.abs(target - scale) < 0.01) return;
        cssW = w;
        cssH = h;
        scale = target;
        canvas.width = Math.max(1, Math.round(w * scale));
        canvas.height = Math.max(1, Math.round(h * scale));
    }

    // ---------- Render Loop (Ultra-fast single-pass, immediate scroll sync) ----------
    var rects = new Float32Array(MAX * 4);
    var radii = new Float32Array(MAX);
    var states = new Float32Array(MAX * 2);
    var raf = 0, running = false, contextLost = false;

    function drawFrame(now) {
        if (contextLost || !prog) return;
        resize(false);

        var vw = cssW, vh = cssH, n = 0;
        for (var i = 0; i < items.length && n < MAX; i++) {
            var s = items[i], el = s.el;
            if (!el.isConnected) continue;
            var r = el.getBoundingClientRect();
            if (r.width < 2 || r.height < 2 || r.bottom < -40 || r.top > vh + 40 || r.right < -40 || r.left > vw + 40) {
                s.h = 0;
                continue;
            }
            var a = fastOpacity(el);
            if (a < 0.02) continue;
            var inside = pointerIn && mx >= r.left && mx <= r.right && my >= r.top && my <= r.bottom;
            s.h += ((inside ? 1 : 0) - s.h) * 0.14;
            rects[n * 4]     = r.left * scale;
            rects[n * 4 + 1] = r.top * scale;
            rects[n * 4 + 2] = r.width * scale;
            rects[n * 4 + 3] = r.height * scale;
            radii[n] = (s.rad.pct ? (s.rad.val / 100) * Math.min(r.width, r.height) : s.rad.val) * scale;
            states[n * 2]     = Math.min(1, a);
            states[n * 2 + 1] = s.h;
            n++;
        }

        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(loc.uRes, canvas.width, canvas.height);
        gl.uniform2f(loc.uImgRes, imgW, imgH);
        gl.uniform1f(loc.uDpr, scale);
        gl.uniform1f(loc.uTime, now * 0.001);
        gl.uniform1f(loc.uMotion, reduceMQ.matches ? 0.0 : 1.0);
        gl.uniform2f(loc.uMouse, mx * scale, my * scale);
        gl.uniform3f(loc.uClick, click[0] * scale, click[1] * scale, click[2]);
        gl.uniform1i(loc.uCount, n);
        gl.uniform4fv(loc.uRects, rects);
        gl.uniform1fv(loc.uRadius, radii);
        gl.uniform2fv(loc.uState, states);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    function loop(now) {
        if (!running) return;
        raf = requestAnimationFrame(loop);
        drawFrame(now);
    }

    function start() {
        if (running || contextLost || document.hidden) return;
        running = true;
        raf = requestAnimationFrame(loop);
    }

    function stop() {
        running = false;
        cancelAnimationFrame(raf);
    }

    // Immediate draw on scroll event keeps glass locked tightly to cards
    window.addEventListener('scroll', function () {
        if (running) drawFrame(performance.now());
    }, { passive: true });

    canvas.addEventListener('webglcontextlost', function (e) {
        e.preventDefault();
        contextLost = true;
        stop();
        root.classList.remove('lg-active');
    });

    canvas.addEventListener('webglcontextrestored', function () {
        contextLost = false;
        if (initGL()) {
            if (bgImage) uploadBgTexture(bgImage);
            root.classList.add('lg-active');
            resize(true);
            refresh();
            start();
        } else {
            teardown();
        }
    });

    document.addEventListener('visibilitychange', function () {
        if (document.hidden) stop();
        else start();
    });

    // Debounced MutationObserver to catch dynamic cards (e.g., filter bar from maxout.js)
    var refreshTimer = 0;
    function scheduleRefresh() {
        if (refreshTimer) return;
        refreshTimer = setTimeout(function () {
            refreshTimer = 0;
            refresh();
        }, 120);
    }

    // ---------- Boot ----------
    document.body.insertBefore(canvas, document.body.firstChild);
    if (!initGL()) {
        teardown();
        return;
    }
    root.classList.add('lg-active');
    resize(true);
    refresh();
    loadWallpaper();

    if (typeof MutationObserver !== 'undefined') {
        var mo = new MutationObserver(function (mutations) {
            for (var i = 0; i < mutations.length; i++) {
                if ((mutations[i].addedNodes && mutations[i].addedNodes.length) ||
                    (mutations[i].removedNodes && mutations[i].removedNodes.length)) {
                    scheduleRefresh();
                    return;
                }
            }
        });
        mo.observe(document.body, { childList: true, subtree: true });
    }

    document.addEventListener('DOMContentLoaded', refresh);
    window.addEventListener('load', refresh);
    window.addEventListener('resize', function () {
        resize(true);
        refresh();
    });

    start();
})();
