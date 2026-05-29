// ============================================================
// MAOZ AI - Portfolio Knowledge Engine
// ============================================================

(function() {
    'use strict';

    // ==================== KNOWLEDGE BASE ====================
    const KB = {
        name: "Syed Maoz Arif",
        role: "Hardware Developer & Electronics Engineer",
        university: "COMSATS University Islamabad, Abbottabad Campus",
        degree: "BSc Electrical and Electronics Engineering (EEE)",
        semester: "4th Semester",
        expectedGrad: "2028",
        enrollmentYear: "2024",
        studentId: "FA24-EEE-014",
        email: "syedmaoza@gmail.com",
        eduEmail: "FA24-EEE-014@cuiatd.edu.pk",
        phone: "+92 321 914 3144",
        linkedin: "https://www.linkedin.com/in/syed-maoz",
        facebook: "https://www.facebook.com/syedmaozarif",
        college: "Peace Group of School & College, Abbottabad",
        collegeCompleted: "2024",
        collegeDegree: "FSc Pre-Engineering",

        about: "Syed Maoz Arif is a hardware developer and electronics engineering student in his 4th semester at COMSATS University, with hands-on experience in multi-layer PCB design and embedded systems. He doesn't just study engineering — he builds things that work in the real world, from first schematic to final production. Beyond the lab, he believes great engineers also lead. As Membership Head for IET On Campus and a Cabinet Member of the Youth Parliament Pakistan, he's learned that the best solutions come from people who can both think critically and bring others together.",

        traits: [
            "Engineering Academic: 4th-semester Electrical (Electronics) Engineering undergraduate at COMSATS University Abbottabad.",
            "Technical Specialist: Expert in multi-layer PCB design, embedded systems/IoT (ESP32, STM32), and 3D mechanical modeling.",
            "Active Freelancer: Professional hardware and mechanical designer providing services on Fiverr and Upwork.",
            "Recognized Innovator: Altium Global Scholarship awardee and runner-up in the Instructables Sensors Contest.",
            "Community Leader: Membership Head for IET On Campus and Cabinet Member of the Youth Parliament Pakistan.",
            "Versatile Developer: Proficient in Altium Designer, Autodesk Fusion 360, Python, and LaTeX.",
            "Sports Enthusiast: Active in cricket."
        ],

        projects: [
            { name: "IncliSense Digital Level", tech: "Arduino Nano, MPU6050, IoT, 3D Printing", desc: "A precision digital leveling device built to provide high-accuracy numerical feedback, featuring PC telemetry and a responsive 11-LED interface. This is the Featured Project and won Runner-Up in the Instructables Sensors Contest 2026.", featured: true },
            { name: "Smart Lighting System", tech: "Altium, ATMEGA328PB-AU, ToF", desc: "A smart lighting system designed with advanced PCB layout in Altium Designer, using Time-of-Flight sensors for intelligent light control." },
            { name: "Omni-Sense Node", tech: "ESP32, SPI, PWM, RFID", desc: "A multi-sensor IoT node built around the ESP32 platform, integrating SPI, PWM, and RFID communication protocols." },
            { name: "Power Regulator Board", tech: "Altium, Regulator IC", desc: "A custom power regulation board designed in Altium for stable voltage output in embedded systems." },
            { name: "6S UAV BMS", tech: "BQ76930, XT60, MOSFETs", desc: "A 6-cell battery management system for UAVs using the BQ76930 IC, XT60 connectors, and MOSFET-based protection." },
            { name: "Mixed-Signal RF Board", tech: "ESP32, RF TX/RX, 50Ω Impedance", desc: "A mixed-signal PCB with both analog RF and digital sections, featuring 50-ohm impedance-matched RF traces for reliable wireless communication." }
        ],

        certifications: [
            { name: "Generative AI Mastermind", issuer: "Outskill", desc: "Certificate of Completion awarded for successfully finishing the Generative AI Mastermind program, demonstrating a foundational understanding of generative AI technologies." },
            { name: "Altium Certified: Designer Essentials", issuer: "Altium", date: "April 5, 2026", desc: "Successfully fulfilled the official certification requirements for the Altium Designer Essentials program, demonstrating formal training and proficiency in industry-standard electronics design software." },
            { name: "Altium Education PCB Basic Design Course", issuer: "Altium Education", desc: "Completed the Altium Education PCB Basic Design Course. Demonstrates foundational expertise in PCB layout, schematic capture, and preparing boards for manufacturing." },
            { name: "Best Project Award", desc: "Received the Best Project Award for demonstrating exceptional excellence in engineering design, technical innovation, and practical execution." },
            { name: "Inovatex Project 2025", desc: "Recognized for outstanding contribution to the Inovatex Project 2025, showcasing forward-thinking design and complex technical execution." },
            { name: "Kangaroo Test Achievement", desc: "Successfully participated in the prestigious Kangaroo Test, demonstrating strong analytical, mathematical, and problem-solving skills." },
            { name: "IET On Campus Leadership", issuer: "IET", desc: "Recognized for exceptional leadership and organizational contributions as a Membership Officer for the IET On Campus community." },
            { name: "Arduino & IoT - Cardiff Institute", issuer: "Cardiff Institute", desc: "Completed the comprehensive Arduino and IoT course, gaining hands-on experience in building smart, connected hardware devices and sensor networks." },
            { name: "Practical Entrepreneurship", desc: "Completed intensive training in Practical Entrepreneurship, learning how to bridge the gap between technical engineering solutions and real-world business applications." },
            { name: "Unleashing Creativity with AI", desc: "Participated in the Unleashing Creativity with AI program, exploring innovative applications and the intersection of artificial intelligence with creative engineering processes." },
            { name: "IET On Campus Recognition", issuer: "IET", desc: "Acknowledged for active participation and dedication to the IET On Campus community, fostering technical growth and professional collaboration." }
        ],

        awards: [
            { name: "Best Project Award", desc: "Awarded 'Best Project' for outstanding engineering design, technical execution, and innovation, demonstrating a high level of problem-solving and practical prototyping capability." },
            { name: "1st Position - Best Circuit Design", desc: "Secured first place in a competitive hardware workshop at COMSATS University Islamabad, Abbottabad Campus in collaboration with IET. Demonstrated advanced proficiency in applied electronics by engineering an efficient, functional circuit layout under strict time constraints." },
            { name: "Altium Designer Essentials", issuer: "Altium", desc: "Successfully fulfilled the certification requirements for the Altium Designer Essentials program, demonstrating proficiency in professional PCB design and schematic capture." },
            { name: "Instructables Contest Winner", date: "April 2026", desc: "Awarded Runner Up in the global Instructables Sensors Contest for the 'IncliSense' project, earning a bronze medal and recognition for precision-engineered dual-axis digital level design." }
        ],

        experience: [
            { title: "Membership Head", org: "IET On Campus Abbottabad", date: "May 2025 - Present", category: "Leadership", desc: "Leading membership initiatives and organizing technical events, including coordinating workshops like Computer Vision & AI in UAVs." },
            { title: "Cabinet Member", org: "Youth Parliament Pakistan", date: "2025 - 2027 Session", category: "Leadership", desc: "Serving in a leadership capacity for youth advocacy and policy discussions." },
            { title: "Runner-Up", org: "Instructables Sensors Contest 2026", date: "April 2026", category: "Award", desc: "Recognized for designing and developing the 'IncliSense' project." },
            { title: "Awardee", org: "Altium Global Scholarship Program", date: "March 2026", category: "Award", desc: "Selected as an emerging engineer for professional development and technical excellence." },
            { title: "Freelance Hardware & Mechanical Designer", org: "Fiverr & Upwork", category: "Professional", desc: "Providing professional PCB design, multi-layer board development, and 3D modeling services to international clients." }
        ],

        skills: [
            { name: "PCB Design & Hardware Engineering", desc: "Professional multi-layer board development, schematic capture, and manufacturing preparation using Altium Designer and Altium 365." },
            { name: "Embedded Systems & IoT", desc: "Firmware development and sensor integration for ESP32, STM32, and Arduino, including real-time data streaming via MQTT and Firebase." },
            { name: "3D Modeling & CAD", desc: "Mechanical product design, parametric modeling, and assembly creation for 3D printing using Autodesk Fusion 360 and Inventor." },
            { name: "Programming & Technical Writing", desc: "Object-oriented programming and automation using Python, alongside professional document and report formatting utilizing LaTeX and Overleaf." },
            { name: "Web Development & UI/UX", desc: "Designing and building responsive, modern, and interactive websites using HTML, CSS, JavaScript." },
            { name: "Leadership & Project Management", desc: "Delivering freelance engineering projects on Upwork and Fiverr, combined with organizational leadership as Membership Head for IET On Campus and a Cabinet Member of Youth Parliament Pakistan." },
            { name: "Interpersonal Skills", desc: "Public Speaking, Teamwork Skills, Communication, Collaboration, Empathy." },
            { name: "Critical Thinking", desc: "Creativity, Problem Solving, Organization." }
        ],

        software: {
            "ECAD": "Altium Designer, Altium 365, CircuitStudio, KiCad, EasyEDA, Proteus, LTspice, Multisim",
            "MCAD": "Autodesk Inventor Professional, SolidWorks, Autodesk Fusion 360, AutoCAD, Revit, Tinkercad",
            "Programming": "Python, MATLAB, Embedded IDEs (ESP32, STM32, Arduino), Flutter, Antigravity",
            "IoT & Cloud": "Blynk, Firebase, MQTT Clients",
            "AI & ML": "Gemini, ChatGPT, Claude, Perplexity, Grok, Google AI Studio, Microsoft Copilot",
            "Documentation": "LaTeX, Overleaf, draw.io, Adobe Photoshop, Canva, Inkscape",
            "Collaboration": "Microsoft Teams, Zoom, Microsoft Word, Excel, PowerPoint, OneNote"
        }
    };

    // ==================== RESPONSE ENGINE ====================
    function getResponse(query) {
        const q = query.toLowerCase().trim();

        // Greetings
        if (/^(hi|hello|hey|assalam|salam|greetings|good morning|good evening)/.test(q)) {
            return `Hello! 👋 I'm **Maoz AI**, the personal assistant for **${KB.name}**'s portfolio. I know everything about his projects, certifications, skills, education, and experience.\n\nFeel free to ask me anything! For example:\n- "What are his projects?"\n- "Tell me about his certifications"\n- "What skills does he have?"`;
        }

        // Who is / About
        if (/who (is|are)|about (him|maoz|syed)|tell me about|introduce|yourself/.test(q)) {
            return `**${KB.name}** is a ${KB.role} currently in his **${KB.semester}** at **${KB.university}**.\n\n${KB.about}\n\n📧 Email: ${KB.email}\n📱 Phone: ${KB.phone}\n🔗 LinkedIn: ${KB.linkedin}`;
        }

        // Name
        if (/what('s| is) (his|the) (full )?name|his name/.test(q)) {
            return `His full name is **${KB.name}**.`;
        }

        // Contact / Email / Phone
        if (/contact|email|phone|reach|number|call/.test(q)) {
            return `📧 **Personal Email:** ${KB.email}\n📧 **University Email:** ${KB.eduEmail}\n📱 **Phone:** ${KB.phone}\n🔗 **LinkedIn:** ${KB.linkedin}\n📘 **Facebook:** ${KB.facebook}`;
        }

        // Education
        if (/education|university|college|degree|study|student|semester|comsats|peace group/.test(q)) {
            return `🎓 **Education:**\n\n**${KB.university}** (${KB.enrollmentYear} - ${KB.expectedGrad} Expected)\n- Degree: ${KB.degree}\n- Currently in: ${KB.semester}\n- Student ID: ${KB.studentId}\n- Focus: Embedded Systems, PCB Design, Signal Integrity, IoT\n\n**${KB.college}** (Completed ${KB.collegeCompleted})\n- Degree: ${KB.collegeDegree}\n- Focus: Mathematics, Physics, Analytical Reasoning`;
        }

        // Projects
        if (/project|build|made|created|developed|inclisense|smart lighting|omni.?sense|power regulator|bms|uav|rf board|mixed.?signal/.test(q)) {
            // Specific project lookup
            for (const p of KB.projects) {
                if (q.includes(p.name.toLowerCase()) || (p.name === "IncliSense Digital Level" && q.includes("inclisense"))) {
                    return `🚀 **${p.name}**${p.featured ? ' ⭐ (Featured Project)' : ''}\n\n**Tech Stack:** ${p.tech}\n\n${p.desc}`;
                }
            }
            // All projects
            let resp = `🚀 **Maoz has built ${KB.projects.length} projects:**\n\n`;
            KB.projects.forEach((p, i) => {
                resp += `**${i+1}. ${p.name}**${p.featured ? ' ⭐' : ''}\n- Tech: ${p.tech}\n- ${p.desc}\n\n`;
            });
            return resp;
        }

        // Certifications
        if (/certif|certificate/.test(q)) {
            // Specific cert
            for (const c of KB.certifications) {
                if (q.includes(c.name.toLowerCase())) {
                    return `📜 **${c.name}**${c.issuer ? `\nIssued by: ${c.issuer}` : ''}${c.date ? `\nDate: ${c.date}` : ''}\n\n${c.desc}`;
                }
            }
            let resp = `📜 **Maoz holds ${KB.certifications.length} certifications:**\n\n`;
            KB.certifications.forEach((c, i) => {
                resp += `**${i+1}. ${c.name}**${c.issuer ? ` (${c.issuer})` : ''}${c.date ? ` — ${c.date}` : ''}\n- ${c.desc}\n\n`;
            });
            return resp;
        }

        // Awards
        if (/award|winner|won|achievement|prize|medal|first position|runner.?up|instructables|contest/.test(q)) {
            for (const a of KB.awards) {
                if (q.includes(a.name.toLowerCase())) {
                    return `🏆 **${a.name}**${a.date ? `\nDate: ${a.date}` : ''}\n\n${a.desc}`;
                }
            }
            let resp = `🏆 **Maoz has earned ${KB.awards.length} awards:**\n\n`;
            KB.awards.forEach((a, i) => {
                resp += `**${i+1}. ${a.name}**${a.date ? ` — ${a.date}` : ''}\n- ${a.desc}\n\n`;
            });
            return resp;
        }

        // Experience
        if (/experience|work|job|career|freelance|fiverr|upwork|iet|youth parliament|membership/.test(q)) {
            let resp = `💼 **Experience & Roles:**\n\n`;
            KB.experience.forEach((e, i) => {
                resp += `**${i+1}. ${e.title}** — ${e.org}\n- ${e.date ? `Period: ${e.date}` : 'Ongoing'} | Category: ${e.category}\n- ${e.desc}\n\n`;
            });
            return resp;
        }

        // Skills
        if (/skill|can he|what (does|can) he do|abilities|capable|expertise|proficien/.test(q)) {
            let resp = `⚡ **Skills & Expertise:**\n\n`;
            KB.skills.forEach((s, i) => {
                resp += `**${i+1}. ${s.name}**\n- ${s.desc}\n\n`;
            });
            return resp;
        }

        // Software / Tools
        if (/software|tool|program|altium|fusion|python|matlab|kicad|solidworks|autocad|latex|photoshop/.test(q)) {
            let resp = `🛠️ **Technical Software Suite:**\n\n`;
            for (const [cat, tools] of Object.entries(KB.software)) {
                resp += `**${cat}:** ${tools}\n\n`;
            }
            return resp;
        }

        // Traits
        if (/trait|define|quality|characteristic|what makes|strength/.test(q)) {
            let resp = `✨ **What defines ${KB.name}:**\n\n`;
            KB.traits.forEach((t, i) => {
                resp += `${i+1}. ${t}\n`;
            });
            return resp;
        }

        // Student ID
        if (/student.?id|roll.?no|enrollment/.test(q)) {
            return `🆔 **Student ID:** ${KB.studentId}\n📧 **University Email:** ${KB.eduEmail}`;
        }

        // Hobbies
        if (/hobb|interest|free time|fun|cricket|sport|trek/.test(q)) {
            return `🏏 Maoz is an active **cricket** player and loves **trekking** and exploring new places. He says it fuels his creativity and keeps him grounded when away from the workbench.`;
        }

        // Freelancing
        if (/freelanc|fiverr|upwork|client|hire/.test(q)) {
            return `💼 Maoz is an **active freelancer** on both **Fiverr** and **Upwork**, providing professional:\n\n- 🔧 PCB Design & Multi-layer board development\n- 🏗️ 3D Mechanical Modeling\n- ⚡ Hardware & Embedded Systems Design\n\nHe serves international clients with industry-grade deliverables.`;
        }

        // How many
        if (/how many/.test(q)) {
            if (/project/.test(q)) return `Maoz has built **${KB.projects.length} projects** so far.`;
            if (/certif/.test(q)) return `Maoz holds **${KB.certifications.length} certifications**.`;
            if (/award/.test(q)) return `Maoz has earned **${KB.awards.length} awards**.`;
            if (/skill/.test(q)) return `Maoz has **${KB.skills.length} core skill areas**.`;
            return `📊 **Portfolio Stats:**\n- ${KB.projects.length} Projects\n- ${KB.certifications.length} Certifications\n- ${KB.awards.length} Awards\n- ${KB.skills.length} Core Skills\n- ${KB.experience.length} Experiences`;
        }

        // Resume / CV
        if (/resume|cv|download/.test(q)) {
            return `📄 You can download Maoz's CV from the main portfolio page. Look for the **"Download CV"** button in the hero section, or click [here](Documents/CV1.pdf).`;
        }

        // Thank you
        if (/thank|thanks|thx/.test(q)) {
            return `You're welcome! 😊 Feel free to ask anything else about **${KB.name}**'s portfolio. I'm here to help!`;
        }

        // Capabilities
        if (/what can you|help|what do you know|capable/.test(q)) {
            return `I know everything about **${KB.name}**'s portfolio! You can ask me about:\n\n- 👤 **About** — Who is Maoz?\n- 🚀 **Projects** — All 6 projects with tech stacks\n- 📜 **Certifications** — All 11 certificates with details\n- 🏆 **Awards** — All 4 awards\n- 💼 **Experience** — Work and leadership roles\n- ⚡ **Skills** — Technical and soft skills\n- 🛠️ **Software** — Every tool he uses\n- 🎓 **Education** — University and college details\n- 📧 **Contact** — Email, phone, social links\n- 🆔 **Student ID** — Enrollment details`;
        }

        // Fallback
        return `I'm not sure about that specific question, but I know everything about **${KB.name}**'s portfolio! Try asking about:\n\n- His **projects** (6 total)\n- His **certifications** (11 total)\n- His **awards** (4 total)\n- His **skills** and **software**\n- His **education** and **experience**\n- His **contact** information`;
    }

    // ==================== UI ENGINE ====================
    function createUI() {
        // Toggle Button
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'ai-toggle-btn';
        toggleBtn.innerHTML = '✨';
        toggleBtn.title = 'Switch to AI Mode';
        document.body.appendChild(toggleBtn);

        // Overlay
        const overlay = document.createElement('div');
        overlay.className = 'ai-overlay';
        overlay.innerHTML = `
            <div class="ai-header">
                <div class="ai-header-left">
                    <div class="ai-logo">✨</div>
                    <div>
                        <div class="ai-header-title">Maoz AI</div>
                        <div class="ai-header-subtitle">Portfolio Knowledge Engine</div>
                    </div>
                </div>
                <button class="ai-back-btn">← Back to Portfolio</button>
            </div>
            <div class="ai-chat-container" id="ai-chat">
                <div class="ai-welcome">
                    <div class="ai-welcome-icon">✨</div>
                    <h2>Hello, I'm Maoz AI</h2>
                    <p>I know everything about Syed Maoz Arif's portfolio — projects, certifications, skills, education, experience, and more. Ask me anything!</p>
                    <div class="ai-suggestions">
                        <button class="ai-chip">Who is Maoz?</button>
                        <button class="ai-chip">Show me his projects</button>
                        <button class="ai-chip">What certifications does he have?</button>
                        <button class="ai-chip">What are his skills?</button>
                        <button class="ai-chip">Contact info</button>
                        <button class="ai-chip">How many awards?</button>
                    </div>
                </div>
            </div>
            <div class="ai-input-area">
                <div class="ai-input-wrapper">
                    <input class="ai-input" type="text" placeholder="Ask me anything about Maoz's portfolio..." autocomplete="off" />
                    <button class="ai-send-btn">➤</button>
                </div>
                <div class="ai-disclaimer">Maoz AI is a portfolio assistant. All information is sourced from the portfolio content.</div>
            </div>
        `;
        document.body.appendChild(overlay);

        // Elements
        const chat = overlay.querySelector('#ai-chat');
        const input = overlay.querySelector('.ai-input');
        const sendBtn = overlay.querySelector('.ai-send-btn');
        const backBtn = overlay.querySelector('.ai-back-btn');
        const chips = overlay.querySelectorAll('.ai-chip');
        let welcomeShown = true;

        // Markdown-lite parser
        function parseMd(text) {
            return text
                .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                .replace(/\n/g, '<br>')
                .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" style="color:#64ffda;">$1</a>');
        }

        // Add message
        function addMessage(text, isUser) {
            if (welcomeShown) {
                const welcome = chat.querySelector('.ai-welcome');
                if (welcome) welcome.remove();
                welcomeShown = false;
            }

            const msg = document.createElement('div');
            msg.className = `ai-message ${isUser ? 'user' : 'bot'}`;
            msg.innerHTML = `
                <div class="ai-message-avatar">${isUser ? 'Y' : '✨'}</div>
                <div class="ai-message-content">${isUser ? text : parseMd(text)}</div>
            `;
            chat.appendChild(msg);
            chat.scrollTop = chat.scrollHeight;
        }

        // Typing indicator
        function showTyping() {
            const typing = document.createElement('div');
            typing.className = 'ai-message bot';
            typing.id = 'ai-typing';
            typing.innerHTML = `
                <div class="ai-message-avatar">✨</div>
                <div class="ai-message-content">
                    <div class="ai-typing">
                        <div class="ai-typing-dot"></div>
                        <div class="ai-typing-dot"></div>
                        <div class="ai-typing-dot"></div>
                    </div>
                </div>
            `;
            chat.appendChild(typing);
            chat.scrollTop = chat.scrollHeight;
        }

        function removeTyping() {
            const t = document.getElementById('ai-typing');
            if (t) t.remove();
        }

        // Send message
        function send(text) {
            if (!text.trim()) return;
            addMessage(text, true);
            input.value = '';
            showTyping();

            // Simulate thinking delay
            const delay = 400 + Math.random() * 800;
            setTimeout(() => {
                removeTyping();
                const response = getResponse(text);
                addMessage(response, false);
            }, delay);
        }

        // Events
        sendBtn.addEventListener('click', () => send(input.value));
        input.addEventListener('keydown', (e) => { if (e.key === 'Enter') send(input.value); });
        chips.forEach(chip => chip.addEventListener('click', () => send(chip.textContent)));

        // Toggle AI Mode
        toggleBtn.addEventListener('click', () => {
            overlay.classList.add('active');
            document.body.classList.add('ai-active');
            setTimeout(() => input.focus(), 600);
        });

        backBtn.addEventListener('click', () => {
            overlay.classList.remove('active');
            document.body.classList.remove('ai-active');
        });

        // Escape to exit
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && overlay.classList.contains('active')) {
                overlay.classList.remove('active');
                document.body.classList.remove('ai-active');
            }
        });
    }

    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createUI);
    } else {
        createUI();
    }
})();
