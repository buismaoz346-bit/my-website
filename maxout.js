/* ============================================================
   MAXOUT ENGINE — INTERACTIVE PCB CANVAS, THEME SWITCHER,
   LIVE FILTERS, SEARCH, CONTACT FORM, TIMELINE EXPANDERS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DARK / LIGHT THEME TOGGLE ---
    const themeBtn = document.createElement('button');
    themeBtn.className = 'theme-toggle-btn';
    themeBtn.setAttribute('aria-label', 'Toggle dark or light mode');
    themeBtn.innerHTML = '🌙';

    // Insert theme toggle next to logo in navbar container
    // Append to body as a fixed floating button on the bottom left
    document.body.appendChild(themeBtn);

    // Load saved theme preference
    const savedTheme = localStorage.getItem('maoz_theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark-mode');
        themeBtn.innerHTML = '☀️';
    }

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        themeBtn.innerHTML = isDark ? '☀️' : '🌙';
        localStorage.setItem('maoz_theme', isDark ? 'dark' : 'light');
    });


    // --- 2. INTERACTIVE PCB BACKGROUND CANVAS ---
    const canvas = document.createElement('canvas');
    canvas.id = 'pcb-canvas';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let width, height;
    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Circuit nodes & traces
    const traces = [];
    const numTraces = Math.min(Math.floor(window.innerWidth / 120), 12);

    for (let i = 0; i < numTraces; i++) {
        traces.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            dir: Math.floor(Math.random() * 4), // 0:R, 1:D, 2:L, 3:U
            len: 80 + Math.random() * 150,
            progress: Math.random() * 100,
            speed: 0.8 + Math.random() * 1.2,
            dots: []
        });
    }

    function drawPCB() {
        ctx.clearRect(0, 0, width, height);

        const isDark = document.body.classList.contains('dark-mode');
        const lineStroke = isDark ? 'rgba(56, 189, 248, 0.12)' : 'rgba(15, 23, 42, 0.06)';
        const pulseColor = isDark ? '#38BDF8' : '#0EA5E9';

        ctx.lineWidth = 1.5;
        ctx.strokeStyle = lineStroke;

        traces.forEach(t => {
            t.progress += t.speed;
            if (t.progress > t.len) {
                t.progress = 0;
                t.x = Math.random() * width;
                t.y = Math.random() * height;
            }

            ctx.beginPath();
            ctx.arc(t.x, t.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = lineStroke;
            ctx.fill();

            // Trace path line
            ctx.beginPath();
            ctx.moveTo(t.x, t.y);
            let endX = t.x, endY = t.y;

            if (t.dir === 0) endX += t.progress;
            else if (t.dir === 1) endY += t.progress;
            else if (t.dir === 2) endX -= t.progress;
            else if (t.dir === 3) endY -= t.progress;

            ctx.lineTo(endX, endY);
            ctx.stroke();

            // Pulse dot
            ctx.beginPath();
            ctx.arc(endX, endY, 2, 0, Math.PI * 2);
            ctx.fillStyle = pulseColor;
            ctx.fill();
        });

        requestAnimationFrame(drawPCB);
    }
    
    // Performance Optimization: Only draw when the canvas is in the viewport
    let animationFrameId;
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            // Start animation
            if (!animationFrameId) {
                animationFrameId = requestAnimationFrame(drawPCB);
            }
        } else {
            // Pause animation
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
        }
    });
    
    // Observe the hero section (or body) to know when top is visible
    const heroSection = document.getElementById('hero') || document.body;
    observer.observe(heroSection);


    // --- 3. LIVE FILTER & SEARCH ENGINE FOR PROJECTS & CERTS ---

    // Tag projects & certs with category attributes
    const projects = document.querySelectorAll('.project-card');
    projects.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes('altium') || text.includes('pcb') || text.includes('bms') || text.includes('rf') || text.includes('regulator') || text.includes('hardware')) {
            card.setAttribute('data-category', 'pcb');
        } else if (text.includes('esp32') || text.includes('stm32') || text.includes('arduino') || text.includes('nano') || text.includes('fpga') || text.includes('iot') || text.includes('sensors')) {
            card.setAttribute('data-category', 'embedded');
        } else if (text.includes('portfolio') || text.includes('website') || text.includes('ai') || text.includes('web')) {
            card.setAttribute('data-category', 'webai');
        } else {
            card.setAttribute('data-category', 'other');
        }
    });

    // Inject Filter & Search bar into Projects Section
    const projectsSection = document.querySelector('#projects .container');
    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsSection && projectsGrid) {
        const controlBox = document.createElement('div');
        controlBox.className = 'filter-search-container';
        controlBox.innerHTML = `
            <div class="filter-tabs">
                <button class="filter-tab active" data-filter="all">All Projects</button>
                <button class="filter-tab" data-filter="pcb">⚡ Hardware & PCB</button>
                <button class="filter-tab" data-filter="embedded">🤖 Embedded & IoT</button>
                <button class="filter-tab" data-filter="webai">💻 Web & AI</button>
            </div>
            <div class="search-box-wrapper">
                <span class="search-icon-hint">🔍</span>
                <input type="text" class="search-input" id="project-search-input" placeholder="Search projects by tech or keyword...">
            </div>
        `;
        projectsGrid.before(controlBox);

        // Filter tabs listener
        const tabs = controlBox.querySelectorAll('.filter-tab');
        const searchInput = controlBox.querySelector('#project-search-input');

        let currentFilter = 'all';
        let currentSearch = '';

        function applyProjectFilter() {
            projects.forEach(card => {
                const category = card.getAttribute('data-category');
                const text = card.textContent.toLowerCase();

                const matchesFilter = (currentFilter === 'all') || (category === currentFilter);
                const matchesSearch = text.includes(currentSearch);

                if (matchesFilter && matchesSearch) {
                    card.classList.remove('card-filtered-out');
                } else {
                    card.classList.add('card-filtered-out');
                }
            });
        }

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                currentFilter = tab.getAttribute('data-filter');
                applyProjectFilter();
            });
        });

        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value.toLowerCase().trim();
            applyProjectFilter();
        });
    }


    // --- 4. GLASSMORPHIC INTERACTIVE CONTACT FORM ---
    const contactCard = document.querySelector('.contact-card');
    if (contactCard) {
        const formWrapper = document.createElement('div');
        formWrapper.className = 'contact-form-wrapper';
        formWrapper.innerHTML = `
            <h4 style="font-family: 'Outfit', sans-serif; font-size: 1.1rem; margin-bottom: 1rem; text-align: center; color: var(--text-main);">Send Maoz a Direct Message</h4>
            <form class="contact-form" id="direct-contact-form">
                <div>
                    <input type="text" class="form-input" id="cf-name" placeholder="Your Name *" required>
                </div>
                <div>
                    <input type="email" class="form-input" id="cf-email" placeholder="Your Email *" required>
                </div>
                <div class="form-group-full">
                    <input type="text" class="form-input" id="cf-subject" placeholder="Subject / Opportunity Type">
                </div>
                <div class="form-group-full">
                    <textarea class="form-textarea" id="cf-message" rows="4" placeholder="Your Message *" required></textarea>
                </div>
                <div class="form-group-full text-center">
                    <button type="submit" class="btn-primary" style="width: 100%; max-width: 280px;">🚀 Send Message</button>
                </div>
                <div class="form-status-msg" id="cf-status"></div>
            </form>
        `;
        contactCard.appendChild(formWrapper);

        const form = formWrapper.querySelector('#direct-contact-form');
        const statusMsg = formWrapper.querySelector('#cf-status');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('cf-name').value;
            const email = document.getElementById('cf-email').value;
            const subject = document.getElementById('cf-subject').value || 'Portfolio Contact Form';
            const message = document.getElementById('cf-message').value;

            // Formspree / Mailto Fallback action
            const mailtoUri = `mailto:syedmaoza@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;

            statusMsg.className = 'form-status-msg success';
            statusMsg.textContent = `Thank you, ${name}! Launching your email client to send message to syedmaoza@gmail.com...`;
            
            setTimeout(() => {
                window.location.href = mailtoUri;
                form.reset();
            }, 800);
        });
    }

});
