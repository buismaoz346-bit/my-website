document.addEventListener('DOMContentLoaded', () => {
    // Initialize Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the 'show' class to animate in
                entry.target.classList.add('show');
                
                // If the element has a progress bar, trigger the width animation
                const progressBar = entry.target.querySelector('.progress');
                if (progressBar) {
                    const targetWidth = progressBar.getAttribute('data-width');
                    // Add a small delay for better visual effect
                    setTimeout(() => {
                        progressBar.style.width = targetWidth;
                    }, 300);
                }
                
                // Optional: Stop observing once animated in
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with the 'hidden' class
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust for fixed navbar height
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Lightbox Functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    const clickableImages = document.querySelectorAll('.clickable-image');
    let activeLightboxSource = null;

    if (lightbox && lightboxImg && closeBtn) {
        
        function openLightboxFLIP(sourceImg) {
            activeLightboxSource = sourceImg;
            
            // Initial setup
            lightboxImg.style.transition = 'none';
            lightbox.style.display = 'flex';
            lightboxImg.src = sourceImg.src;
            
            // Calculate FLIP
            const sourceRect = sourceImg.getBoundingClientRect();
            
            // Force browser to calculate full size target by temporarily resetting transforms
            lightboxImg.style.transform = 'translate(0, 0) scale(1, 1)';
            lightboxImg.style.maxWidth = '90%';
            lightboxImg.style.maxHeight = '90vh';
            
            // Wait a tick for image to load/size
            setTimeout(() => {
                const targetRect = lightboxImg.getBoundingClientRect();
                const targetLeft = targetRect.left;
                const targetTop = targetRect.top;
                
                const scaleX = sourceRect.width / targetRect.width;
                const scaleY = sourceRect.height / targetRect.height;
                const translateX = sourceRect.left - targetLeft;
                const translateY = sourceRect.top - targetTop;
                
                lightboxImg.style.transformOrigin = 'top left';
                lightboxImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;
                lightboxImg.style.opacity = '0';
                
                void lightboxImg.offsetWidth; // force reflow
                
                // Add show class for backdrop fade
                lightbox.classList.add('show-lightbox');
                document.body.style.overflow = 'hidden';
                
                lightboxImg.style.transition = 'transform 0.7s cubic-bezier(0.34, 1.2, 0.64, 1), opacity 0.5s ease';
                lightboxImg.style.transform = 'translate(0, 0) scale(1, 1)';
                lightboxImg.style.opacity = '1';
            }, 10);
        }

        function closeLightboxFLIP() {
            if (activeLightboxSource) {
                const sourceRect = activeLightboxSource.getBoundingClientRect();
                
                lightboxImg.style.transition = 'none';
                lightboxImg.style.transform = 'translate(0, 0) scale(1, 1)';
                
                const targetRect = lightboxImg.getBoundingClientRect();
                const targetLeft = targetRect.left;
                const targetTop = targetRect.top;
                
                lightboxImg.style.transform = 'translate(0, 0) scale(1, 1)';
                void lightboxImg.offsetWidth;
                
                const scaleX = sourceRect.width / targetRect.width;
                const scaleY = sourceRect.height / targetRect.height;
                const translateX = sourceRect.left - targetLeft;
                const translateY = sourceRect.top - targetTop;
                
                lightboxImg.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease';
                lightboxImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;
                lightboxImg.style.opacity = '0';
            }
            
            lightbox.classList.remove('show-lightbox');
            
            setTimeout(() => {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
                activeLightboxSource = null;
            }, 600);
        }

        // Open lightbox on image click
        clickableImages.forEach(img => {
            img.addEventListener('click', function(e) {
                e.stopPropagation();
                currentLightboxImages = Array.from(clickableImages);
                currentLightboxIndex = currentLightboxImages.indexOf(this);
                openLightboxFLIP(this);
            });
        });

        // Make entire cert card clickable
        const certCards = document.querySelectorAll('.cert-card');
        certCards.forEach(card => {
            card.addEventListener('click', function(e) {
                // If they clicked the image directly, the image listener already fired
                if(e.target.classList.contains('clickable-image')) return;
                const img = this.querySelector('.clickable-image');
                if (img) {
                    currentLightboxImages = Array.from(document.querySelectorAll('.cert-card .clickable-image'));
                    currentLightboxIndex = currentLightboxImages.indexOf(img);
                    openLightboxFLIP(img);
                }
            });
        });

        // Close lightbox
        closeBtn.addEventListener('click', closeLightboxFLIP);
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightboxFLIP();
            }
        });
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.style.display === 'flex') {
                closeLightboxFLIP();
            }
        });
    }
});

