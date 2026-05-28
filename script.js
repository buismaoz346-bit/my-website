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
                currentLightboxImages = Array.from(clickableImages);
                currentLightboxIndex = currentLightboxImages.indexOf(this);
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
                    currentLightboxImages = Array.from(document.querySelectorAll('.cert-card .clickable-image'));
                    currentLightboxIndex = currentLightboxImages.indexOf(img);
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

let galleryHoldInterval;
let holdTimeout;

window.startGalleryHold = function(projectId, direction, event) {
    if(event) {
        event.stopPropagation();
        // Prevent default behavior like drag-selecting the image on desktop
        if(event.type === 'mousedown') event.preventDefault();
    }
    
    // Advance immediately once
    navigateProjectGallery(projectId, direction);
    
    // Clear any existing timers
    clearInterval(galleryHoldInterval);
    clearTimeout(holdTimeout);
    
    // Wait 400ms before starting continuous scroll (distinguish between click and hold)
    holdTimeout = setTimeout(() => {
        galleryHoldInterval = setInterval(() => {
            navigateProjectGallery(projectId, direction);
        }, 500); // 500ms between pictures during hold
    }, 400);
};

window.stopGalleryHold = function(event) {
    if(event) event.stopPropagation();
    clearTimeout(holdTimeout);
    clearInterval(galleryHoldInterval);
};
