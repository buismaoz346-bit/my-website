
// ============================================================
// PREMIUM EXTRAS - Console Art, Smart Prefetch, Visit Counter
// ============================================================
(function() {
    'use strict';

    // 1. DEVELOPER CONSOLE EASTER EGG
    console.log('%c' + `
    ╔═══════════════════════════════════════════════════════════╗
    ║                                                           ║
    ║   🔧  SYED MAOZ ARIF - Hardware Developer Portfolio  🔧  ║
    ║                                                           ║
    ║   Curious enough to check the console?                    ║
    ║   That's the kind of engineer I like working with! 😄     ║
    ║                                                           ║
    ║   📧 syedmaoza@gmail.com                                  ║
    ║   🔗 linkedin.com/in/syed-maoz                            ║
    ║   💼 Available for internships & freelance work            ║
    ║                                                           ║
    ╚═══════════════════════════════════════════════════════════╝
    `, 'color: #64ffda; font-family: monospace; font-size: 12px;');

    console.log('%c🤖 Try the AI Mode! Click the ✨ button in the bottom-right corner.', 
        'color: #4285f4; font-size: 14px; font-weight: bold; padding: 8px;');
    
    console.log('%c⌨️ Keyboard shortcuts: Press ? for help, / for AI mode, 1-9 for sections', 
        'color: #fbbc05; font-size: 12px; padding: 4px;');

    console.log('%c🎮 Psst... there\'s a Konami code easter egg hidden somewhere...', 
        'color: #ea4335; font-size: 11px; font-style: italic; padding: 4px;');

    // 2. SMART LINK PREFETCHING
    // Prefetch linked pages on hover for faster navigation
    const prefetchedUrls = new Set();
    document.addEventListener('mouseover', function(e) {
        const link = e.target.closest('a[href]');
        if (!link) return;
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || prefetchedUrls.has(href)) return;
        
        // Only prefetch same-origin links
        try {
            const url = new URL(href, window.location.origin);
            if (url.origin !== window.location.origin) return;
            
            const prefetchLink = document.createElement('link');
            prefetchLink.rel = 'prefetch';
            prefetchLink.href = href;
            document.head.appendChild(prefetchLink);
            prefetchedUrls.add(href);
        } catch(e) {}
    }, { passive: true });

    // 3. VISIT COUNTER (localStorage-based)
    const visitKey = 'maoz_portfolio_visits';
    const lastVisitKey = 'maoz_portfolio_last_visit';
    let visits = parseInt(localStorage.getItem(visitKey) || '0') + 1;
    localStorage.setItem(visitKey, visits.toString());
    localStorage.setItem(lastVisitKey, new Date().toISOString());

    // 4. AUTO-SCROLL HINT (for first-time visitors)
    if (visits === 1) {
        setTimeout(() => {
            const scrollHint = document.createElement('div');
            scrollHint.style.cssText = `
                position: fixed; bottom: 100px; left: 50%; transform: translateX(-50%);
                color: rgba(100,255,218,0.6); font-size: 0.85rem; font-family: 'Inter', sans-serif;
                animation: scrollHintBounce 2s ease infinite; z-index: 999; pointer-events: none;
                text-align: center;
            `;
            scrollHint.innerHTML = '↓ Scroll to explore ↓';
            document.body.appendChild(scrollHint);

            const style = document.createElement('style');
            style.textContent = `
                @keyframes scrollHintBounce {
                    0%, 100% { transform: translateX(-50%) translateY(0); opacity: 0.6; }
                    50% { transform: translateX(-50%) translateY(-10px); opacity: 1; }
                }
            `;
            document.head.appendChild(style);

            // Remove after first scroll
            const removeHint = () => {
                scrollHint.style.transition = 'opacity 0.5s ease';
                scrollHint.style.opacity = '0';
                setTimeout(() => scrollHint.remove(), 500);
                window.removeEventListener('scroll', removeHint);
            };
            window.addEventListener('scroll', removeHint, { once: true, passive: true });
        }, 3000);
    }

    // 5. TIME-ON-PAGE TRACKER
    const startTime = Date.now();
    window.addEventListener('beforeunload', () => {
        const totalTime = Math.round((Date.now() - startTime) / 1000);
        const prevTime = parseInt(localStorage.getItem('maoz_total_time') || '0');
        localStorage.setItem('maoz_total_time', (prevTime + totalTime).toString());
    });

    // 6. AI TOGGLE LABEL (visible hint for the AI button)
    const aiBtn = document.querySelector('.ai-toggle-btn');
    if (aiBtn) {
        const label = document.createElement('div');
        label.className = 'ai-toggle-label';
        label.textContent = '✨ Ask AI about me';
        document.body.appendChild(label);

        // Hide label after first use
        aiBtn.addEventListener('click', () => {
            label.style.transition = 'opacity 0.3s ease';
            label.style.opacity = '0';
            setTimeout(() => label.remove(), 300);
        }, { once: true });
    }

    // 7. SMOOTH SECTION TRANSITIONS WITH INTERSECTION OBSERVER
    // Add subtle parallax-like effect to section backgrounds
    const sections = document.querySelectorAll('section');
    const sectionBgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = 'transform 0.6s ease-out';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });

    sections.forEach(section => {
        sectionBgObserver.observe(section);
    });

    // 8. PREFERS-REDUCED-MOTION RESPECT
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--transition-speed', '0.01s');
        document.querySelectorAll('[style*="animation"]').forEach(el => {
            el.style.animation = 'none';
        });
    }

    // 9. PAGE VISIBILITY API - Pause heavy operations when tab not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            document.body.classList.add('page-hidden');
        } else {
            document.body.classList.remove('page-hidden');
        }
    });
})();