// Project Modal Functionality
let activeProjectCard = null;

window.openProjectModal = function(projectId, cardElement) {
    const modal = document.getElementById('project-modal-' + projectId);
    if(modal) {
        activeProjectCard = cardElement;
        const modalContent = modal.querySelector('.modal-content');
        
        // Prepare for animation
        modalContent.style.transition = 'none';
        modal.style.display = 'block';
        
        // Init Social UI if Firebase is loaded
        if(window.renderSocialUI) window.renderSocialUI(projectId);
        
        // If we clicked a card, calculate FLIP positions
        if (cardElement) {
            const cardRect = cardElement.getBoundingClientRect();
            
            // Wait for display:block to calculate modal dimensions properly
            const targetWidth = modalContent.offsetWidth;
            const targetHeight = modalContent.offsetHeight;
            
            // Calculate where the modal naturally sits
            const rect = modalContent.getBoundingClientRect();
            const targetLeft = rect.left;
            const targetTop = rect.top;
            
            // Scale and Translate from card to target
            const scaleX = cardRect.width / targetWidth;
            const scaleY = cardRect.height / targetHeight;
            
            const translateX = cardRect.left - targetLeft;
            const translateY = cardRect.top - targetTop;
            
            // Initial state: shrunk and positioned over the card
            modalContent.style.transformOrigin = 'top left';
            modalContent.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;
            modalContent.style.opacity = '0';
        } else {
            modalContent.style.transform = 'translateY(20px) scale(0.95)';
            modalContent.style.opacity = '0';
        }
        
        // Force reflow
        void modalContent.offsetWidth;
        
        // Add class to trigger background fade
        modal.classList.add('show-modal');
        document.body.style.overflow = 'hidden';
        
        // Animate to full size
        modalContent.style.transition = 'transform 0.7s cubic-bezier(0.34, 1.2, 0.64, 1), opacity 0.5s ease';
        modalContent.style.transform = 'translate(0, 0) scale(1, 1)';
        modalContent.style.opacity = '1';
    }
};

window.closeProjectModal = function(projectId) {
    const modal = document.getElementById('project-modal-' + projectId);
    if(modal) {
        const modalContent = modal.querySelector('.modal-content');
        
        // Animate back to card
        if (activeProjectCard) {
            const cardRect = activeProjectCard.getBoundingClientRect();
            const rect = modalContent.getBoundingClientRect();
            
            // Reset transform to calculate raw target
            modalContent.style.transition = 'none';
            modalContent.style.transform = 'translate(0, 0) scale(1, 1)';
            const targetLeft = modalContent.getBoundingClientRect().left;
            const targetTop = modalContent.getBoundingClientRect().top;
            
            // Put transform back instantly
            modalContent.style.transform = 'translate(0, 0) scale(1, 1)';
            void modalContent.offsetWidth;
            
            const scaleX = cardRect.width / modalContent.offsetWidth;
            const scaleY = cardRect.height / modalContent.offsetHeight;
            const translateX = cardRect.left - targetLeft;
            const translateY = cardRect.top - targetTop;
            
            modalContent.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease';
            modalContent.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;
            modalContent.style.opacity = '0';
        } else {
            modalContent.style.transform = 'translateY(20px) scale(0.95)';
            modalContent.style.opacity = '0';
        }
        
        modal.classList.remove('show-modal');
        
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            activeProjectCard = null;
        }, 600);
    }
};

