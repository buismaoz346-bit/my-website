/* ============================================================
   CRYSTAL LIQUID GLASS — INTERACTIVE SPECULAR & RIPPLE ENGINE
   - Zero fixed WebGL canvas, zero scroll listeners, zero jitter.
   - Smooth spring-damped specular light reflection (--gx, --gy)
     that runs ONLY while hovering a glass card (0% idle CPU).
   - Crisp radial glass tap ripple on click.
   - Zero control panel UI; respects prefers-reduced-motion.
   ============================================================ */
(function () {
    'use strict';
    if (window.__liquidGlass) return;
    window.__liquidGlass = true;

    document.documentElement.classList.add('lg-active');

    var reduceMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
    var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

    var CARD_SELECTOR = [
        '.glass-panel:not(.project-card):not(.modal-content)',
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
        '.hero-stats'
    ].join(',');

    // Active hovered card spring state (0% CPU when not hovering)
    var activeCard = null;
    var curX = 25, curY = 0;
    var targetX = 25, targetY = 0;
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

    // Crisp radial crystal tap ripple on pointerdown
    document.addEventListener('pointerdown', function (e) {
        if (reduceMQ.matches) return;
        var card = e.target && e.target.closest ? e.target.closest(CARD_SELECTOR) : null;
        if (!card || e.target.closest('input, textarea, select')) return;

        var rect = card.getBoundingClientRect();
        var size = Math.max(rect.width, rect.height) * 1.4;
        var ripple = document.createElement('span');
        ripple.className = 'lg-ripple';
        ripple.style.width = size + 'px';
        ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left) + 'px';
        ripple.style.top = (e.clientY - rect.top) + 'px';
        card.appendChild(ripple);

        ripple.addEventListener('animationend', function () {
            if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
        }, { once: true });
    }, { passive: true });
})();
