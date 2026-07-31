/* ============================================================
   MAXOUT LEVEL 2 — PREMIUM ANIMATIONS & 3D EFFECTS
   Libraries: GSAP, ScrollTrigger, Vanilla-Tilt.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        console.log('Reduced motion enabled: Premium animations disabled.');
        return; // Exit early if user prefers reduced motion
    }

    // Wait slightly to ensure GSAP and VanillaTilt are loaded (using defer)
    setTimeout(() => {
        initMaxoutAnimations();
    }, 150);
});

function initMaxoutAnimations() {
    // Register GSAP Plugin
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP or ScrollTrigger not loaded.');
        return;
    }
    gsap.registerPlugin(ScrollTrigger);

    /* --- 1. TACTILE 3D CARD HOVER EFFECTS (Vanilla-Tilt) --- */
    if (typeof VanillaTilt !== 'undefined') {
        const tiltElements = document.querySelectorAll('.project-card, .cert-card, .trait-card, .premium-skill-card');
        
        // Initialize Tilt only on non-touch devices for better performance
        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
            VanillaTilt.init(tiltElements, {
                max: 8,             // max tilt rotation (degrees)
                speed: 400,         // Speed of the enter/exit transition
                glare: true,        // enables glare effect
                "max-glare": 0.15,  // max glare opacity
                scale: 1.02,        // scale up slightly on hover
                perspective: 1000   // Transform perspective
            });
            console.log('Vanilla-Tilt initialized on cards.');
        }
    }

    /* --- 2. CINEMATIC HERO ENTRANCE (GSAP) --- */
    const heroElements = [
        '.freelance-badge', 
        '.greeting', 
        '.name', 
        '.role', 
        '.hero-stats', 
        '.hero-buttons'
    ];

    const tlHero = gsap.timeline();
    
    // Hide initially via GSAP to prevent flash
    gsap.set(heroElements, { opacity: 0, y: 30 });
    gsap.set('.image-wrapper', { opacity: 0, scale: 0.9, rotate: -5 });

    tlHero.to(heroElements, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power4.out',
        delay: 0.2
    })
    .to('.image-wrapper', {
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 1.2,
        ease: 'elastic.out(1, 0.5)'
    }, "-=0.6");


    /* --- 3. PREMIUM SCROLL REVEALS (GSAP ScrollTrigger) --- */
    
    // Animate section titles
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: 'power3.out'
        });
    });

    // Stagger grid items dynamically (Projects, Certs, Traits)
    const grids = document.querySelectorAll('.projects-grid, .cert-grid, .traits-grid, .premium-skills-grid, .education-grid');
    
    grids.forEach(grid => {
        // Find children that are cards
        const cards = grid.querySelectorAll('.project-card, .cert-card, .trait-card, .premium-skill-card, .edu-card');
        
        if (cards.length > 0) {
            // Remove the old CSS-based hidden/show classes to prevent conflicts
            cards.forEach(card => card.classList.remove('hidden', 'show', 'delay-1', 'delay-2', 'delay-3', 'delay-4'));
            
            gsap.from(cards, {
                scrollTrigger: {
                    trigger: grid,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 50,
                scale: 0.95,
                duration: 0.7,
                stagger: 0.1, // Stagger cascade effect
                ease: 'back.out(1.4)'
            });
        }
    });

    // Timeline Experience Stagger
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length > 0) {
        timelineItems.forEach(item => item.classList.remove('hidden', 'show'));
        
        gsap.from(timelineItems, {
            scrollTrigger: {
                trigger: '.timeline',
                start: 'top 80%',
            },
            opacity: 0,
            x: -30,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out'
        });
    }


    /* --- 4. MAGNETIC BUTTONS (GSAP) --- */
    const magneticButtons = document.querySelectorAll('.btn-primary, .btn-download');
    
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        magneticButtons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                // Pull button towards cursor
                gsap.to(btn, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            });

            btn.addEventListener('mouseleave', () => {
                // Snap back to center
                gsap.to(btn, {
                    x: 0,
                    y: 0,
                    duration: 0.7,
                    ease: 'elastic.out(1, 0.3)'
                });
            });
        });
    }

    console.log('MAX OUT Animations Initialized.');
}