// Update window click for modal closing
window.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target == modal && modal.classList.contains('show-modal')) {
            const projectId = modal.id.replace('project-modal-', '');
            closeProjectModal(projectId);
        }
    });
});

function setGalleryMain(projectId, thumbElement, src) {
    const mainImg = document.getElementById('gallery-main-img-' + projectId);
    if(mainImg) {
        mainImg.style.opacity = '0.4';
        mainImg.style.transform = 'scale(0.98)';
        setTimeout(() => {
            mainImg.src = src;
            mainImg.style.opacity = '1';
            mainImg.style.transform = 'scale(1)';
        }, 150);
    }
    
    const thumbs = document.querySelectorAll('#project-modal-' + projectId + ' .gallery-thumbnails img');
    thumbs.forEach(t => t.classList.remove('active-thumb'));
    if(thumbElement) thumbElement.classList.add('active-thumb');
}




// Typewriter Effect
const roles = ["Hardware Developer", "Acting Vice President @ IET", "PCB Designer", "Embedded Engineer"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeText = document.querySelector('.typewriter-text');

function typeWriter() {
    if(!typeText) return;
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typeText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typeText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500; // Pause before new word
    }

    setTimeout(typeWriter, typeSpeed);
}
if(typeText) typeWriter();

// Mobile Hamburger Menu
const menuToggle = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// --- Gallery Navigation Logic ---
window.navigateProjectGallery = function(projectId, direction) {
    const thumbs = Array.from(document.querySelectorAll('#project-modal-' + projectId + ' .gallery-thumbnails img'));
    const currentActive = document.querySelector('#project-modal-' + projectId + ' .gallery-thumbnails img.active-thumb');
    
    let currentIndex = thumbs.indexOf(currentActive);
    if(currentIndex === -1) currentIndex = 0;
    
    let nextIndex = currentIndex + direction;
    if(nextIndex < 0) nextIndex = thumbs.length - 1; // loop to end
    if(nextIndex >= thumbs.length) nextIndex = 0; // loop to start
    
    const nextThumb = thumbs[nextIndex];
    if(nextThumb) {
        setGalleryMain(projectId, nextThumb, nextThumb.src);
    }
};

let currentLightboxImages = [];
let currentLightboxIndex = 0;

window.navigateLightbox = function(direction) {
    if(currentLightboxImages.length === 0) return;
    
    currentLightboxIndex += direction;
    if(currentLightboxIndex < 0) currentLightboxIndex = currentLightboxImages.length - 1;
    if(currentLightboxIndex >= currentLightboxImages.length) currentLightboxIndex = 0;
    
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = currentLightboxImages[currentLightboxIndex].src;
};



// Also let users click to advance immediately
window.navigateProjectGalleryClick = function(projectId, direction, event) {
    if(event) event.stopPropagation();
    navigateProjectGallery(projectId, direction);
};

let coverSlideshowIntervals = {};
let coverOriginalBg = {};

window.startCoverSlideshow = function(projectId, cardElement) {
    const bgElement = cardElement.querySelector('.project-bg');
    if(!bgElement) return;
    
    if(!coverOriginalBg[projectId]) {
        coverOriginalBg[projectId] = bgElement.style.backgroundImage;
    }
    
    const thumbs = Array.from(document.querySelectorAll('#project-modal-' + projectId + ' .gallery-thumbnails img'));
    if(thumbs.length <= 1) return;
    
    let currentIndex = 0;
    
    // Clear any existing interval just in case
    clearInterval(coverSlideshowIntervals[projectId]);
    
    coverSlideshowIntervals[projectId] = setInterval(() => {
        currentIndex++;
        if(currentIndex >= thumbs.length) currentIndex = 0;
        
        const nextSrc = thumbs[currentIndex].src;
        // The background image url expects a format like url('...')
        bgElement.style.backgroundImage = `url('${nextSrc}')`;
    }, 700); // cycle every 700ms
};

