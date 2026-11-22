/* ============================================================
   SMOOTH MOTION ENGINE (Framer Motion / motion-framer patterns)
   - Hardware-accelerated transform + opacity ONLY (zero layout shift).
   - Single-shot viewport reveals (once: true) — zero scroll jitter.
   - Smooth spring-damped easing (cubic-bezier(0.22, 1, 0.36, 1)),
     no aggressive bounce/overshoot, no 3D tilt skew.
   - Respects prefers-reduced-motion cleanly.
   ============================================================ */
(function () {
    'use strict';

    const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
    const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const FINE_POINTER = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    function revealAllImmediately() {
        document.querySelectorAll('.hidden').forEach(el => {
            el.classList.remove('hidden', 'delay-1', 'delay-2', 'delay-3', 'delay-4', 'delay-5', 'delay-6');
            el.classList.add('show');
            el.style.opacity = '1';
            el.style.transform = '';
        });
    }

    function animateIn(el, delayMs, yOffset) {
        el.classList.remove('hidden', 'delay-1', 'delay-2', 'delay-3', 'delay-4', 'delay-5', 'delay-6');
        el.classList.add('show');

        if (typeof el.animate !== 'function') {
            el.style.opacity = '1';
            el.style.transform = '';
            return;
        }

        const anim = el.animate(
            [
                { opacity: 0, transform: `translate3d(0, ${yOffset}px, 0)` },
                { opacity: 1, transform: 'translate3d(0, 0, 0)' }
            ],
            {
                duration: 540,
                delay: delayMs,
                easing: EASE,
                fill: 'both'
            }
        );

        anim.onfinish = () => {
            el.style.opacity = '';
            el.style.transform = '';
            anim.cancel();
        };
    }

    function initSmoothMotion() {
        if (REDUCED) {
            revealAllImmediately();
            return;
        }

        // --- 1. Smooth Hero Entrance (staggered transform + opacity) ---
        const heroSelectors = [
            '.freelance-badge',
            '.greeting',
            '.name',
            '.role',
            '.hero-stats',
            '.hero-buttons'
        ];
        heroSelectors.forEach((sel, idx) => {
            const el = document.querySelector(sel);
            if (el) animateIn(el, 60 + idx * 65, 16);
        });

        const heroImg = document.querySelector('.image-wrapper');
        if (heroImg && typeof heroImg.animate === 'function') {
            const imgAnim = heroImg.animate(
                [
                    { opacity: 0, transform: 'scale(0.95)' },
                    { opacity: 1, transform: 'scale(1)' }
                ],
                { duration: 640, delay: 140, easing: EASE, fill: 'both' }
            );
            imgAnim.onfinish = () => {
                heroImg.style.opacity = '';
                heroImg.style.transform = '';
                imgAnim.cancel();
            };
        }

        // --- 2. Single-Shot Smooth Scroll Reveals (viewport: { once: true }) ---
        const revealTargets = Array.from(document.querySelectorAll([
            '.section-title',
            '.about-card',
            '.traits-summary',
            '.trait-card',
            '.project-card',
            '.cert-card',
            '.timeline-item',
            '.premium-skill-card',
            '.edu-card',
            '.contact-card'
        ].join(',')));

        const staggerIndex = new WeakMap();
        document.querySelectorAll('.projects-grid, .cert-grid, .traits-grid, .premium-skills-grid, .education-grid, .timeline').forEach(group => {
            const children = group.querySelectorAll('.project-card, .cert-card, .trait-card, .premium-skill-card, .edu-card, .timeline-item');
            children.forEach((child, i) => staggerIndex.set(child, i));
        });

        const vh = window.innerHeight || 800;
        const toObserve = [];

        revealTargets.forEach(el => {
            el.classList.remove('hidden', 'delay-1', 'delay-2', 'delay-3', 'delay-4', 'delay-5', 'delay-6');
            const rect = el.getBoundingClientRect();
            if (rect.top < vh * 0.92) {
                el.classList.add('show');
                el.style.opacity = '1';
                el.style.transform = '';
            } else {
                el.style.opacity = '0';
                toObserve.push(el);
            }
        });

        if (toObserve.length && typeof IntersectionObserver !== 'undefined') {
            const observer = new IntersectionObserver((entries, obs) => {
                let batch = 0;
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    const el = entry.target;
                    obs.unobserve(el); // once: true — never re-triggers or jitters on scroll
                    const delay = Math.min(batch * 55, 220);
                    batch++;
                    animateIn(el, delay, 18);
                });
            }, {
                threshold: 0.06,
                rootMargin: '0px 0px -36px 0px'
            });

            toObserve.forEach(el => observer.observe(el));
        } else {
            revealAllImmediately();
        }

        // --- 3. Subtle Magnetic Hover on Primary CTA Buttons (desktop only) ---
        if (FINE_POINTER) {
            document.querySelectorAll('.hero-buttons .btn-primary, .hero-buttons .btn-download').forEach(btn => {
                btn.addEventListener('pointermove', (e) => {
                    const rect = btn.getBoundingClientRect();
                    const x = (e.clientX - rect.left - rect.width / 2) * 0.16;
                    const y = (e.clientY - rect.top - rect.height / 2) * 0.16;
                    btn.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
                }, { passive: true });

                btn.addEventListener('pointerleave', () => {
                    btn.style.transform = '';
                }, { passive: true });
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSmoothMotion);
    } else {
        initSmoothMotion();
    }
})();
