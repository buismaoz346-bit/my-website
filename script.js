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

// --- Overscroll Taptic Sound Effect ---
let tapticAudioCtx = null;
let lastOverscrollTime = 0;

function initAudio() {
    if (!tapticAudioCtx) {
        tapticAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

document.addEventListener('click', initAudio, { once: true });
document.addEventListener('touchstart', initAudio, { once: true });

function playOverscrollSound(e) {
    if (e && e.cancelable) {
        e.preventDefault(); // Stop native rubber-banding
    }
    
    if (tapticAudioCtx && tapticAudioCtx.state === 'suspended') {
        tapticAudioCtx.resume();
    }
    
    const now = Date.now();
    if (now - lastOverscrollTime < 400) return; // Wait 400ms before allowing another shake
    lastOverscrollTime = now;
    
    // Play double taptic sound if audio is ready
    if (tapticAudioCtx) {
        const oscillator = tapticAudioCtx.createOscillator();
        const gainNode = tapticAudioCtx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(tapticAudioCtx.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(100, tapticAudioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(30, tapticAudioCtx.currentTime + 0.15);
        
        gainNode.gain.setValueAtTime(0, tapticAudioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.5, tapticAudioCtx.currentTime + 0.01);
        gainNode.gain.linearRampToValueAtTime(0, tapticAudioCtx.currentTime + 0.05);
        gainNode.gain.linearRampToValueAtTime(0.5, tapticAudioCtx.currentTime + 0.08);
        gainNode.gain.linearRampToValueAtTime(0, tapticAudioCtx.currentTime + 0.12);
        
        oscillator.start(tapticAudioCtx.currentTime);
        oscillator.stop(tapticAudioCtx.currentTime + 0.15);
    }
    
    // Pure CSS horizontal shake
    document.body.classList.remove('face-id-shake');
    void document.body.offsetWidth; // Trigger reflow
    document.body.classList.add('face-id-shake');
}

window.addEventListener('wheel', function(e) {
    if (e.deltaY < 0 && window.scrollY <= 0) {
        playOverscrollSound(e);
    } else if (e.deltaY > 0 && Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight) {
        playOverscrollSound(e);
    }
}, { passive: false });

let touchStartY = 0;
window.addEventListener('touchstart', function(e) {
    touchStartY = e.touches[0].clientY;
}, { passive: true });

window.addEventListener('touchmove', function(e) {
    let touchEndY = e.touches[0].clientY;
    let deltaY = touchStartY - touchEndY; 
    
    if (deltaY < -5 && window.scrollY <= 0) {
        playOverscrollSound(e);
    } else if (deltaY > 5 && Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight) {
        playOverscrollSound(e);
    }
}, { passive: false });



// Typewriter Effect
const roles = ["Hardware Developer", "PCB Designer", "Embedded Engineer"];
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