window.stopCoverSlideshow = function(projectId, cardElement) {
    clearInterval(coverSlideshowIntervals[projectId]);
    
    const bgElement = cardElement.querySelector('.project-bg');
    if(bgElement && coverOriginalBg[projectId]) {
        bgElement.style.backgroundImage = coverOriginalBg[projectId];
    }
};


// --- Active Navbar Highlighter ---
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Add a 200px offset to trigger slightly before reaching the section
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        // Special case: If user is at the absolute top
        if (window.scrollY < 50) {
            current = 'hero';
        }

        // Special case: If user scrolled to the absolute bottom
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
            current = 'contact'; // Contact is the last section
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});

// === PREMIUM EFFECTS (Lightweight, GPU-optimized) ===

// 1. Scroll Progress Bar + Back to Top (ONE scroll listener)
const scrollBar = document.createElement('div');
scrollBar.className = 'scroll-progress';
document.body.appendChild(scrollBar);

const topBtn = document.createElement('button');
topBtn.className = 'back-to-top';
topBtn.innerHTML = '↑';
topBtn.setAttribute('aria-label', 'Back to top');
document.body.appendChild(topBtn);
topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

let raf = false;
window.addEventListener('scroll', () => {
    if (!raf) {
        requestAnimationFrame(() => {
            const y = window.scrollY;
            const h = document.documentElement.scrollHeight - window.innerHeight;
            scrollBar.style.width = ((y / h) * 100) + '%';
            topBtn.classList.toggle('visible', y > 500);
            raf = false;
        });
        raf = true;
    }
}, { passive: true });

// 2. Cursor Glow (GPU-only, uses transform not left/top)
if (window.matchMedia('(pointer: fine)').matches) {
    const g = document.createElement('div');
    g.style.cssText = 'position:fixed;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(100,255,218,0.05) 0%,transparent 70%);pointer-events:none;z-index:999;will-change:transform;left:0;top:0;';
    document.body.appendChild(g);
    let gx = 0, gy = 0;
    document.addEventListener('mousemove', e => { gx = e.clientX; gy = e.clientY; }, { passive: true });
    (function mv() { g.style.transform = `translate(${gx-150}px,${gy-150}px)`; requestAnimationFrame(mv); })();
}

// 3. Animated Counters (one-time, IntersectionObserver)
function animateNum(el, target, ms) {
    const t0 = performance.now();
    (function tick(now) {
        const p = Math.min((now - t0) / ms, 1);
        el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target);
        if (p < 1) requestAnimationFrame(tick);
    })(t0);
}
const nums = document.querySelectorAll('.stat-num');
if (nums.length) {
    const io = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { animateNum(e.target, parseInt(e.target.textContent), 1500); io.unobserve(e.target); } });
    }, { threshold: 0.5 });
    nums.forEach(n => io.observe(n));
}

