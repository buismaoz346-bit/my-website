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

    if (lightbox && lightboxImg && closeBtn) {
        // Open lightbox on image click
        clickableImages.forEach(img => {
            img.addEventListener('click', function(e) {
                e.stopPropagation(); // prevent card click from firing twice
                lightbox.style.display = 'flex';
                lightboxImg.src = this.src;
                // Prevent scrolling on body when lightbox is open
                document.body.style.overflow = 'hidden';
            });
        });

        // Make entire cert card clickable
        const certCards = document.querySelectorAll('.cert-card');
        certCards.forEach(card => {
            card.addEventListener('click', function() {
                const img = this.querySelector('.clickable-image');
                if (img) {
                    lightbox.style.display = 'flex';
                    lightboxImg.src = img.src;
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        // Close lightbox on close button click
        closeBtn.addEventListener('click', function() {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        // Close lightbox on background click
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Close lightbox on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.style.display === 'flex') {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
});

// Project Modal Functionality
function openProjectModal(projectId) {
    const modal = document.getElementById('project-modal-' + projectId);
    if(modal) {
        modal.style.display = 'block';
        // Trigger reflow
        void modal.offsetWidth;
        modal.classList.add('show-modal');
        document.body.style.overflow = 'hidden';
    }
}

function closeProjectModal(projectId) {
    const modal = document.getElementById('project-modal-' + projectId);
    if(modal) {
        modal.classList.remove('show-modal');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Close project modal if clicked outside of content
window.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target == modal) {
            modal.classList.remove('show-modal');
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        }
    });
});

function setGalleryMain(projectId, thumbElement, src) {
    const mainImg = document.getElementById('gallery-main-img-' + projectId);
    if(mainImg) mainImg.src = src;
    
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

// Initialize audio context on first user interaction (browser policy)
document.addEventListener('click', initAudio, { once: true });
document.addEventListener('touchstart', initAudio, { once: true });

function playOverscrollSound() {
    if (!tapticAudioCtx) return;
    
    const now = Date.now();
    // Prevent spamming the sound (debounce 400ms)
    if (now - lastOverscrollTime < 400) return;
    lastOverscrollTime = now;
    
    if (tapticAudioCtx.state === 'suspended') {
        tapticAudioCtx.resume();
    }
    
    const oscillator = tapticAudioCtx.createOscillator();
    const gainNode = tapticAudioCtx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(tapticAudioCtx.destination);
    
    // Taptic bump sound: low frequency, very short duration
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(120, tapticAudioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(30, tapticAudioCtx.currentTime + 0.05);
    
    gainNode.gain.setValueAtTime(0.5, tapticAudioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, tapticAudioCtx.currentTime + 0.05);
    
    oscillator.start(tapticAudioCtx.currentTime);
    oscillator.stop(tapticAudioCtx.currentTime + 0.05);
    
    // Add a visual 'bump' effect to the body
    document.body.style.transition = 'transform 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    if (window.scrollY <= 0) {
        document.body.style.transform = 'translateY(15px)';
    } else {
        document.body.style.transform = 'translateY(-15px)';
    }
    setTimeout(() => {
        document.body.style.transform = 'translateY(0)';
    }, 100);
}

// Track wheel overscroll (desktop)
window.addEventListener('wheel', function(e) {
    if (e.deltaY < 0 && window.scrollY <= 0) {
        playOverscrollSound();
    } else if (e.deltaY > 0 && Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight) {
        playOverscrollSound();
    }
}, { passive: true });

// Track touch overscroll (mobile)
let touchStartY = 0;
window.addEventListener('touchstart', function(e) {
    touchStartY = e.touches[0].clientY;
}, { passive: true });

window.addEventListener('touchmove', function(e) {
    let touchEndY = e.touches[0].clientY;
    let deltaY = touchStartY - touchEndY; 
    
    if (deltaY < -5 && window.scrollY <= 0) {
        playOverscrollSound();
    } else if (deltaY > 5 && Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight) {
        playOverscrollSound();
    }
}, { passive: true });

