/* ============================================================
   CLEAR LIQUID GLASS — COMPOSITOR-LOCKED SPECULAR & RIPPLE ENGINE
   - Zero fixed WebGL canvas & zero scroll listeners -> 0.00px card/text
     detachment and silky 120fps scrolling.
   - Smooth spring-damped specular light reflection (--gx, --gy)
     running ONLY while hovering a glass card (0% idle/scroll CPU).
   - Crisp radial crystal tap ripple on pointerdown.
   - Zero control panel UI; respects prefers-reduced-motion.
   ============================================================ */
(function () {
    'use strict';
    if (window.__liquidGlass) return;
    window.__liquidGlass = true;

    var reduceMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
    var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

    var CARD_SELECTOR = [
        '.glass-panel',
        '.modal-content',
        '.shortcuts-modal',
        '.social-container',
        '.about-card',
        '.traits-summary',
        '.trait-card',
        '.cert-card',
        '.timeline-content',
        '.premium-skill-card',
        '.edu-card',
        '.contact-card',
        '.filter-search-container',
        '.freelance-badge',
        '.hero-stats',
        '.hero-highlight-chip'
    ].join(',');

    var activeCard = null;
    var curX = 24, curY = 0;
    var targetX = 24, targetY = 0;
    var rafId = 0;

    function tickSpecular() {
        rafId = 0;
        if (!activeCard) return;

        curX += (targetX - curX) * 0.16;
        curY += (targetY - curY) * 0.16;
        activeCard.style.setProperty('--gx', curX.toFixed(2) + '%');
        activeCard.style.setProperty('--gy', curY.toFixed(2) + '%');

        if (Math.abs(targetX - curX) > 0.15 || Math.abs(targetY - curY) > 0.15) {
            rafId = requestAnimationFrame(tickSpecular);
        }
    }

    function clearActive() {
        if (!activeCard) return;
        activeCard.style.setProperty('--glint', '0');
        activeCard = null;
        if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = 0;
        }
    }

    if (finePointer.matches) {
        document.addEventListener('pointermove', function (e) {
            if (reduceMQ.matches || e.pointerType !== 'mouse') return;
            var card = e.target && e.target.closest ? e.target.closest(CARD_SELECTOR) : null;
            if (!card) {
                clearActive();
                return;
            }
            var rect = card.getBoundingClientRect();
            if (rect.width < 2 || rect.height < 2) return;

            var px = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
            var py = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));

            if (card !== activeCard) {
                clearActive();
                activeCard = card;
                curX = px;
                curY = py;
                card.style.setProperty('--gx', px.toFixed(2) + '%');
                card.style.setProperty('--gy', py.toFixed(2) + '%');
                card.style.setProperty('--glint', '1');
            }
            targetX = px;
            targetY = py;
            if (!rafId) rafId = requestAnimationFrame(tickSpecular);
        }, { passive: true });

        window.addEventListener('pointerout', function (e) {
            if (!e.relatedTarget) clearActive();
        });
        window.addEventListener('blur', clearActive);
    }

    var RIPPLE_SELECTOR = CARD_SELECTOR + ',.btn-primary,.btn-download,.btn-secondary,.filter-tab,.stl-download-btn,.nav-links a';

    // Crisp concentric water-ring tap ripple on pointerdown
    document.addEventListener('pointerdown', function (e) {
        if (reduceMQ.matches) return;
        var target = e.target && e.target.closest ? e.target.closest(RIPPLE_SELECTOR) : null;
        if (!target || e.target.closest('input, textarea, select')) return;

        var rect = target.getBoundingClientRect();
        var size = Math.max(rect.width, rect.height) * 1.4;
        var ripple = document.createElement('span');
        ripple.className = 'lg-ripple';
        ripple.style.width = size + 'px';
        ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left) + 'px';
        ripple.style.top = (e.clientY - rect.top) + 'px';
        target.appendChild(ripple);

        ripple.addEventListener('animationend', function () {
            if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
        }, { once: true });
    }, { passive: true });

    // --- Originkit-inspired Per-Character Motion Text Wave + Card Liquid Text ---
    function splitTextToWaveChars(el) {
        if (!el || el.dataset.lwSplit === '1') return;
        var rawText = (el.textContent || '').replace(/\s+/g, ' ').trim();
        if (!rawText) return;

        el.setAttribute('aria-label', rawText);
        el.classList.add('lw-heading');
        el.dataset.lwSplit = '1';

        var frag = document.createDocumentFragment();
        var words = rawText.split(' ');
        var charIndex = 0;

        words.forEach(function (word, wIdx) {
            var wordSpan = document.createElement('span');
            wordSpan.className = 'lw-word';
            wordSpan.setAttribute('aria-hidden', 'true');

            for (var i = 0; i < word.length; i++) {
                var chSpan = document.createElement('span');
                chSpan.className = 'lw-char';
                chSpan.style.setProperty('--char-i', String(charIndex++));
                chSpan.textContent = word[i];
                wordSpan.appendChild(chSpan);
            }
            frag.appendChild(wordSpan);
            if (wIdx < words.length - 1) {
                frag.appendChild(document.createTextNode(' '));
            }
        });

        el.textContent = '';
        el.appendChild(frag);
    }

    function pulseHeading(el) {
        if (!el || reduceMQ.matches) return;
        if (el._lwTimer) clearTimeout(el._lwTimer);
        el.classList.remove('lw-wave-pulse');
        void el.offsetWidth;
        el.classList.add('lw-wave-pulse');
        el._lwTimer = setTimeout(function () {
            el.classList.remove('lw-wave-pulse');
        }, 900);
    }

    function initLiquidTypography() {
        var headings = document.querySelectorAll('.hero-section .greeting, .hero-section .name, .section-title');
        headings.forEach(splitTextToWaveChars);

        document.querySelectorAll('.project-content-overlay h3, .cert-info h3, .trait-card h3, .premium-skill-card h3, .edu-content h3, .timeline-company').forEach(function (h) {
            h.classList.add('lw-liquid-text');
        });

        if (reduceMQ.matches) {
            headings.forEach(function (h) { h.classList.add('lw-wave-in'); });
            return;
        }

        if (typeof IntersectionObserver !== 'undefined') {
            var io = new IntersectionObserver(function (entries, obs) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('lw-wave-in');
                    obs.unobserve(entry.target);
                });
            }, { threshold: 0.15, rootMargin: '0px 0px -20px 0px' });

            headings.forEach(function (h) {
                var r = h.getBoundingClientRect();
                if (r.top < (window.innerHeight || 900) * 0.92) {
                    h.classList.add('lw-wave-in');
                } else {
                    io.observe(h);
                }
            });
        } else {
            headings.forEach(function (h) { h.classList.add('lw-wave-in'); });
        }

        if (finePointer.matches) {
            headings.forEach(function (h) {
                h.addEventListener('pointerenter', function () {
                    pulseHeading(h);
                }, { passive: true });
            });
        }
    }

    var bootTypography = function () {
        // Wait one animation frame so script.js updates time-aware .greeting text first
        requestAnimationFrame(initLiquidTypography);
    };
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bootTypography);
    } else {
        bootTypography();
    }
})();