// ============================================================
// PREMIUM INTERACTIVE FEATURES (8 Features)
// All appended — never modifies existing code above.
// ============================================================
(function premiumFeatures() {
    'use strict';

    // --- Helper: safely query ---
    const $ = (sel, ctx) => (ctx || document).querySelector(sel);
    const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

    // =========================================================
    // 1. DYNAMIC HERO GREETING
    // =========================================================
    (function dynamicGreeting() {
        const greetingEl = $('.greeting');
        if (!greetingEl) return;
        const hour = new Date().getHours();
        let greeting;
        if (hour >= 5 && hour < 12)       greeting = 'Good Morning, my name is';
        else if (hour >= 12 && hour < 17)  greeting = 'Good Afternoon, my name is';
        else                               greeting = 'Good Evening, my name is';
        greetingEl.textContent = greeting;
    })();

    // =========================================================
    // 2. KEYBOARD SHORTCUTS + Floating Hint Badge
    // =========================================================
    (function keyboardShortcuts() {
        // Section targets for number keys
        const sectionIds = [
            'hero', 'about', 'traits', 'projects', 'certifications',
            'awards', 'experience', 'skills', 'software', 'education', 'contact'
        ];

        // Create shortcuts modal
        const overlay = document.createElement('div');
        overlay.className = 'shortcuts-modal-overlay';
        overlay.innerHTML = `
            <div class="shortcuts-modal">
                <h3>⌨️ Keyboard Shortcuts</h3>
                <div class="shortcut-row"><span>Jump to section</span><span class="shortcut-key">1</span>–<span class="shortcut-key">9</span></div>
                <div class="shortcut-row"><span>Home</span><span class="shortcut-key">1</span></div>
                <div class="shortcut-row"><span>About</span><span class="shortcut-key">2</span></div>
                <div class="shortcut-row"><span>Traits</span><span class="shortcut-key">3</span></div>
                <div class="shortcut-row"><span>Projects</span><span class="shortcut-key">4</span></div>
                <div class="shortcut-row"><span>Certifications</span><span class="shortcut-key">5</span></div>
                <div class="shortcut-row"><span>Awards</span><span class="shortcut-key">6</span></div>
                <div class="shortcut-row"><span>Experience</span><span class="shortcut-key">7</span></div>
                <div class="shortcut-row"><span>Skills</span><span class="shortcut-key">8</span></div>
                <div class="shortcut-row"><span>Software</span><span class="shortcut-key">9</span></div>
                <div class="shortcut-row"><span>Toggle AI Mode</span><span class="shortcut-key">/</span></div>
                <div class="shortcut-row"><span>Show shortcuts</span><span class="shortcut-key">?</span></div>
                <button class="shortcuts-modal-close">Close</button>
            </div>
        `;
        document.body.appendChild(overlay);

        const closeModal = () => overlay.classList.remove('visible');
        overlay.querySelector('.shortcuts-modal-close').addEventListener('click', closeModal);
        overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });

        function showShortcuts() { overlay.classList.add('visible'); }

        // Floating hint button
        const hintBtn = document.createElement('button');
        hintBtn.className = 'kbd-hint-btn';
        hintBtn.innerHTML = '⌨️';
        hintBtn.setAttribute('aria-label', 'Keyboard shortcuts');
        hintBtn.setAttribute('title', 'Press ? for shortcuts');
        hintBtn.addEventListener('click', showShortcuts);
        document.body.appendChild(hintBtn);

        // Keyboard listener
        document.addEventListener('keydown', (e) => {
            // Don't trigger shortcuts when typing in inputs
            const tag = e.target.tagName;
            if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) return;

            // Number keys 1-9 to jump to sections
            const num = parseInt(e.key);
            if (num >= 1 && num <= 9 && !e.ctrlKey && !e.altKey && !e.metaKey) {
                const sectionId = sectionIds[num - 1];
                if (sectionId) {
                    const target = document.getElementById(sectionId);
                    if (target) {
                        const headerOffset = 70;
                        const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
                        window.scrollTo({ top, behavior: 'smooth' });
                    }
                }
                return;
            }

            // "/" to toggle AI mode
            if (e.key === '/' && !e.ctrlKey && !e.altKey) {
                e.preventDefault();
                const aiBtn = $('.ai-toggle-btn');
                if (aiBtn) aiBtn.click();
                return;
            }

            // "?" to show shortcuts
            if (e.key === '?' || (e.key === '/' && e.shiftKey)) {
                showShortcuts();
                return;
            }

            // Escape to close shortcuts modal
            if (e.key === 'Escape' && overlay.classList.contains('visible')) {
                closeModal();
            }
        }, { passive: false });
    })();

    // =========================================================
    // 3. ANIMATED SKILL PROGRESS BARS
    // =========================================================
    (function skillProgressBars() {
        const skillCards = $$('.premium-skill-card');
        if (!skillCards.length) return;

        // Skill proficiency levels (mapped by card order)
        const levels = [95, 88, 85, 80, 82, 78, 75];

        skillCards.forEach((card, i) => {
            const bar = document.createElement('div');
            bar.className = 'skill-progress-bar';
            const fill = document.createElement('div');
            fill.className = 'skill-progress-fill';
            bar.style.setProperty('--progress-width', (levels[i] || 70) + '%');
            bar.appendChild(fill);
            card.appendChild(bar);
        });

        // Observe and animate when in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target.querySelector('.skill-progress-bar');
                    if (bar && !bar.classList.contains('animated')) {
                        // Small delay for stagger effect
                        const idx = skillCards.indexOf(entry.target);
                        setTimeout(() => bar.classList.add('animated'), idx * 100);
                    }
                }
            });
        }, { threshold: 0.3 });

        skillCards.forEach(card => observer.observe(card));
    })();

    // =========================================================
    // 4. PROJECT HOVER TOOLTIPS
    // =========================================================
    (function projectTooltips() {
        const cards = $$('.project-card');
        cards.forEach(card => {
            const techStackEl = card.querySelector('.tech-stack');
            if (!techStackEl) return;
            const tooltip = document.createElement('div');
            tooltip.className = 'project-tooltip';
            tooltip.textContent = '🛠 ' + techStackEl.textContent.trim();
            card.appendChild(tooltip);
        });
    })();

    // =========================================================
    // 5. EASTER EGG: KONAMI CODE
    // =========================================================
    (function konamiCode() {
        const sequence = [
            'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
            'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
            'b', 'a'
        ];
        let position = 0;

        // Create easter egg overlay (once)
        const eeOverlay = document.createElement('div');
        eeOverlay.className = 'easter-egg-overlay';
        eeOverlay.innerHTML = `
            <div class="easter-egg-content">
                <span class="ee-icon">🎮</span>
                <h2>You found the secret!</h2>
                <p>Maoz is also a gamer at heart! Congrats on cracking the Konami code 🕹️</p>
            </div>
        `;
        document.body.appendChild(eeOverlay);

        eeOverlay.addEventListener('click', () => eeOverlay.classList.remove('visible'));

        document.addEventListener('keydown', (e) => {
            const expected = sequence[position];
            if (e.key === expected || e.key.toLowerCase() === expected) {
                position++;
                if (position === sequence.length) {
                    position = 0;
                    eeOverlay.classList.add('visible');
                    setTimeout(() => eeOverlay.classList.remove('visible'), 5000);
                }
            } else {
                position = 0;
                // Check if the pressed key starts the sequence again
                if (e.key === sequence[0]) position = 1;
            }
        }, { passive: true });
    })();

    // =========================================================
    // 6. SECTION REVEAL COUNTER
    // =========================================================
    (function sectionCounter() {
        const allSections = $$('section[id]');
        const total = allSections.length;
        if (!total) return;

        const viewed = new Set();

        const badge = document.createElement('div');
        badge.className = 'section-counter-badge';
        badge.innerHTML = '<span class="counter-highlight">0</span>/' + total + ' sections explored';
        document.body.appendChild(badge);

        // Show badge after a small delay
        setTimeout(() => badge.classList.add('visible'), 1500);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    if (!viewed.has(id)) {
                        viewed.add(id);
                        const highlight = badge.querySelector('.counter-highlight');
                        highlight.textContent = viewed.size;

                        if (viewed.size >= total) {
                            // All sections explored — fade out after 2s
                            setTimeout(() => {
                                badge.classList.remove('visible');
                                badge.classList.add('complete');
                            }, 2000);
                        }
                    }
                }
            });
        }, { threshold: 0.2 });

        allSections.forEach(sec => observer.observe(sec));
    })();

    // =========================================================
    // 7. SMART NAVBAR RIPPLE
    // =========================================================
    (function navRipple() {
        const navLinks = $$('.nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                // Create ripple element
                const ripple = document.createElement('span');
                ripple.className = 'nav-ripple';
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
                ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
                this.appendChild(ripple);
                // Remove after animation
                setTimeout(() => ripple.remove(), 550);
            });
        });
    })();

    // =========================================================
    // 8. READING TIME ESTIMATOR
    // =========================================================
    (function readingTime() {
        // Count all visible text on the page
        const textContent = document.body.innerText || '';
        const wordCount = textContent.split(/\s+/).filter(w => w.length > 0).length;
        const minutes = Math.max(1, Math.round(wordCount / 200)); // avg 200 wpm

        const heroStats = $('.hero-stats');
        if (!heroStats) return;

        const readingEl = document.createElement('div');
        readingEl.className = 'reading-time';
        readingEl.textContent = '~' + minutes + ' min read';
        // Insert after hero-stats
        heroStats.parentNode.insertBefore(readingEl, heroStats.nextSibling);
    })();

})();

/* ================= FIREBASE INTEGRATION (Compat) ================= */
const firebaseConfig = {
  apiKey: "AIzaSyCPiGbMS4iyhT42p1ONhygfm7JfcFZQsF8",
  authDomain: "portfolio-db-4a51c.firebaseapp.com",
  projectId: "portfolio-db-4a51c",
  storageBucket: "portfolio-db-4a51c.firebasestorage.app",
  messagingSenderId: "797186178154",
  appId: "1:797186178154:web:a8dddbdea60d1ea91d5e13",
  measurementId: "G-H13D74S54H"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

let currentUnsubscribeDoc = null;
let currentUnsubscribeCol = null;

async function initProjectDoc(projectId) {
    const docRef = db.collection("projects").doc(projectId);
    const docSnap = await docRef.get();
    if (!docSnap.exists) {
        await docRef.set({ likes: 0 });
    }
}

window.handleLike = async function(projectId) {
    const docRef = db.collection("projects").doc(projectId);
    const btn = document.querySelector(`#project-modal-${projectId} .like-btn`);
    
    if(btn && btn.classList.contains('liked')) {
        // Unlike Logic
        btn.classList.remove('liked');
        btn.innerHTML = `🤍 Like`;
        localStorage.removeItem('liked_' + projectId);
        try {
            await docRef.update({
                likes: firebase.firestore.FieldValue.increment(-1)
            });
        } catch (e) {
            console.error("Error updating likes: ", e);
        }
        return;
    }
    
    // Save to local storage
    localStorage.setItem('liked_' + projectId, 'true');

    if(btn) {
        btn.classList.add('liked');
        btn.innerHTML = `❤️ Liked`;
    }

    try {
        await docRef.update({
            likes: firebase.firestore.FieldValue.increment(1)
        });
    } catch (e) {
        console.error("Error updating likes: ", e);
        await initProjectDoc(projectId);
        await docRef.update({ likes: firebase.firestore.FieldValue.increment(1) });
    }
};

window.submitComment = async function(projectId) {
    const input = document.querySelector(`#project-modal-${projectId} .comment-input`);
    const nameInput = document.querySelector(`#project-modal-${projectId} .comment-name`);
    
    const text = input.value.trim();
    const author = nameInput.value.trim() || "Anonymous";

    if (!text) return;

    input.value = "";
    
    try {
        const commentsRef = db.collection("projects").doc(projectId).collection("comments");
        await commentsRef.add({
            author: author,
            text: text,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    } catch (e) {
        console.error("Error adding comment: ", e);
    }
};

window.renderSocialUI = function(projectId) {
    const modalBody = document.querySelector(`#project-modal-${projectId} .modal-body`);
    if (!modalBody) return;

    let socialContainer = modalBody.querySelector('.social-container');
    
    if (!socialContainer) {
        socialContainer = document.createElement('div');
        socialContainer.className = 'social-container glass-panel';
        const isLiked = localStorage.getItem('liked_' + projectId) === 'true';
        const btnClass = isLiked ? 'like-btn liked' : 'like-btn';
        const btnText = isLiked ? '❤️ Liked' : '🤍 Like';

        socialContainer.innerHTML = `
            <div class="social-header" style="align-items: center; gap: 1rem;">
                <button class="${btnClass}" onclick="handleLike('${projectId}')">
                    ${btnText}
                </button>
                <div class="like-stats" style="font-size: 0.9rem; color: var(--text-color); font-weight: 500;">
                    ❤️ <span class="like-count">0</span> likes
                </div>
            </div>
            <div class="comments-section">
                <h4>Comments (<span class="comment-count">0</span>)</h4>
                <div class="comments-list" id="comments-list-${projectId}">
                </div>
                <div class="comment-form">
                    <input type="text" class="comment-name" placeholder="Name (optional)" maxlength="30">
                    <div class="comment-input-wrapper">
                        <input type="text" class="comment-input" placeholder="Add a comment..." onkeypress="if(event.key === 'Enter') submitComment('${projectId}')">
                        <button class="comment-submit" onclick="submitComment('${projectId}')">Post</button>
                    </div>
                </div>
            </div>
        `;
        const modalGallery = modalBody.querySelector('.modal-gallery');
        if (modalGallery) {
            modalGallery.appendChild(socialContainer);
        } else {
            modalBody.appendChild(socialContainer);
        }
    }

    if (currentUnsubscribeDoc) currentUnsubscribeDoc();
    if (currentUnsubscribeCol) currentUnsubscribeCol();

    const docRef = db.collection("projects").doc(projectId);
    initProjectDoc(projectId);
    
    currentUnsubscribeDoc = docRef.onSnapshot((docSnap) => {
        const likeCountEl = socialContainer.querySelector('.like-count');
        if (docSnap.exists) {
            const data = docSnap.data();
            if (likeCountEl) {
                // Ensure absolute numerical value is printed, overriding any falsy bugs
                let count = typeof data.likes !== 'undefined' ? data.likes : 0;
                
                // Auto-heal negative likes (happens if a user 'Unlikes' after a database wipe)
                if (count < 0) {
                    count = 0;
                    docRef.update({ likes: 0 }).catch(e => console.error(e));
                }
                
                likeCountEl.innerText = count;
                // Force a color flash to visually prove to the user that onSnapshot fired!
                likeCountEl.style.color = 'red';
                setTimeout(() => likeCountEl.style.color = '', 500);
            }
        } else {
            // Document doesn't exist yet, force 0
            if (likeCountEl) {
                likeCountEl.innerText = "0";
            }
        }
    }, (error) => {
        console.error("Snapshot error: ", error);
        const likeCountEl = socialContainer.querySelector('.like-count');
        if(likeCountEl) likeCountEl.innerText = "Error";
    });

    const commentsRef = db.collection("projects").doc(projectId).collection("comments").orderBy("timestamp", "asc");
    
    currentUnsubscribeCol = commentsRef.onSnapshot((snapshot) => {
        const commentsList = socialContainer.querySelector(`#comments-list-${projectId}`);
        const commentCountEl = socialContainer.querySelector('.comment-count');
        if (!commentsList) return;

        commentsList.innerHTML = "";
        let count = 0;

        snapshot.forEach((doc) => {
            count++;
            const data = doc.data();
            const dateStr = data.timestamp ? new Date(data.timestamp.toDate()).toLocaleDateString() : 'Just now';
            
            const commentEl = document.createElement('div');
            commentEl.className = 'comment-item';
            
            const escAuthor = data.author.replace(/[&<>'"]/g, t => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[t] || t));
            const escText = data.text.replace(/[&<>'"]/g, t => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[t] || t));

            commentEl.innerHTML = `
                <div class="comment-author">${escAuthor} <span class="comment-date">${dateStr}</span></div>
                <div class="comment-text">${escText}</div>
            `;
            commentsList.appendChild(commentEl);
        });
        
        if (commentCountEl) {
            commentCountEl.innerText = count;
        }

        commentsList.scrollTop = commentsList.scrollHeight;
    });
};
