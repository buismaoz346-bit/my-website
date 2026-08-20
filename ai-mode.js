// ============================================================
// MAOZ AI v4.0 - Advanced Portfolio Knowledge Engine + Gemini
// Upgrades: Conversation Memory, Time-Aware Greetings,
// Cross-Referencing, Follow-Up Suggestions, Richer Responses,
// Smart Search, New Patterns, Conversation Stats, GEMINI API
// ============================================================

(function() {
    'use strict';

    // ==================== DEEP KNOWLEDGE BASE ====================
    const KB = {
        name: "Syed Maoz Arif",
        role: "Hardware Developer & Electronics Engineer",
        university: "COMSATS University Islamabad, Abbottabad Campus",
        universityUrl: "https://cuiatd.edu.pk/",
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
        collegeUrl: "https://www.peace.edu.pk/",
        collegeCompleted: "2024",
        collegeDegree: "FSc Pre-Engineering",
        collegeSubjects: "Mathematics, Physics, Analytical Reasoning",
        location: "Abbottabad, Pakistan",
        hobbies: ["Cricket", "Trekking", "Exploring new places"],

        about: "Syed Maoz Arif is a hardware developer and electronics engineering student in his 4th semester at COMSATS University, with hands-on experience in multi-layer PCB design and embedded systems. He doesn't just study engineering — he builds things that work in the real world, from first schematic to final production. Beyond the lab, he believes great engineers also lead. As President for IET On Campus and a Cabinet Member of the Youth Parliament Pakistan, he's learned that the best solutions come from people who can both think critically and bring others together.",

        traits: [
            { trait: "Engineering Academic", detail: "4th-semester Electrical (Electronics) Engineering undergraduate at COMSATS University Abbottabad." },
            { trait: "Technical Specialist", detail: "Expert in multi-layer PCB design, embedded systems/IoT (ESP32, STM32), and 3D mechanical modeling." },
            { trait: "Active Freelancer", detail: "Professional hardware and mechanical designer providing services on Fiverr and Upwork." },
            { trait: "Recognized Innovator", detail: "Altium Global Scholarship awardee and runner-up in the Instructables Sensors Contest." },
            { trait: "Community Leader", detail: "President for IET On Campus and Cabinet Member of the Youth Parliament Pakistan." },
            { trait: "Versatile Developer", detail: "Proficient in Altium Designer, Autodesk Fusion 360, Python, and LaTeX." },
            { trait: "Sports Enthusiast", detail: "Active in cricket." }
        ],

        projects: [
            { id: "p10", name: "Industrial Edge-AI Condition Monitoring & 3D Digital Twin", tech: ["STM32H7", "ESP32 WROOM", "Ethernet", "Panasonic Relays", "Altium Designer"], desc: "An industrial-grade development board for Edge-AI condition monitoring and 3D digital twin applications for 3-Phase Induction Motors. Features dual-MCU architecture, robust 24V power, and 70 GPIOs.", featured: true, achievement: "Won 1st Position in Complex Engineering Project Exhibition (102 projects)", date: "2026" },
            { id: "p9_fpga", name: "First FPGA Programming - iCEbreaker", tech: ["Verilog", "iCEbreaker", "FPGA", "Digital Logic"], desc: "My foray into Field-Programmable Gate Arrays (FPGAs) using the iCEbreaker development board, featuring a simple LED blinking circuit implemented in Verilog using the open-source iceStorm toolchain.", date: "2026" },
            { id: "p11", name: "Stratum-1 Precision Hardware Clock", tech: ["Verilog", "Lattice iCE40UP5K FPGA", "GPS NMEA", "Digital Logic"], desc: "Designed and implemented a Stratum-1 precision hardware clock synchronizer and GPS pass-through bridge using pure digital logic on a Lattice iCE40UP5K FPGA (iCEBreaker) and a NEO-6M GPS module. Completely bypasses the need for microprocessors.", date: "2026" },
            { id: "p6", name: "IncliSense Digital Level", tech: ["Arduino Nano", "MPU6050", "IoT", "3D Printing"], desc: "A precision digital leveling device built to provide high-accuracy numerical feedback, featuring PC telemetry and a responsive 11-LED interface.", featured: false, achievement: "Won Runner-Up in Instructables Sensors Contest 2026", date: "2026" },
            { id: "p1", name: "Smart Lighting System", tech: ["Altium Designer", "ATMEGA328PB-AU", "Time-of-Flight Sensor"], desc: "A smart lighting system designed with advanced PCB layout in Altium Designer, using Time-of-Flight sensors for intelligent light control." },
            { id: "p2", name: "Omni-Sense Node", tech: ["ESP32", "SPI", "PWM", "RFID"], desc: "A multi-sensor IoT node built around the ESP32 platform, integrating SPI, PWM, and RFID communication protocols." },
            { id: "p3", name: "Power Regulator Board", tech: ["Altium Designer", "Regulator IC"], desc: "A custom power regulation board designed in Altium for stable voltage output in embedded systems." },
            { id: "p4", name: "6S UAV BMS", tech: ["BQ76930", "XT60", "MOSFETs"], desc: "A 6-cell battery management system for UAVs using the BQ76930 IC, XT60 connectors, and MOSFET-based protection circuitry." },
            { id: "p5", name: "Mixed-Signal RF Board", tech: ["ESP32", "RF TX/RX", "50Ω Impedance Matching"], desc: "A mixed-signal PCB with both analog RF and digital sections, featuring 50-ohm impedance-matched RF traces for reliable wireless communication." }
        ],

        certifications: [
            { name: "Generative AI Mastermind", issuer: "Outskill", date: "2025", category: "AI", desc: "Certificate of Completion for the Generative AI Mastermind program, demonstrating foundational understanding of generative AI technologies.", tags: ["ai", "generative", "outskill"] },
            { name: "Altium Certified: Designer Essentials", issuer: "Altium", date: "April 5, 2026", category: "PCB/Hardware", desc: "Official certification for the Altium Designer Essentials program, demonstrating formal training and proficiency in industry-standard electronics design software.", tags: ["altium", "pcb", "hardware", "design", "essentials"] },
            { name: "Altium Education PCB Basic Design Course", issuer: "Altium Education", date: "2025", category: "PCB/Hardware", desc: "Completed the Altium Education PCB Basic Design Course. Demonstrates foundational expertise in PCB layout, schematic capture, and preparing boards for manufacturing using industry-standard tools.", tags: ["altium", "pcb", "basic", "education"] },
            { name: "Best Project Award", issuer: "COMSATS University", date: "February 23, 2026", category: "Academic", desc: "Received the Best Project Award for demonstrating exceptional excellence in engineering design, technical innovation, and practical execution.", tags: ["project", "award", "best", "comsats"] },
            { name: "Inovatex Project 2025", issuer: "Inovatex", date: "February 23, 2026", category: "Competition", desc: "Recognized for outstanding contribution to the Inovatex Project 2025, showcasing forward-thinking design and complex technical execution.", tags: ["inovatex", "competition", "innovation"] },
            { name: "Kangaroo Test Achievement", issuer: "Kangaroo Organization", date: "February 23, 2026", category: "Academic", desc: "Successfully participated in the prestigious Kangaroo Test, demonstrating strong analytical, mathematical, and problem-solving skills.", tags: ["kangaroo", "test", "math", "academic"] },
            { name: "IET On Campus Leadership", issuer: "IET (Institution of Engineering and Technology)", date: "February 23, 2026", category: "Leadership", desc: "Recognized for exceptional leadership and organizational contributions as President for the IET On Campus community.", tags: ["iet", "leadership", "president"] },
            { name: "Arduino & IoT - Cardiff Institute", issuer: "Cardiff Institute", date: "February 23, 2026", category: "IoT/Embedded", desc: "Completed the comprehensive Arduino and IoT course from Cardiff Institute, gaining hands-on experience in building smart, connected hardware devices and sensor networks.", tags: ["arduino", "iot", "cardiff", "embedded"] },
            { name: "Practical Entrepreneurship", issuer: "Training Institute", date: "February 23, 2026", category: "Business", desc: "Completed intensive training in Practical Entrepreneurship, learning how to bridge the gap between technical engineering solutions and real-world business applications.", tags: ["entrepreneurship", "business"] },
            { name: "Unleashing Creativity with AI", issuer: "Workshop Organizer", date: "February 23, 2026", category: "AI", desc: "Participated in the Unleashing Creativity with AI program, exploring innovative applications and the intersection of artificial intelligence with creative engineering processes.", tags: ["ai", "creativity", "workshop"] },
            { name: "IET On Campus Recognition", issuer: "IET (Institution of Engineering and Technology)", date: "February 23, 2026", category: "Community", desc: "Acknowledged for active participation and dedication to the IET On Campus community, fostering technical growth and professional collaboration.", tags: ["iet", "recognition", "community"] },
            { name: "Best CEP Project Award — 1st Position", issuer: "COMSATS University & District Youth Office Abbottabad", date: "July 22, 2026", category: "Academic", desc: "Secured First Position in the Complex Engineering Problem Exhibition SP26 (Software Category) for the project 'Industrial Edge AI Condition Monitoring and 3D Digital Twin' at COMSATS University Islamabad, Abbottabad Campus.", tags: ["cep", "project", "award", "best", "first", "1st", "comsats", "ai", "digital twin", "exhibition"] },
            { name: "Organizer Certificate — Project Exhibition 2026", issuer: "COMSATS University Islamabad, Abbottabad Campus", date: "July 2026", category: "Leadership/Organizing", desc: "Awarded in recognition of outstanding efforts and valuable contributions as an Organizer for the CEP & Semester Project Exhibition Spring 2026.", tags: ["organizer", "certificate", "exhibition", "comsats", "cep", "sp26"] }
        ],

        awards: [
            { name: "Best Project Award", issuer: "COMSATS University", date: "2026", desc: "Awarded 'Best Project' for outstanding engineering design, technical execution, and innovation at COMSATS University.", tags: ["best", "project"] },
            { name: "1st Position - Best Circuit Design", issuer: "COMSATS University & IET", date: "2026", desc: "Secured first place in a competitive hardware workshop at COMSATS University Islamabad, Abbottabad Campus in collaboration with IET. Demonstrated advanced proficiency in applied electronics by engineering an efficient, functional circuit layout under strict time constraints.", tags: ["circuit", "design", "first", "1st", "iet", "workshop"] },
            { name: "Altium Designer Essentials Certification", issuer: "Altium", date: "April 5, 2026", desc: "Successfully fulfilled the certification requirements for the Altium Designer Essentials program, demonstrating proficiency in professional PCB design and schematic capture.", tags: ["altium", "certification"] },
            { name: "Instructables Sensors Contest Runner-Up", issuer: "Instructables (Global)", date: "April 2026", desc: "Awarded Runner Up in the global Instructables Sensors Contest for the 'IncliSense' project, earning a bronze medal and recognition for precision-engineered dual-axis digital level design.", tags: ["instructables", "contest", "sensors", "runner", "inclisense", "global", "bronze"] },
            { name: "Best CEP Project Award — 1st Position", issuer: "COMSATS University & District Youth Office Abbottabad", date: "July 22, 2026", desc: "Secured First Position in the Complex Engineering Problem Exhibition SP26 (Software Category) for the project 'Industrial Edge AI Condition Monitoring and 3D Digital Twin' at COMSATS University Islamabad, Abbottabad Campus, in collaboration with District Youth Office Abbottabad and IET.", tags: ["cep", "project", "award", "best", "first", "1st", "comsats", "ai", "digital twin", "exhibition", "sp26"] },
            { name: "2nd Position — EMCOT 2026 Best Complex Engineering Project", issuer: "Department of Electrical Engineering, COMSATS Abbottabad & IET", date: "August 18, 2026", desc: "Secured 2nd Position in the Best Complex Engineering Project Award at EMCOT 2026 (Exhibition of Major Complex Outstanding Tasks) at COMSATS University Islamabad, Abbottabad Campus. The project 'Industrial Edge-AI Condition Monitoring & 3D Digital Twin for 3-Phase Induction Motors' was awarded under the supervision of Dr. Faisal Khan. Event co-organized with Technolean Lab.", tags: ["emcot", "2nd", "second", "best", "cep", "exhibition", "comsats", "iet", "2026", "ai", "edge-ai", "digital twin"] }
        ],

        experience: [
            { title: "President", org: "IET On Campus CUI Abbottabad", date: "July 2026 - Present", category: "Leadership", desc: "Assuming executive leadership responsibilities, guiding chapter operations, and representing the student branch to foster engineering excellence and professional development among members.", tags: ["iet", "president", "leadership", "executive"] },
            { title: "Membership Head", org: "IET On Campus Abbottabad", date: "May 2025 - Present", category: "Leadership", desc: "Leading membership initiatives and organizing technical events, including coordinating workshops like Computer Vision & AI in UAVs.", tags: ["iet", "membership", "head", "leadership"] },
            { title: "Cabinet Member", org: "Youth Parliament Pakistan", date: "2025 - 2027 Session", category: "Leadership", desc: "Serving in a leadership capacity for youth advocacy and policy discussions.", tags: ["youth", "parliament", "cabinet", "leadership", "politics"] },
            { title: "Runner-Up", org: "Instructables Sensors Contest 2026", date: "April 2026", category: "Award", desc: "Recognized for designing and developing the 'IncliSense' project.", tags: ["instructables", "contest", "award"] },
            { title: "Awardee", org: "Altium Global Scholarship Program", date: "March 2026", category: "Award", desc: "Selected as an emerging engineer for professional development and technical excellence.", tags: ["altium", "scholarship", "award"] },
            { title: "Freelance Hardware & Mechanical Designer", org: "Fiverr & Upwork", date: "Ongoing", category: "Professional", desc: "Providing professional PCB design, multi-layer board development, and 3D modeling services to international clients.", tags: ["freelance", "fiverr", "upwork", "professional"] }
        ],

        skills: [
            { name: "PCB Design & Hardware Engineering", desc: "Professional multi-layer board development, schematic capture, and manufacturing preparation using Altium Designer and Altium 365.", tags: ["pcb", "hardware", "altium", "schematic"] },
            { name: "Embedded Systems & IoT", desc: "Firmware development and sensor integration for ESP32, STM32, and Arduino, including real-time data streaming via MQTT and Firebase.", tags: ["embedded", "iot", "esp32", "stm32", "arduino", "mqtt", "firebase"] },
            { name: "3D Modeling & CAD", desc: "Mechanical product design, parametric modeling, and assembly creation for 3D printing using Autodesk Fusion 360 and Inventor.", tags: ["3d", "cad", "fusion", "inventor", "modeling", "printing"] },
            { name: "Programming & Technical Writing", desc: "Object-oriented programming and automation using Python, alongside professional document and report formatting utilizing LaTeX and Overleaf.", tags: ["python", "programming", "latex", "overleaf", "writing"] },
            { name: "Web Development & UI/UX", desc: "Designing and building responsive, modern, and interactive websites using HTML, CSS, JavaScript.", tags: ["web", "html", "css", "javascript", "frontend"] },
            { name: "Leadership & Project Management", desc: "Delivering freelance engineering projects on Upwork and Fiverr, combined with organizational leadership as President for IET On Campus and Cabinet Member of Youth Parliament Pakistan.", tags: ["leadership", "management", "freelance"] },
            { name: "Interpersonal Skills", desc: "Public Speaking, Teamwork Skills, Communication, Collaboration, Empathy.", tags: ["speaking", "teamwork", "communication"] },
            { name: "Critical Thinking", desc: "Creativity, Problem Solving, Organization.", tags: ["critical", "thinking", "creativity", "problem"] }
        ],

        software: {
            "Electrical & PCB CAD (ECAD)": { tools: ["Altium Designer", "Altium 365", "CircuitStudio", "KiCad", "EasyEDA"], simulation: ["Proteus", "LTspice", "Multisim"] },
            "Mechanical CAD & 3D Modeling": { design: ["Autodesk Inventor Professional", "SolidWorks", "Autodesk Fusion 360"], drafting: ["AutoCAD", "Revit", "Tinkercad"] },
            "Programming & Computing": { languages: ["Python", "MATLAB", "Embedded IDEs (ESP32, STM32, Arduino)"], frameworks: ["Flutter", "Antigravity"] },
            "IoT & Cloud Platforms": { hardware: ["Blynk", "Firebase"], networking: ["MQTT Clients"] },
            "AI & Machine Learning": { llms: ["Gemini", "ChatGPT", "Claude", "Perplexity", "Grok"], tools: ["Google AI Studio", "Microsoft Copilot"] },
            "Documentation & Design": { typesetting: ["LaTeX", "Overleaf", "draw.io"], graphics: ["Adobe Photoshop", "Canva", "Inkscape"] },
            "Collaboration & Productivity": { teams: ["Microsoft Teams", "Zoom"], productivity: ["Microsoft Word", "Excel", "PowerPoint", "OneNote"] }
        },

        platforms: ["Fiverr", "Upwork"],
        totalProjects: 10,
        totalCertifications: 18,
        totalAwards: 6,
        totalPlatforms: 2
    };

    // ==================== GEMINI API INTEGRATION ====================
    // API key management - stored in localStorage for privacy
    function getGeminiKey() {
        return localStorage.getItem('maoz_ai_gemini_key') || '';
    }
    function setGeminiKey(key) {
        localStorage.setItem('maoz_ai_gemini_key', key);
    }
    function getGeminiUrl() {
        const key = getGeminiKey();
        if (!key) return null;
        return 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + key;
    }
    // Pre-set the key if not already stored
    if (!getGeminiKey()) {
        setGeminiKey(atob('QVEuQWI4Uk42Smk2ZThoX2o5TmlaTWNXWUpKZUJHR1dMczNKaWExQ1hQZ2NuUDBqQUcxUmc='));
    }

    // Build portfolio context for Gemini
    function buildPortfolioContext() {
        const projectList = KB.projects.map(p => `- ${p.name} (${p.tech.join(', ')}): ${p.desc}${p.featured ? ' [FEATURED PROJECT]' : ''}${p.achievement ? ' Achievement: ' + p.achievement : ''}`).join('\n');
        const certList = KB.certifications.map(c => `- ${c.name} | Issuer: ${c.issuer} | Date: ${c.date} | Category: ${c.category}`).join('\n');
        const awardList = KB.awards.map(a => `- ${a.name} | By: ${a.issuer} | Date: ${a.date} | ${a.desc}`).join('\n');
        const expList = KB.experience.map(e => `- ${e.title} at ${e.org} | ${e.date} | ${e.category} | ${e.desc}`).join('\n');
        const skillList = KB.skills.map(s => `- ${s.name}: ${s.desc}`).join('\n');
        const softwareList = Object.entries(KB.software).map(([cat, data]) => `${cat}: ${Object.values(data).flat().join(', ')}`).join('\n');

        return `You are "Maoz AI", the personal AI assistant embedded in the portfolio website of Syed Maoz Arif. You answer all questions as his helpful portfolio assistant.

IMPORTANT RULES:
1. You are speaking on behalf of Syed Maoz Arif. Use "Maoz" or "he" when referring to him.
2. For portfolio-related questions, use ONLY the data below — do not make up facts.
3. For general knowledge questions (not about Maoz), answer helpfully but briefly, then remind the user they can also ask about Maoz's portfolio.
4. Keep responses concise, well-formatted with **bold** and bullet points.
5. Use emojis sparingly for personality.
6. If asked something inappropriate, politely redirect to portfolio topics.

=== PERSONAL INFO ===
Name: ${KB.name}
Role: ${KB.role}
Email: ${KB.email} | University Email: ${KB.eduEmail}
Phone: ${KB.phone}
LinkedIn: ${KB.linkedin}
Facebook: ${KB.facebook}
Location: ${KB.location}

=== EDUCATION ===
University: ${KB.university} (${KB.enrollmentYear} - ${KB.expectedGrad} Expected)
Degree: ${KB.degree} | Current: ${KB.semester} | Student ID: ${KB.studentId}
College: ${KB.college} | Completed: ${KB.collegeCompleted} | Degree: ${KB.collegeDegree}

=== PROJECTS (${KB.totalProjects}) ===
${projectList}

=== CERTIFICATIONS (${KB.totalCertifications}) ===
${certList}

=== AWARDS (${KB.totalAwards}) ===
${awardList}

=== EXPERIENCE (${KB.experience.length}) ===
${expList}

=== SKILLS (${KB.skills.length}) ===
${skillList}

=== SOFTWARE ===
${softwareList}

=== KEY HIGHLIGHTS ===
- Altium Global Scholarship awardee
- Instructables Sensors Contest Runner-Up (global competition)
- 1st Position in Best Circuit Design at COMSATS
- Active freelancer on Fiverr & Upwork serving international clients
- Membership Head at IET On Campus
- Cabinet Member of Youth Parliament Pakistan
- Hobbies: ${KB.hobbies.join(', ')}`;
    }

    const geminiSystemPrompt = buildPortfolioContext();
    const geminiChatHistory = [];

    async function askGemini(userQuery) {
        try {
            // Build conversation history for context
            const contents = [];
            
            // Add recent chat history (last 3 exchanges)
            const recentHistory = geminiChatHistory.slice(-6);
            recentHistory.forEach(msg => {
                contents.push(msg);
            });
            
            // Add current user message
            contents.push({ role: 'user', parts: [{ text: userQuery }] });

            const apiUrl = getGeminiUrl();
            if (!apiUrl) throw new Error("Gemini API key is not configured.");

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    system_instruction: { parts: [{ text: geminiSystemPrompt }] },
                    contents: contents,
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 1024,
                        topP: 0.9
                    },
                    safetySettings: [
                        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
                        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
                        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
                        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' }
                    ]
                })
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();
            const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;

            if (aiText) {
                // Save to chat history
                geminiChatHistory.push({ role: 'user', parts: [{ text: userQuery }] });
                geminiChatHistory.push({ role: 'model', parts: [{ text: aiText }] });
                // Keep history manageable
                if (geminiChatHistory.length > 20) geminiChatHistory.splice(0, 2);
                return aiText;
            }
            throw new Error('No response text');
        } catch (error) {
            console.warn('Gemini API error:', error);
            return null;
        }
    }

    // ==================== CONVERSATION MEMORY ====================
    const conversationMemory = {
        history: [],        // Last 5 {query, topic, response} entries
        messageCount: 0,    // Total messages exchanged
        lastTopic: null,    // Last detected topic category
        lastItems: [],      // Last items discussed (for "tell me more")

        addMessage(query, topic, response, items) {
            this.history.push({ query, topic, response, items: items || [] });
            if (this.history.length > 5) this.history.shift();
            this.lastTopic = topic;
            this.lastItems = items || [];
            this.messageCount++;
        },

        getLastTopic() {
            return this.lastTopic;
        },

        getLastItems() {
            return this.lastItems;
        },

        getPreviousContext() {
            if (this.history.length === 0) return null;
            return this.history[this.history.length - 1];
        },

        shouldShowFunFact() {
            return this.messageCount > 0 && this.messageCount % 10 === 0;
        }
    };

    // ==================== FUN FACTS ====================
    const funFacts = [
        `🎲 **Fun Fact:** Maoz has earned more certifications (${KB.totalCertifications}) by his 4th semester than most engineers earn in their entire degree!`,
        `🎲 **Fun Fact:** The IncliSense project competed against entries from professionals worldwide — and Maoz was still a student when he won Runner-Up!`,
        `🎲 **Fun Fact:** Maoz uses ${Object.values(KB.software).reduce((acc, cat) => acc + Object.values(cat).reduce((a, arr) => a + arr.length, 0), 0)}+ different software tools across ${Object.keys(KB.software).length} categories!`,
        `🎲 **Fun Fact:** Maoz is simultaneously a Membership Head at IET AND a Cabinet Member of Youth Parliament — talk about multitasking! 🚀`,
        `🎲 **Fun Fact:** From schematic to 3D-printed enclosure, Maoz can handle the ENTIRE hardware product pipeline solo!`,
        `🎲 **Fun Fact:** Maoz started freelancing on Fiverr & Upwork while still in university — he doesn't wait for graduation to make an impact!`,
        `🎲 **Fun Fact:** The Mixed-Signal RF Board project involves 50Ω impedance matching — that's advanced RF engineering usually tackled by senior engineers!`,
        `🎲 **Fun Fact:** Maoz's 6S UAV BMS manages batteries for drones — a safety-critical system where a design error could mean a crash! 🛩️`
    ];

    // ==================== TIME-AWARE GREETINGS ====================
    function getTimeGreeting() {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return 'Good morning';
        if (hour >= 12 && hour < 17) return 'Good afternoon';
        if (hour >= 17 && hour < 21) return 'Good evening';
        return 'Hello, night owl';
    }

    function getRandomGreeting() {
        const timeGreet = getTimeGreeting();
        const greetings = [
            `${timeGreet}! 👋 I'm **Maoz AI**, the intelligent assistant for **${KB.name}**'s portfolio.`,
            `${timeGreet}! ✨ Welcome! I'm **Maoz AI** — ask me anything about **${KB.name}**'s work, projects, and achievements.`,
            `Hey there! ${timeGreet}! 🌟 I'm **Maoz AI**, and I know everything about **${KB.name}**'s engineering journey.`,
            `${timeGreet}! 🚀 I'm **Maoz AI** — your guide to **${KB.name}**'s portfolio. What would you like to explore?`,
            `${timeGreet} and welcome! 😊 I'm **Maoz AI**, ready to tell you all about **${KB.name}**'s ${KB.totalProjects} projects, ${KB.totalCertifications} certifications, and more!`
        ];
        return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // ==================== VARIED RESPONSE OPENINGS ====================
    function getVariedOpening(category) {
        const openings = {
            projects: ["🚀 Here's the scoop on the projects!", "🔧 Let me walk you through the projects!", "💡 Check out these awesome builds!", "⚡ Here's what Maoz has been building!"],
            certifications: ["📜 Here's the certification lineup!", "🎓 Let me pull up the certifications!", "📋 Check out these credentials!", "✅ Here are the certifications Maoz has earned!"],
            awards: ["🏆 Time to showcase some achievements!", "🥇 Here's the trophy collection!", "🌟 Let me highlight these wins!", "🎉 Check out these well-deserved awards!"],
            skills: ["⚡ Let's talk skills!", "💪 Here's what Maoz brings to the table!", "🛠️ Check out this skill set!", "🔥 Here are the core competencies!"],
            experience: ["💼 Let's dive into the experience!", "📌 Here's the professional journey!", "🗂️ Let me outline the experience!", "👔 Here's the career track record!"],
            general: ["Great question!", "Glad you asked!", "Here's what I found!", "Let me tell you about that!", "Absolutely — here's the info!"],
            search: ["🔍 Let me dig into that for you!", "🔎 Searching the portfolio...", "🧐 Let me find that!", "📡 Running a search on that!"]
        };
        const arr = openings[category] || openings.general;
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // ==================== CROSS-REFERENCING ENGINE ====================
    function findRelatedCerts(project) {
        const techLower = project.tech.map(t => t.toLowerCase());
        return KB.certifications.filter(c =>
            c.tags.some(tag => techLower.some(t => t.includes(tag) || tag.includes(t.split(' ')[0].toLowerCase())))
        );
    }

    function findRelatedProjects(cert) {
        return KB.projects.filter(p =>
            p.tech.some(t => cert.tags.some(tag => t.toLowerCase().includes(tag) || tag.includes(t.toLowerCase().split(' ')[0])))
        );
    }

    function findRelatedSkills(cert) {
        return KB.skills.filter(s =>
            s.tags.some(tag => cert.tags.some(ct => tag === ct || tag.includes(ct) || ct.includes(tag)))
        );
    }

    function findRelatedProjectsForExperience(exp) {
        return KB.projects.filter(p =>
            p.tech.some(t => exp.tags.some(tag => t.toLowerCase().includes(tag))) ||
            exp.tags.some(tag => p.name.toLowerCase().includes(tag))
        );
    }

    function buildCrossRef(type, items) {
        if (!items || items.length === 0) return '';
        let ref = '\n\n🔗 **Related:** ';
        if (type === 'certs') {
            ref += items.slice(0, 2).map(c => `📜 ${c.name}`).join(' • ');
        } else if (type === 'projects') {
            ref += items.slice(0, 2).map(p => `🚀 ${p.name}`).join(' • ');
        } else if (type === 'skills') {
            ref += items.slice(0, 2).map(s => `⚡ ${s.name}`).join(' • ');
        }
        return ref;
    }

    // ==================== FOLLOW-UP SUGGESTIONS ENGINE ====================
    const followUpMap = {
        'projects': [
            "Want to see his awards? 🏆",
            "Ask about his tech stack 🛠️",
            "What certifications does he have? 📜",
            "Which is his best project? ⭐",
            "Compare his projects 📊"
        ],
        'certifications': [
            "How many Altium certs does he have? 🔧",
            "Tell me about his awards 🏆",
            "What skills does he have? ⚡",
            "Who recognizes his work? 🏛️"
        ],
        'awards': [
            "Tell me about the IncliSense project 🚀",
            "What certifications does he have? 📜",
            "What makes him stand out? 🌟",
            "Is he good for an internship? 🎯"
        ],
        'skills': [
            "What software tools does he use? 🛠️",
            "Show me his projects 🚀",
            "What are his strengths? 💪",
            "Is he experienced in PCB design? 🔧"
        ],
        'experience': [
            "What projects has he built? 🚀",
            "Tell me about his leadership roles 🏛️",
            "Is he available for work? 📅",
            "Why should we hire him? 🌟"
        ],
        'education': [
            "What's his student ID? 🆔",
            "What certifications does he have? 📜",
            "Tell me about his projects 🚀",
            "What are his hobbies? 🏏"
        ],
        'contact': [
            "Tell me about his experience 💼",
            "What can he do for our company? 🛠️",
            "Is he available? 📅"
        ],
        'about': [
            "What are his skills? ⚡",
            "Show me his projects 🚀",
            "Why should we hire him? 🌟",
            "What awards has he won? 🏆"
        ],
        'recruiter': [
            "What makes him stand out? 🌟",
            "What are his strengths? 💪",
            "Is he available? 📅",
            "Show me his certifications 📜"
        ],
        'altium': [
            "How many Altium certs? 📜",
            "What other PCB tools does he use? 🛠️",
            "Tell me about the Smart Lighting project 🚀",
            "What makes him stand out? 🌟"
        ],
        'iot': [
            "Tell me about the Omni-Sense Node 📡",
            "What is IncliSense? 🚀",
            "What certifications does he have? 📜",
            "Does he know ESP32? ⚡"
        ],
        'default': [
            "Tell me about his projects 🚀",
            "What certifications does he have? 📜",
            "Why should we hire him? 🌟"
        ]
    };

    function getFollowUpSuggestions(topic) {
        const suggestions = followUpMap[topic] || followUpMap['default'];
        // Pick 2-3 random suggestions
        const shuffled = [...suggestions].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, Math.min(3, shuffled.length));
    }

    // ==================== SMART FUZZY SEARCH ====================
    function fuzzyScore(query, item) {
        const words = query.toLowerCase().split(/\s+/).filter(w => w.length > 2);
        const searchable = ((item.name || '') + ' ' + (item.desc || '') + ' ' + (item.tags || []).join(' ') + ' ' + (item.tech || []).join(' ')).toLowerCase();
        let score = 0;
        for (const w of words) {
            if (searchable.includes(w)) score++;
        }
        return score;
    }

    function smartSearch(query) {
        const allItems = [
            ...KB.certifications.map(c => ({ ...c, type: 'Certification', icon: '📜' })),
            ...KB.awards.map(a => ({ ...a, type: 'Award', icon: '🏆' })),
            ...KB.experience.map(e => ({ ...e, name: `${e.title} at ${e.org}`, type: 'Experience', icon: '💼' })),
            ...KB.skills.map(s => ({ ...s, type: 'Skill', icon: '⚡' })),
            ...KB.projects.map(p => ({ ...p, tags: p.tech.map(t => t.toLowerCase()), type: 'Project', icon: '🚀' }))
        ];

        const scored = allItems.map(item => ({
            item,
            score: fuzzyScore(query, item)
        })).filter(r => r.score > 0).sort((a, b) => b.score - a.score);

        return scored.slice(0, 3);
    }

    // ==================== ALL SOFTWARE FLAT LIST ====================
    function getAllSoftware() {
        const all = [];
        for (const [cat, data] of Object.entries(KB.software)) {
            for (const [subcat, tools] of Object.entries(data)) {
                tools.forEach(t => all.push({ tool: t, category: cat, subcategory: subcat }));
            }
        }
        return all;
    }

    // ==================== CERTIFICATION ISSUERS ====================
    function getUniqueIssuers() {
        const issuers = new Set();
        KB.certifications.forEach(c => issuers.add(c.issuer));
        KB.awards.forEach(a => issuers.add(a.issuer));
        return [...issuers];
    }

    // ==================== SMART RESPONSE ENGINE ====================
    function getResponse(query) {
        const q = query.toLowerCase().trim();
        const words = q.split(/\s+/);
        let topic = 'default';
        let discussedItems = [];

        // --- FOLLOW-UP / CONTEXT-AWARE QUESTIONS ---
        if (/^(tell me more|more|elaborate|what else|and\??|go on|continue|expand|details|more details|more info)$/i.test(q) ||
            /^(tell me more|elaborate|what else)/.test(q)) {
            const prev = conversationMemory.getPreviousContext();
            if (prev && prev.items && prev.items.length > 0) {
                let resp = `${getVariedOpening('general')} Here's more detail on what we were discussing:\n\n`;
                prev.items.forEach((item, i) => {
                    resp += `**${i + 1}. ${item.name || item.title || 'Item'}**\n`;
                    if (item.desc) resp += `${item.desc}\n`;
                    if (item.tech) resp += `🔧 Tech: ${item.tech.join(', ')}\n`;
                    if (item.issuer) resp += `🏛️ Issued by: ${item.issuer}\n`;
                    if (item.date) resp += `📅 Date: ${item.date}\n`;
                    if (item.category) resp += `📂 Category: ${item.category}\n`;
                    if (item.achievement) resp += `🏆 Achievement: ${item.achievement}\n`;
                    resp += '\n';
                });
                conversationMemory.addMessage(query, prev.topic, resp, prev.items);
                return resp;
            } else if (prev) {
                conversationMemory.addMessage(query, prev.topic, prev.response, []);
                return `I've shared all I know on that topic! Try asking about something specific like:\n\n- "Tell me about his projects"\n- "What certifications does he have?"\n- "What are his skills?"`;
            }
            return `We haven't discussed anything yet — go ahead and ask me something! 😊 Try "Tell me about Maoz" or "What projects has he built?"`;
        }

        // --- CONTEXTUAL "HOW MANY?" FOLLOW-UP ---
        if (/^how many\??$/.test(q)) {
            const lastTopic = conversationMemory.getLastTopic();
            if (lastTopic === 'altium') {
                const altiumCerts = KB.certifications.filter(c => c.tags.includes('altium'));
                return `Based on our Altium discussion — Maoz has **${altiumCerts.length} Altium certification(s)** and **${KB.awards.filter(a => a.tags.includes('altium')).length} Altium award(s)**. 🔧`;
            }
            if (lastTopic === 'projects') return `Maoz has built **${KB.totalProjects} projects** in total! 🚀`;
            if (lastTopic === 'certifications') return `Maoz holds **${KB.totalCertifications} certifications**! 📜`;
            if (lastTopic === 'awards') return `Maoz has earned **${KB.totalAwards} awards**! 🏆`;
            if (lastTopic === 'iot') return `Maoz has **${KB.projects.filter(p => p.tech.some(t => /esp32|arduino|iot|sensor/i.test(t))).length} IoT-related projects** and **1 IoT certification**! 📡`;
        }

        // --- URDU GREETINGS ---
        if (/^(assalam\s*o?\s*alaikum|assalamualaikum|salam|walaikum|kya haal|kya hal|kaise ho|kia haal)/.test(q)) {
            topic = 'about';
            const urduResponses = [
                `Wa Alaikum Assalam! 🤲 I'm **Maoz AI**, the portfolio assistant for **${KB.name}**. How can I help you today?\n\nI know about his **${KB.totalProjects} projects**, **${KB.totalCertifications} certifications**, **${KB.totalAwards} awards**, and much more!`,
                `Wa Alaikum Assalam! ✨ Welcome! I'm **Maoz AI** — Maoz ke portfolio ka AI assistant. Puchiye jo puchna hai! 😊`,
                `Wa Alaikum Assalam! 🌟 Shukriya for visiting! I'm **Maoz AI**, ready to tell you about **${KB.name}**'s amazing work. Ask away!`
            ];
            const resp = urduResponses[Math.floor(Math.random() * urduResponses.length)];
            conversationMemory.addMessage(query, topic, resp, []);
            return resp;
        }

        // --- GREETINGS (time-aware) ---
        if (/^(hi|hello|hey|greetings|good morning|good afternoon|good evening|sup|yo)\b/.test(q)) {
            topic = 'about';
            const resp = `${getRandomGreeting()}\n\nI have deep knowledge of all his **${KB.totalProjects} projects**, **${KB.totalCertifications} certifications**, **${KB.totalAwards} awards**, skills, education, experience, and contact details.\n\nAsk me anything specific! For example:\n- "How many Altium certificates does he have?"\n- "When did he get the Arduino certification?"\n- "What is his student ID?"`;
            conversationMemory.addMessage(query, topic, resp, []);
            return resp;
        }

        // --- "IS HE EXPERIENCED IN [X]?" / "DOES HE KNOW [X]?" / "HAS HE WORKED WITH [X]?" ---
        const expMatch = q.match(/(?:is he experienced in|does he know|has he worked with|is he familiar with|can he use|does he have experience (?:in|with))\s+(.+?)[\?\.]?$/);
        if (expMatch) {
            const searchTerm = expMatch[1].trim().toLowerCase();
            topic = 'skills';

            // Search skills
            const matchedSkills = KB.skills.filter(s =>
                s.name.toLowerCase().includes(searchTerm) ||
                s.tags.some(t => t.includes(searchTerm) || searchTerm.includes(t)) ||
                s.desc.toLowerCase().includes(searchTerm)
            );

            // Search software
            const matchedSoftware = getAllSoftware().filter(s =>
                s.tool.toLowerCase().includes(searchTerm) || searchTerm.includes(s.tool.toLowerCase())
            );

            // Search projects
            const matchedProjects = KB.projects.filter(p =>
                p.tech.some(t => t.toLowerCase().includes(searchTerm) || searchTerm.includes(t.toLowerCase())) ||
                p.name.toLowerCase().includes(searchTerm)
            );

            // Search certifications
            const matchedCerts = KB.certifications.filter(c =>
                c.tags.some(t => t.includes(searchTerm) || searchTerm.includes(t)) ||
                c.name.toLowerCase().includes(searchTerm)
            );

            if (matchedSkills.length || matchedSoftware.length || matchedProjects.length || matchedCerts.length) {
                let resp = `✅ **Yes!** Maoz has experience with "${searchTerm}"! Here's the evidence:\n\n`;

                if (matchedSkills.length) {
                    resp += `**🎯 Skills:**\n`;
                    matchedSkills.forEach(s => { resp += `- **${s.name}:** ${s.desc}\n`; });
                    resp += '\n';
                }
                if (matchedSoftware.length) {
                    resp += `**🛠️ Software:**\n`;
                    matchedSoftware.forEach(s => { resp += `- **${s.tool}** (${s.category})\n`; });
                    resp += '\n';
                }
                if (matchedProjects.length) {
                    resp += `**🚀 Projects using it:**\n`;
                    matchedProjects.forEach(p => { resp += `- **${p.name}** — Tech: ${p.tech.join(', ')}\n`; });
                    resp += '\n';
                }
                if (matchedCerts.length) {
                    resp += `**📜 Certifications:**\n`;
                    matchedCerts.forEach(c => { resp += `- **${c.name}** (${c.issuer}, ${c.date})\n`; });
                }
                discussedItems = [...matchedSkills, ...matchedProjects, ...matchedCerts];
                conversationMemory.addMessage(query, topic, resp, discussedItems);
                return resp;
            } else {
                const resp = `🤔 I couldn't find a direct match for "${searchTerm}" in Maoz's portfolio. However, here are his **${KB.skills.length} core skill areas**:\n\n${KB.skills.map((s, i) => `${i + 1}. **${s.name}**`).join('\n')}\n\nTry asking about one of these, or ask "What software does he use?" for a full tools list!`;
                conversationMemory.addMessage(query, topic, resp, KB.skills);
                return resp;
            }
        }

        // --- "IS HE CERTIFIED IN [X]?" ---
        const certMatch = q.match(/(?:is he certified in|does he have (?:a )?certification (?:in|for)|certified in)\s+(.+?)[\?\.]?$/);
        if (certMatch) {
            const searchTerm = certMatch[1].trim().toLowerCase();
            topic = 'certifications';
            const matched = KB.certifications.filter(c =>
                c.tags.some(t => t.includes(searchTerm) || searchTerm.includes(t)) ||
                c.name.toLowerCase().includes(searchTerm) ||
                c.category.toLowerCase().includes(searchTerm)
            );

            if (matched.length) {
                let resp = `✅ **Yes!** Maoz has **${matched.length} certification(s)** related to "${searchTerm}":\n\n`;
                matched.forEach((c, i) => {
                    resp += `${i + 1}. **${c.name}**\n   - Issued by: **${c.issuer}**\n   - Date: **${c.date}**\n   - ${c.desc}\n\n`;
                });
                conversationMemory.addMessage(query, topic, resp, matched);
                return resp;
            } else {
                const resp = `❌ Maoz doesn't have a specific certification for "${searchTerm}" — but he holds **${KB.totalCertifications} certifications** across PCB/Hardware, AI, IoT, Leadership, and more. Want me to list them all?`;
                conversationMemory.addMessage(query, topic, resp, []);
                return resp;
            }
        }

        // --- "WHAT DID HE USE FOR [PROJECT]?" ---
        const techForMatch = q.match(/(?:what (?:did|does) he use for|tech (?:stack |used )?(?:for|in|of)|tools (?:for|in|used))\s+(.+?)[\?\.]?$/);
        if (techForMatch) {
            const searchTerm = techForMatch[1].trim().toLowerCase();
            topic = 'projects';
            const project = KB.projects.find(p => p.name.toLowerCase().includes(searchTerm) || searchTerm.includes(p.name.toLowerCase().split(' ')[0]));

            if (project) {
                let resp = `🔧 **Tech stack for "${project.name}":**\n\n`;
                project.tech.forEach((t, i) => { resp += `${i + 1}. **${t}**\n`; });
                resp += `\n${project.desc}`;
                const relatedCerts = findRelatedCerts(project);
                resp += buildCrossRef('certs', relatedCerts);
                conversationMemory.addMessage(query, topic, resp, [project]);
                return resp;
            }
        }

        // --- "COMPARE HIS PROJECTS" ---
        if (/compare.*(project|build)|project.*compar/.test(q)) {
            topic = 'projects';
            let resp = `📊 **Project Comparison:**\n\n`;
            resp += `| # | Project | Tech Stack | Award? | Featured? |\n`;
            resp += `|---|---------|-----------|--------|----------|\n`;
            KB.projects.forEach((p, i) => {
                resp += `| ${i + 1} | **${p.name}** | ${p.tech.join(', ')} | ${p.achievement ? '🏆 Yes' : '—'} | ${p.featured ? '⭐ Yes' : '—'} |\n`;
            });
            resp += `\n**Total Projects:** ${KB.totalProjects} | **Award-Winning:** ${KB.projects.filter(p => p.achievement).length} | **Featured:** ${KB.projects.filter(p => p.featured).length}`;
            conversationMemory.addMessage(query, topic, resp, KB.projects);
            return resp;
        }

        // --- "WHAT'S HIS BEST PROJECT?" ---
        if (/best project|top project|featured project|most impressive|flagship/.test(q)) {
            topic = 'projects';
            const featured = KB.projects.find(p => p.featured);
            if (featured) {
                let resp = `⭐ **Maoz's Best/Featured Project:**\n\n`;
                resp += `**${featured.name}**\n\n`;
                resp += `🔧 **Tech Stack:** ${featured.tech.join(', ')}\n\n`;
                resp += `${featured.desc}\n\n`;
                resp += `**Why it's the best:**\n`;
                resp += `1. 🏆 **Award-Winning** — ${featured.achievement}\n`;
                resp += `2. 🌍 **Globally Recognized** — Competed against international entries\n`;
                resp += `3. 🎯 **Full-Stack Hardware** — Designed PCB, coded firmware, 3D-printed enclosure\n`;
                resp += `4. 📡 **Real-World Application** — Precision measurement tool with PC telemetry\n`;
                resp += `5. 📅 **Year:** ${featured.date}\n`;
                const relatedCerts = findRelatedCerts(featured);
                resp += buildCrossRef('certs', relatedCerts);
                conversationMemory.addMessage(query, topic, resp, [featured]);
                return resp;
            }
        }

        // --- "WHAT COMPANIES RECOGNIZE HIM?" / "WHO RECOGNIZES HIM?" ---
        if (/(?:what|which) (?:companies|organizations|institutions|issuers|bodies)\s*(?:recognize|certified|endorse|acknowledge)|who (?:recognizes|certified|endorses)/.test(q)) {
            topic = 'certifications';
            const issuers = getUniqueIssuers();
            let resp = `🏛️ **Organizations & Companies that recognize Maoz:**\n\n`;
            issuers.forEach((issuer, i) => {
                const certCount = KB.certifications.filter(c => c.issuer === issuer).length;
                const awardCount = KB.awards.filter(a => a.issuer === issuer).length;
                resp += `${i + 1}. **${issuer}**`;
                const parts = [];
                if (certCount > 0) parts.push(`${certCount} cert(s)`);
                if (awardCount > 0) parts.push(`${awardCount} award(s)`);
                resp += ` — ${parts.join(', ')}\n`;
            });
            resp += `\n**Total:** ${issuers.length} unique organizations recognize Maoz's work! 🌟`;
            conversationMemory.addMessage(query, topic, resp, []);
            return resp;
        }

        // --- "HOW OLD IS THE PORTFOLIO?" ---
        if (/how old.*(portfolio|website|site)|portfolio.*(age|old|year)|when.*(portfolio|website).*(made|built|created)/.test(q)) {
            const resp = `🌐 This portfolio was built in **2026** — and it's powered by **Maoz AI v3.0**, a custom-built knowledge engine! ✨\n\nIt showcases ${KB.totalProjects} projects, ${KB.totalCertifications} certifications, ${KB.totalAwards} awards, and much more.`;
            conversationMemory.addMessage(query, 'about', resp, []);
            return resp;
        }

        // --- COUNT QUERIES (how many) ---
        if (/how many/.test(q)) {
            // Altium specific
            if (/altium/.test(q)) {
                topic = 'altium';
                const altiumCerts = KB.certifications.filter(c => c.tags.some(t => t === 'altium'));
                const altiumAwards = KB.awards.filter(a => a.tags.some(t => t === 'altium'));
                let resp = `Maoz has **${altiumCerts.length} Altium certification(s)**:\n\n`;
                altiumCerts.forEach((c,i) => { resp += `${i+1}. **${c.name}** — Issued by ${c.issuer}, Date: ${c.date}\n`; });
                if (altiumAwards.length) {
                    resp += `\nPlus **${altiumAwards.length} Altium award(s)**:\n`;
                    altiumAwards.forEach((a,i) => { resp += `${i+1}. **${a.name}** — ${a.date}\n`; });
                }
                discussedItems = [...altiumCerts, ...altiumAwards];
                conversationMemory.addMessage(query, topic, resp, discussedItems);
                return resp;
            }
            if (/iet/.test(q)) {
                topic = 'certifications';
                const ietCerts = KB.certifications.filter(c => c.tags.some(t => t === 'iet'));
                const resp = `Maoz has **${ietCerts.length} IET certificate(s)**:\n\n` + ietCerts.map((c,i) => `${i+1}. **${c.name}** — ${c.date}`).join('\n');
                conversationMemory.addMessage(query, topic, resp, ietCerts);
                return resp;
            }
            if (/ai/.test(q)) {
                topic = 'certifications';
                const aiCerts = KB.certifications.filter(c => c.tags.some(t => t === 'ai'));
                const resp = `Maoz has **${aiCerts.length} AI-related certificate(s)**:\n\n` + aiCerts.map((c,i) => `${i+1}. **${c.name}** (${c.issuer}) — ${c.date}`).join('\n');
                conversationMemory.addMessage(query, topic, resp, aiCerts);
                return resp;
            }
            if (/project/.test(q)) { topic = 'projects'; const resp = `Maoz has built **${KB.totalProjects} projects**: ${KB.projects.map(p => p.name).join(', ')}. 🚀`; conversationMemory.addMessage(query, topic, resp, KB.projects); return resp; }
            if (/certif/.test(q)) { topic = 'certifications'; const resp = `Maoz holds **${KB.totalCertifications} certifications** in total. They span PCB/Hardware, AI, IoT, Leadership, Academic, and Business categories. 📜`; conversationMemory.addMessage(query, topic, resp, KB.certifications); return resp; }
            if (/award/.test(q)) { topic = 'awards'; const resp = `Maoz has earned **${KB.totalAwards} awards**: ${KB.awards.map(a => a.name).join(', ')}. 🏆`; conversationMemory.addMessage(query, topic, resp, KB.awards); return resp; }
            if (/skill/.test(q)) { topic = 'skills'; const resp = `Maoz has **${KB.skills.length} core skill areas**: ${KB.skills.map(s => s.name).join(', ')}. ⚡`; conversationMemory.addMessage(query, topic, resp, KB.skills); return resp; }
            if (/experience|role|position/.test(q)) { topic = 'experience'; const resp = `Maoz has **${KB.experience.length} experiences/roles**: ${KB.experience.map(e => `${e.title} at ${e.org}`).join(', ')}. 💼`; conversationMemory.addMessage(query, topic, resp, KB.experience); return resp; }
            topic = 'about';
            const resp = `📊 **Full Portfolio Stats:**\n- **${KB.totalProjects}** Projects 🚀\n- **${KB.totalCertifications}** Certifications 📜\n- **${KB.totalAwards}** Awards 🏆\n- **${KB.skills.length}** Core Skills ⚡\n- **${KB.experience.length}** Experiences/Roles 💼\n- **${KB.totalPlatforms}** Freelancing Platforms 💰\n- **${Object.keys(KB.software).length}** Software Categories 🛠️`;
            conversationMemory.addMessage(query, topic, resp, []);
            return resp;
        }

        // --- DATE QUERIES (when) ---
        if (/when|what date|which date|date of/.test(q)) {
            // Check certifications
            for (const c of KB.certifications) {
                if (c.tags.some(t => q.includes(t)) || q.includes(c.name.toLowerCase())) {
                    topic = 'certifications';
                    const relatedSkills = findRelatedSkills(c);
                    let resp = `📅 **${c.name}** was received on **${c.date}**, issued by **${c.issuer}**.`;
                    resp += buildCrossRef('skills', relatedSkills);
                    conversationMemory.addMessage(query, topic, resp, [c]);
                    return resp;
                }
            }
            // Check awards
            for (const a of KB.awards) {
                if (a.tags.some(t => q.includes(t)) || q.includes(a.name.toLowerCase())) {
                    topic = 'awards';
                    const resp = `📅 **${a.name}** was awarded in **${a.date}** by **${a.issuer}**.`;
                    conversationMemory.addMessage(query, topic, resp, [a]);
                    return resp;
                }
            }
            // Check experience
            for (const e of KB.experience) {
                if (e.tags.some(t => q.includes(t)) || q.includes(e.org.toLowerCase())) {
                    topic = 'experience';
                    const relatedProjects = findRelatedProjectsForExperience(e);
                    let resp = `📅 **${e.title}** at **${e.org}**: ${e.date}`;
                    resp += buildCrossRef('projects', relatedProjects);
                    conversationMemory.addMessage(query, topic, resp, [e]);
                    return resp;
                }
            }
            if (/graduat|finish|complete/.test(q)) { const resp = `🎓 Maoz is expected to graduate in **${KB.expectedGrad}** from ${KB.university}. He enrolled in **${KB.enrollmentYear}**.`; conversationMemory.addMessage(query, 'education', resp, []); return resp; }
            if (/college|fsc|peace/.test(q)) { const resp = `🎓 Maoz completed his FSc Pre-Engineering from **${KB.college}** in **${KB.collegeCompleted}**.`; conversationMemory.addMessage(query, 'education', resp, []); return resp; }
            const resp = `I couldn't find a specific date for that. Try asking about a specific certificate, award, or experience by name! 🤔`;
            conversationMemory.addMessage(query, 'default', resp, []);
            return resp;
        }

        // --- SPECIFIC TOPIC: ALTIUM ---
        if (/altium/.test(q)) {
            topic = 'altium';
            const altiumCerts = KB.certifications.filter(c => c.tags.includes('altium'));
            const altiumAwards = KB.awards.filter(a => a.tags.includes('altium'));
            const altiumExp = KB.experience.filter(e => e.tags.includes('altium'));
            let resp = `🔧 **Everything Altium-related for Maoz:**\n\n`;
            if (altiumCerts.length) {
                resp += `**Certifications (${altiumCerts.length}):**\n`;
                altiumCerts.forEach(c => { resp += `- **${c.name}** — Issued by ${c.issuer}, Date: **${c.date}**\n  ${c.desc}\n\n`; });
            }
            if (altiumAwards.length) {
                resp += `**Awards (${altiumAwards.length}):**\n`;
                altiumAwards.forEach(a => { resp += `- **${a.name}** — Date: **${a.date}**\n  ${a.desc}\n\n`; });
            }
            if (altiumExp.length) {
                resp += `**Experience:**\n`;
                altiumExp.forEach(e => { resp += `- **${e.title}** at ${e.org} — ${e.date}\n`; });
            }
            resp += `\n**Software:** Maoz uses Altium Designer, Altium 365, and CircuitStudio for professional PCB design.`;
            discussedItems = [...altiumCerts, ...altiumAwards, ...altiumExp];
            conversationMemory.addMessage(query, topic, resp, discussedItems);
            return resp;
        }

        // --- SPECIFIC TOPIC: IET ---
        if (/\biet\b/.test(q)) {
            topic = 'experience';
            const ietCerts = KB.certifications.filter(c => c.tags.includes('iet'));
            const ietExp = KB.experience.filter(e => e.tags.includes('iet'));
            let resp = `🏛️ **Maoz's IET involvement:**\n\n`;
            if (ietExp.length) {
                resp += `**Role:**\n`;
                ietExp.forEach(e => { resp += `- **${e.title}** at ${e.org} — ${e.date}\n  ${e.desc}\n\n`; });
            }
            if (ietCerts.length) {
                resp += `**Certificates (${ietCerts.length}):**\n`;
                ietCerts.forEach(c => { resp += `- **${c.name}** — ${c.date}\n  ${c.desc}\n\n`; });
            }
            discussedItems = [...ietExp, ...ietCerts];
            conversationMemory.addMessage(query, topic, resp, discussedItems);
            return resp;
        }

        // --- SPECIFIC TOPIC: ARDUINO / IOT ---
        if (/arduino|iot|esp32|stm32|embedded|sensor|mqtt|firebase|blynk/.test(q)) {
            topic = 'iot';
            const iotCert = KB.certifications.find(c => c.tags.includes('arduino') || c.tags.includes('iot'));
            const iotSkill = KB.skills.find(s => s.tags.includes('iot') || s.tags.includes('embedded'));
            let resp = `📡 **Maoz's IoT & Embedded Systems expertise:**\n\n`;
            if (iotSkill) resp += `**Skill:** ${iotSkill.name}\n${iotSkill.desc}\n\n`;
            if (iotCert) resp += `**Certification:** ${iotCert.name} — Issued by ${iotCert.issuer}, Date: **${iotCert.date}**\n${iotCert.desc}\n\n`;
            resp += `**IoT Software:** ${KB.software["IoT & Cloud Platforms"].hardware.join(', ')}, ${KB.software["IoT & Cloud Platforms"].networking.join(', ')}\n\n`;
            resp += `**Related Projects:**\n`;
            const iotProjects = KB.projects.filter(p => p.tech.some(t => /esp32|arduino|iot|sensor|mqtt/i.test(t)));
            iotProjects.forEach(p => {
                resp += `- **${p.name}** — Tech: ${p.tech.join(', ')}\n`;
            });
            discussedItems = iotProjects;
            conversationMemory.addMessage(query, topic, resp, discussedItems);
            return resp;
        }

        // --- SPECIFIC TOPIC: INSTRUCTABLES ---
        if (/instructable/.test(q)) {
            topic = 'awards';
            const award = KB.awards.find(a => a.tags.includes('instructables'));
            const resp = `🏆 **Instructables Achievement:**\n\n**${award.name}**\n- Date: **${award.date}**\n- Issuer: ${award.issuer}\n- ${award.desc}\n\nThe winning project was **IncliSense Digital Level** — a precision dual-axis digital level using Arduino Nano and MPU6050. 🎯`;
            conversationMemory.addMessage(query, topic, resp, [award]);
            return resp;
        }

        // --- WHO / ABOUT ---
        if (/who (is|are)|about (him|maoz|syed)|tell me about|introduce|yourself|overview/.test(q)) {
            topic = 'about';
            const resp = `**${KB.name}** is a ${KB.role} ✨\n\n${KB.about}\n\n📊 **Quick Stats:** ${KB.totalProjects} Projects | ${KB.totalCertifications} Certifications | ${KB.totalAwards} Awards\n📧 ${KB.email} | 📱 ${KB.phone}\n🔗 LinkedIn: ${KB.linkedin}`;
            conversationMemory.addMessage(query, topic, resp, []);
            return resp;
        }

        // --- NAME ---
        if (/what('s| is) (his|the|your) (full )?name|his name|your name/.test(q)) {
            const resp = `His full name is **${KB.name}**. 👤`;
            conversationMemory.addMessage(query, 'about', resp, []);
            return resp;
        }

        // --- CONTACT ---
        if (/contact|email|phone|reach|number|call|social|linkedin|facebook/.test(q)) {
            topic = 'contact';
            const resp = `📧 **Personal Email:** ${KB.email}\n📧 **University Email:** ${KB.eduEmail}\n📱 **Phone:** ${KB.phone}\n🔗 **LinkedIn:** ${KB.linkedin}\n📘 **Facebook:** ${KB.facebook}\n📍 **Location:** ${KB.location}`;
            conversationMemory.addMessage(query, topic, resp, []);
            return resp;
        }

        // --- EDUCATION ---
        if (/education|university|college|degree|study|student|semester|comsats|peace group|fsc|bsc/.test(q)) {
            topic = 'education';
            const resp = `🎓 **Education:**\n\n**1. ${KB.university}**\n- Enrolled: ${KB.enrollmentYear} | Expected Graduation: ${KB.expectedGrad}\n- Degree: ${KB.degree}\n- Semester: ${KB.semester}\n- Student ID: **${KB.studentId}**\n- Email: ${KB.eduEmail}\n- Focus: Embedded Systems, PCB Design, Signal Integrity, IoT\n- Website: ${KB.universityUrl}\n\n**2. ${KB.college}**\n- Completed: ${KB.collegeCompleted}\n- Degree: ${KB.collegeDegree}\n- Subjects: ${KB.collegeSubjects}\n- Website: ${KB.collegeUrl}`;
            conversationMemory.addMessage(query, topic, resp, []);
            return resp;
        }

        // --- PROJECTS (specific) ---
        for (const p of KB.projects) {
            if (q.includes(p.name.toLowerCase()) || (p.name.includes("IncliSense") && q.includes("inclisense"))) {
                topic = 'projects';
                let resp = `🚀 **${p.name}**${p.featured ? ' ⭐ Featured Project' : ''}\n\n**Tech Stack:** ${p.tech.join(', ')}\n\n${p.desc}`;
                if (p.achievement) resp += `\n\n🏆 **Achievement:** ${p.achievement}`;
                if (p.date) resp += `\n📅 **Year:** ${p.date}`;
                // Cross-reference
                const relatedCerts = findRelatedCerts(p);
                resp += buildCrossRef('certs', relatedCerts);
                conversationMemory.addMessage(query, topic, resp, [p]);
                return resp;
            }
        }

        // --- PROJECTS (general) ---
        if (/project|build|made|created|developed/.test(q)) {
            topic = 'projects';
            let resp = `${getVariedOpening('projects')}\n\n**Maoz has built ${KB.totalProjects} projects:**\n\n`;
            KB.projects.forEach((p, i) => {
                resp += `**${i+1}. ${p.name}**${p.featured ? ' ⭐' : ''}\n- Tech: ${p.tech.join(', ')}\n- ${p.desc}${p.achievement ? `\n- 🏆 ${p.achievement}` : ''}\n\n`;
            });
            conversationMemory.addMessage(query, topic, resp, KB.projects);
            return resp;
        }

        // --- CERTIFICATIONS (specific) ---
        for (const c of KB.certifications) {
            if (q.includes(c.name.toLowerCase())) {
                topic = 'certifications';
                let resp = `📜 **${c.name}**\n- Issued by: **${c.issuer}**\n- Date: **${c.date}**\n- Category: ${c.category}\n\n${c.desc}`;
                const relatedSkills = findRelatedSkills(c);
                const relatedProjects = findRelatedProjects(c);
                resp += buildCrossRef('skills', relatedSkills);
                if (relatedProjects.length) resp += buildCrossRef('projects', relatedProjects);
                conversationMemory.addMessage(query, topic, resp, [c]);
                return resp;
            }
        }

        // --- CERTIFICATIONS (general) ---
        if (/certif|certificate/.test(q)) {
            topic = 'certifications';
            let resp = `${getVariedOpening('certifications')}\n\n**All ${KB.totalCertifications} Certifications:**\n\n`;
            KB.certifications.forEach((c, i) => {
                resp += `**${i+1}. ${c.name}**\n- Issued by: ${c.issuer}\n- Date: **${c.date}**\n- Category: ${c.category}\n\n`;
            });
            conversationMemory.addMessage(query, topic, resp, KB.certifications);
            return resp;
        }

        // --- AWARDS ---
        if (/award|winner|won|prize|medal|first position|1st position|runner.?up|trophy|achievement/.test(q)) {
            topic = 'awards';
            let resp = `${getVariedOpening('awards')}\n\n**All ${KB.totalAwards} Awards:**\n\n`;
            KB.awards.forEach((a, i) => {
                resp += `**${i+1}. ${a.name}**\n- Issued by: ${a.issuer}\n- Date: **${a.date}**\n- ${a.desc}\n\n`;
            });
            conversationMemory.addMessage(query, topic, resp, KB.awards);
            return resp;
        }

        // --- EXPERIENCE ---
        if (/experience|work|job|career|freelanc|fiverr|upwork|membership|youth parliament|cabinet/.test(q)) {
            topic = 'experience';
            let resp = `${getVariedOpening('experience')}\n\n**All ${KB.experience.length} Experiences & Roles:**\n\n`;
            KB.experience.forEach((e, i) => {
                resp += `**${i+1}. ${e.title}** — ${e.org}\n- Period: **${e.date}**\n- Category: ${e.category}\n- ${e.desc}\n\n`;
            });
            // Cross-reference with related projects
            const relatedProjects = KB.projects.filter(p => p.tech.some(t => /altium|esp32|arduino/i.test(t)));
            if (relatedProjects.length) {
                resp += `\n🔗 **Related Projects:** ${relatedProjects.slice(0, 3).map(p => `🚀 ${p.name}`).join(' • ')}`;
            }
            conversationMemory.addMessage(query, topic, resp, KB.experience);
            return resp;
        }

        // --- SKILLS ---
        if (/skill|can he|what (does|can) he do|abilit|capable|expertise|proficien/.test(q)) {
            topic = 'skills';
            let resp = `${getVariedOpening('skills')}\n\n**${KB.skills.length} Core Skills:**\n\n`;
            KB.skills.forEach((s, i) => {
                resp += `**${i+1}. ${s.name}**\n- ${s.desc}\n\n`;
            });
            conversationMemory.addMessage(query, topic, resp, KB.skills);
            return resp;
        }

        // --- SOFTWARE ---
        if (/software|tool|program|app/.test(q)) {
            topic = 'skills';
            let resp = `🛠️ **Technical Software Suite (${Object.keys(KB.software).length} categories):**\n\n`;
            for (const [cat, data] of Object.entries(KB.software)) {
                resp += `**${cat}:**\n`;
                for (const [subcat, tools] of Object.entries(data)) {
                    resp += `- *${subcat}:* ${tools.join(', ')}\n`;
                }
                resp += `\n`;
            }
            conversationMemory.addMessage(query, topic, resp, []);
            return resp;
        }

        // --- TRAITS ---
        if (/trait|define|quality|characteristic|what makes|strength/.test(q)) {
            topic = 'about';
            let resp = `✨ **What defines ${KB.name}:**\n\n`;
            KB.traits.forEach((t, i) => { resp += `**${i+1}. ${t.trait}:** ${t.detail}\n\n`; });
            conversationMemory.addMessage(query, topic, resp, KB.traits);
            return resp;
        }

        // --- STUDENT ID ---
        if (/student.?id|roll.?no|enrollment|registration/.test(q)) {
            topic = 'education';
            const resp = `🆔 **Student ID:** ${KB.studentId}\n📧 **University Email:** ${KB.eduEmail}\n🏛️ **University:** ${KB.university}\n📅 **Enrolled:** ${KB.enrollmentYear}`;
            conversationMemory.addMessage(query, topic, resp, []);
            return resp;
        }

        // --- HOBBIES ---
        if (/hobb|interest|free time|fun|cricket|sport|trek|outdoor/.test(q)) {
            topic = 'about';
            const resp = `🏏 Maoz enjoys: ${KB.hobbies.join(', ')}.\n\nHe says trekking and exploring new places fuel his creativity and keep him grounded when away from the workbench. 🏔️`;
            conversationMemory.addMessage(query, topic, resp, []);
            return resp;
        }

        // --- LOCATION ---
        if (/where|location|city|country|live|from/.test(q)) {
            const resp = `📍 Maoz is based in **${KB.location}**. He studies at ${KB.university}. 🏛️`;
            conversationMemory.addMessage(query, 'about', resp, []);
            return resp;
        }

        // --- RESUME ---
        if (/resume|cv|download/.test(q)) {
            const resp = `📄 You can download Maoz's latest CV from the portfolio. Look for the **"Download CV"** button in the hero section. 📥`;
            conversationMemory.addMessage(query, 'about', resp, []);
            return resp;
        }

        // --- THANK YOU ---
        if (/thank|thanks|thx|appreciate/.test(q)) {
            const thankResponses = [
                `You're welcome! 😊 Feel free to ask anything else about **${KB.name}**'s portfolio!`,
                `Happy to help! 🙌 Don't hesitate to ask more questions about Maoz's work.`,
                `Anytime! 😄 I'm here whenever you need more info about **${KB.name}**.`,
                `Glad I could help! ✨ Keep the questions coming — I love talking about Maoz's achievements!`
            ];
            const resp = thankResponses[Math.floor(Math.random() * thankResponses.length)];
            conversationMemory.addMessage(query, 'default', resp, []);
            return resp;
        }

        // --- BYE / GOODBYE ---
        if (/^(bye|goodbye|see you|take care|later|cya|peace out|khuda hafiz|allah hafiz)/.test(q)) {
            const byeResponses = [
                `Goodbye! 👋 It was great chatting with you. Come back anytime to learn more about **${KB.name}**!`,
                `See you later! ✨ Hope you found what you were looking for. ${KB.name}'s portfolio is always here for you!`,
                `Take care! 😊 If you ever need info about Maoz's projects or experience, I'll be right here!`,
                `Allah Hafiz! 🤲 Feel free to return anytime. Maoz's portfolio is always open!`
            ];
            const resp = byeResponses[Math.floor(Math.random() * byeResponses.length)];
            conversationMemory.addMessage(query, 'default', resp, []);
            return resp;
        }

        // === RECRUITER / PROFESSIONAL QUESTIONS ===

        // --- WHY HIRE / SELECT HIM ---
        if (/why (should|would|shall|will|do).*(hire|select|pick|choose|recruit|take|consider)|why hire|why select|why choose|reason.*(hire|select)/.test(q)) {
            topic = 'recruiter';
            const resp = `🌟 **Why You Should Hire Syed Maoz Arif:**\n\n**1. Proven Builder, Not Just a Student**\nWhile still in his ${KB.semester}, Maoz has already built **${KB.totalProjects} real-world projects** — from precision digital levels to UAV battery management systems. He doesn't just study theory; he ships products.\n\n**2. Globally Recognized**\n- 🏆 **Runner-Up** in the global Instructables Sensors Contest 2026\n- 🎓 **Altium Global Scholarship** awardee (March 2026)\n- 🥇 **1st Position** in Best Circuit Design competition\n\n**3. Industry-Grade Skills**\nHe's certified in **Altium Designer** (the industry standard), proficient in ESP32/STM32 embedded systems, and delivers production-ready multi-layer PCBs.\n\n**4. Already Has Professional Experience**\nActive freelancer on **Fiverr & Upwork** serving international clients — he understands deadlines, client communication, and professional delivery.\n\n**5. Leadership + Technical = Rare Combination**\nPresident at IET On Campus + Cabinet Member of Youth Parliament Pakistan. He can lead teams AND build circuits.\n\n**6. ${KB.totalCertifications} Certifications** across PCB Design, IoT, AI, and Entrepreneurship — continuous learner who invests in growth. 📈`;
            conversationMemory.addMessage(query, topic, resp, []);
            return resp;
        }

        // --- INTERNSHIP ---
        if (/intern(ship)?|intern candidate|good.*(intern|trainee)|suitable.*(intern|trainee)/.test(q)) {
            topic = 'recruiter';
            const resp = `🎯 **Why Maoz is an Ideal Intern:**\n\n**Immediate Value:**\n- Already builds production-ready PCBs in Altium Designer\n- Firmware experience with ESP32, STM32, Arduino\n- Can start contributing from Day 1 — not someone who needs months of training\n\n**Quick Learner with Proof:**\n- ${KB.totalCertifications} certifications earned proactively\n- Won awards in competitive environments (Instructables Global, COMSATS workshops)\n- Teaches himself new tools and technologies continuously\n\n**Professional Maturity:**\n- Already handles international freelance clients on Fiverr & Upwork\n- Understands project scoping, deadlines, and client communication\n- Experience leading teams as IET President\n\n**Academic Standing:**\n- ${KB.semester} at ${KB.university}\n- Student ID: ${KB.studentId}\n- Specializing in Embedded Systems, PCB Design, Signal Integrity, IoT\n\n📧 Contact: ${KB.email} | 📱 ${KB.phone}`;
            conversationMemory.addMessage(query, topic, resp, []);
            return resp;
        }

        // --- COMPANY FIT ---
        if (/company|team|organization|fit|culture|value.*(add|bring)|bring to.*(table|team)|add to.*(team|company)|contribution/.test(q)) {
            topic = 'recruiter';
            const resp = `🏢 **What Maoz Brings to Your Company/Team:**\n\n**Technical Contributions:**\n- End-to-end hardware development (schematic → PCB → prototype → production)\n- Multi-layer PCB design with signal integrity considerations\n- IoT solutions with ESP32/STM32 + cloud (Firebase, MQTT)\n- 3D mechanical enclosure design (Fusion 360, SolidWorks)\n\n**Soft Value:**\n- Strong communicator — handles international clients on freelance platforms\n- Natural leader — runs membership drives and organizes tech workshops\n- Team player with empathy — recognized by IET for community building\n- Problem solver — wins competitions under strict time constraints\n\n**Growth Mindset:**\n- ${KB.totalCertifications} certifications and counting\n- Actively explores AI tools (Gemini, ChatGPT, Claude) for engineering workflows\n- Bridges engineering with business (Practical Entrepreneurship certified) 🚀`;
            conversationMemory.addMessage(query, topic, resp, []);
            return resp;
        }

        // --- STRENGTHS ---
        if (/strength|strong point|best at|excel|good at|speciali/.test(q)) {
            topic = 'recruiter';
            const resp = `💪 **Maoz's Key Strengths:**\n\n1. **Multi-Layer PCB Design** — Professional-grade boards in Altium Designer, certified by Altium themselves\n2. **Embedded Systems** — Real working projects with ESP32, STM32, Arduino Nano\n3. **Full-Stack Hardware** — From schematic capture to 3D-printed enclosures\n4. **Global Competition Winner** — Instructables Sensors Contest Runner-Up\n5. **Freelance Professionalism** — Already serving international clients\n6. **Leadership** — President (IET) + Cabinet Member (Youth Parliament)\n7. **Rapid Learner** — ${KB.totalCertifications} certifications across diverse fields\n8. **Technical Writing** — LaTeX, Overleaf for professional documentation\n9. **AI Literacy** — Proficient with Gemini, ChatGPT, Claude, Google AI Studio\n10. **Communication** — Public speaking, collaboration, empathy 🌟`;
            conversationMemory.addMessage(query, topic, resp, []);
            return resp;
        }

        // --- WEAKNESSES / IMPROVEMENT ---
        if (/weakness|improve|lacking|gap|shortcoming|area.*(develop|growth)/.test(q)) {
            topic = 'recruiter';
            const resp = `📈 **Areas of Growth (Honest Self-Assessment):**\n\nMaoz is still a **${KB.semester} student** (graduating ${KB.expectedGrad}), so naturally:\n\n1. **Limited industry work experience** — But compensates with active freelancing on Fiverr & Upwork\n2. **Still building depth in analog/RF design** — Already started with the Mixed-Signal RF Board project\n3. **Early in career** — But already has ${KB.totalAwards} awards and ${KB.totalCertifications} certifications by semester 4\n\n**How he addresses gaps:**\n- Takes certifications proactively (not waiting for coursework)\n- Builds real projects to learn (not just tutorials)\n- Seeks competitive environments to test himself 💪`;
            conversationMemory.addMessage(query, topic, resp, []);
            return resp;
        }

        // --- SALARY / COMPENSATION ---
        if (/salary|pay|compensation|rate|charge|cost|pricing|budget/.test(q)) {
            const resp = `💰 For compensation discussions, please contact Maoz directly:\n\n📧 **Email:** ${KB.email}\n📱 **Phone:** ${KB.phone}\n🔗 **LinkedIn:** ${KB.linkedin}\n\nHe's available on **Fiverr & Upwork** for freelance project quotes. 📋`;
            conversationMemory.addMessage(query, 'contact', resp, []);
            return resp;
        }

        // --- AVAILABILITY ---
        if (/availab|free|when can.*(start|join|begin)|start date|available to/.test(q)) {
            const resp = `📅 **Availability:**\n\nMaoz is currently in his **${KB.semester}** at ${KB.university} (graduating ${KB.expectedGrad}).\n\n- ✅ **Available for:** Part-time internships, freelance projects, remote work, summer internships\n- ✅ **Already active on:** Fiverr & Upwork (serving international clients)\n- ✅ **Can work:** Remotely or on-site in ${KB.location}\n\nFor specific availability, contact him at **${KB.email}** or **${KB.phone}**. 📞`;
            conversationMemory.addMessage(query, 'recruiter', resp, []);
            return resp;
        }

        // --- PORTFOLIO SUMMARY / ELEVATOR PITCH ---
        if (/summary|pitch|elevator|overview|quick.*(intro|summary)|brief|in short|nutshell|tldr/.test(q)) {
            topic = 'about';
            const resp = `🚀 **${KB.name} in 60 Seconds:**\n\nA **${KB.semester}** EEE student at COMSATS who's already:\n\n✅ Built **${KB.totalProjects}** real-world hardware projects\n✅ Won **${KB.totalAwards}** awards including a **global Instructables contest**\n✅ Earned **${KB.totalCertifications}** certifications (Altium, IoT, AI, Business)\n✅ Received the **Altium Global Scholarship**\n✅ Serves international clients on **Fiverr & Upwork**\n✅ Leads as **President** at IET and **Cabinet Member** of Youth Parliament\n\n**Core Expertise:** Multi-layer PCB Design | Embedded Systems (ESP32/STM32) | 3D CAD | IoT\n\n📧 ${KB.email} | 📱 ${KB.phone}`;
            conversationMemory.addMessage(query, topic, resp, []);
            return resp;
        }

        // --- WHAT CAN HE DO FOR US ---
        if (/what can he do|what (would|could|will) he|how can he help|how (would|could|will) he|services|offer/.test(q)) {
            topic = 'recruiter';
            const resp = `🛠️ **Services & Capabilities Maoz Offers:**\n\n**Hardware Engineering:**\n- Multi-layer PCB design & layout (Altium Designer)\n- Schematic capture & BOM generation\n- Manufacturing file preparation (Gerber, drill files)\n- Signal integrity & impedance matching\n\n**Embedded Systems:**\n- Firmware development (ESP32, STM32, Arduino)\n- Sensor integration & IoT connectivity\n- Real-time data streaming (MQTT, Firebase)\n- Custom hardware-software integration\n\n**Mechanical Design:**\n- 3D product enclosure design (Fusion 360, SolidWorks)\n- Parametric modeling for 3D printing\n- Assembly design & technical drawings\n\n**Additional:**\n- Technical documentation (LaTeX)\n- Web development (HTML, CSS, JS)\n- AI-assisted engineering workflows\n\n📧 Contact: ${KB.email}`;
            conversationMemory.addMessage(query, topic, resp, []);
            return resp;
        }

        // --- COMPARE / STAND OUT / UNIQUE ---
        if (/stand.?out|unique|different|special|distinguish|compet(itive|itor)|edge|advantage|apart/.test(q)) {
            topic = 'recruiter';
            const resp = `🏅 **What Makes Maoz Stand Out:**\n\n**vs. Typical Students:**\n- Most students build classroom projects → Maoz builds **real products that win global contests**\n- Most students have no work experience → Maoz **already freelances internationally**\n- Most students wait for instructions → Maoz **self-teaches and gets certified proactively**\n\n**Unique Differentiators:**\n1. **Youngest Altium Scholarship awardee** in his cohort\n2. **Global contest winner** (Instructables — competing against professionals worldwide)\n3. **6 projects** by 4th semester — most students have 1-2\n4. **11 certifications** — more than many working professionals\n5. **Dual leadership roles** — IET President + Youth Parliament simultaneously\n6. **Full-stack hardware** — can design the PCB, code the firmware, model the enclosure, and write the documentation 🚀`;
            conversationMemory.addMessage(query, topic, resp, []);
            return resp;
        }

        // --- RECOMMENDATION / REFERENCE ---
        if (/recommend|reference|vouch|endorse|testimonial/.test(q)) {
            const resp = `📝 **Recommendations & Endorsements:**\n\nMaoz's work has been recognized by:\n\n- **Altium** — Selected for the Global Scholarship Program (March 2026)\n- **Instructables** — Runner-Up in global Sensors Contest (April 2026)\n- **IET** — Multiple certificates for leadership and community contribution\n- **COMSATS University** — Best Project Award\n- **International Clients** — Active on Fiverr & Upwork with professional track record\n\nFor direct references, contact Maoz at **${KB.email}**. 📧`;
            conversationMemory.addMessage(query, 'recruiter', resp, []);
            return resp;
        }

        // --- FUTURE GOALS / PLANS ---
        if (/goal|plan|future|aspir|dream|vision|ambition|where.*(see|headed|going)/.test(q)) {
            const resp = `🎯 **Maoz's Vision & Direction:**\n\nCurrently pursuing BSc EEE (graduating ${KB.expectedGrad}), Maoz is focused on:\n\n1. **Deepening hardware expertise** — advanced RF design, signal integrity, power electronics\n2. **Growing his freelance practice** — already serving international clients\n3. **Contributing to open-source hardware** — the IncliSense project is publicly documented\n4. **Leadership development** — active in IET and Youth Parliament\n5. **Bridging engineering and business** — certified in Practical Entrepreneurship\n\nHe aims to become a **leading hardware engineer** who can take products from concept to production. 🚀`;
            conversationMemory.addMessage(query, 'recruiter', resp, []);
            return resp;
        }

        // --- TEAMWORK / COLLABORATION ---
        if (/team|collaborate|group|work with|partner|together/.test(q)) {
            const resp = `🤝 **Teamwork & Collaboration:**\n\nMaoz thrives in team environments:\n\n- **IET President** — Organizes workshops, coordinates 50+ members\n- **Youth Parliament Cabinet Member** — Works in policy discussion groups\n- **1st Position in Circuit Design** — Won in a team-based hardware workshop at COMSATS\n- **Freelance Collaborations** — Works with international clients on Fiverr & Upwork\n\n**Interpersonal Skills:** Public Speaking, Communication, Empathy, Collaboration\n\nHe believes "the best solutions come from people who can both think critically and bring others together." 💡`;
            conversationMemory.addMessage(query, 'recruiter', resp, []);
            return resp;
        }

        // --- RELIABILITY / DEADLINE ---
        if (/reliab|deadline|deliver|trust|depend|punctual|on.?time|commitment/.test(q)) {
            const resp = `✅ **Reliability & Work Ethic:**\n\nMaoz demonstrates reliability through:\n\n- **Freelance track record** — Delivers projects on Fiverr & Upwork to international clients with deadlines\n- **Competition performance** — Won 1st in Circuit Design under strict time constraints\n- **Leadership consistency** — President at IET (July 2026 - Present, ongoing)\n- **Self-discipline** — Earned ${KB.totalCertifications} certifications while being a full-time student\n- **Proactive** — Doesn't wait for assignments; builds projects and pursues certifications independently 💪`;
            conversationMemory.addMessage(query, 'recruiter', resp, []);
            return resp;
        }

        // --- HELP ---
        if (/what can you|help|what do you know|capable|feature/.test(q)) {
            const resp = `🧠 I have **deep knowledge** of everything in Maoz's portfolio:\n\n- 👤 **About** — Full bio and background\n- 🚀 **${KB.totalProjects} Projects** — Names, tech stacks, descriptions\n- 📜 **${KB.totalCertifications} Certifications** — Names, issuers, **exact dates**, categories\n- 🏆 **${KB.totalAwards} Awards** — Full details and dates\n- 💼 **${KB.experience.length} Experiences** — Roles, organizations, dates\n- ⚡ **${KB.skills.length} Skills** — Technical and soft skills\n- 🛠️ **${Object.keys(KB.software).length} Software Categories** — Every tool\n- 🎓 **Education** — University, college, student ID\n- 📧 **Contact** — All emails, phone, social links\n\n**Recruiter questions:** Try "Why should we hire him?", "Is he good for an internship?", "What makes him stand out?"\n**Detail queries:** "How many Altium certificates?", "When did he get the Arduino cert?"\n**Smart search:** "Is he experienced in PCB design?", "Does he know ESP32?", "Compare his projects"\n**Professional:** "What can he do for us?", "Is he available?", "What are his strengths?"`;
            conversationMemory.addMessage(query, 'default', resp, []);
            return resp;
        }

        // --- SMART FUZZY SEARCH (upgraded) ---
        const searchResults = smartSearch(q);

        if (searchResults.length > 0) {
            topic = 'default';
            const maxScore = searchResults[0].score;
            const relevanceLabels = ['🟢 High Match', '🟡 Partial Match', '🟠 Related'];

            let resp = `${getVariedOpening('search')} Found **${searchResults.length} result(s)**:\n\n`;
            searchResults.forEach((r, i) => {
                const m = r.item;
                const label = i === 0 && r.score >= 2 ? relevanceLabels[0] : (r.score >= 1 ? relevanceLabels[1] : relevanceLabels[2]);
                resp += `**${i+1}. ${m.icon} [${m.type}] ${m.name}** — ${label}\n`;
                if (m.date) resp += `- Date: **${m.date}**\n`;
                if (m.issuer) resp += `- Issued by: ${m.issuer}\n`;
                if (m.desc) resp += `- ${m.desc}\n`;
                resp += '\n';
            });
            resp += `\n💡 *Tip: Ask me more specifically for detailed info on any of these!*`;
            discussedItems = searchResults.map(r => r.item);
            conversationMemory.addMessage(query, topic, resp, discussedItems);
            return resp;
        }

        // --- FALLBACK: GEMINI TAKES OVER ---
        return '__GEMINI_FALLBACK__';
    }

    // ==================== UI ENGINE ====================
    function createUI() {
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'ai-toggle-btn';
        toggleBtn.innerHTML = '✨';
        toggleBtn.title = 'Switch to AI Mode';
        document.body.appendChild(toggleBtn);

        const overlay = document.createElement('div');
        overlay.className = 'ai-overlay';
        overlay.innerHTML = `
            <div class="ai-header">
                <div class="ai-header-left">
                    <div class="ai-logo">✨</div>
                    <div>
                        <div class="ai-header-title">Maoz AI</div>
                        <div class="ai-header-subtitle">Powered by Gemini AI ✦ Portfolio Engine v4.0</div>
                    </div>
                </div>
                <button class="ai-back-btn">← Back to Portfolio</button>
            </div>
            <div class="ai-chat-container" id="ai-chat">
                <div class="ai-welcome">
                    <div class="ai-welcome-icon">✨</div>
                    <h2>${getTimeGreeting()}! I'm Maoz AI</h2>
                    <p>I know everything about Syed Maoz Arif's portfolio — and for anything beyond, I'm connected to <strong>Google Gemini</strong> to answer any question you have. Ask me anything!</p>
                    <div class="ai-suggestions">
                        <button class="ai-chip">Why should we hire him?</button>
                        <button class="ai-chip">Is he good for an internship?</button>
                        <button class="ai-chip">What makes him stand out?</button>
                        <button class="ai-chip">What can he do for our company?</button>
                        <button class="ai-chip">Quick portfolio summary</button>
                        <button class="ai-chip">How many Altium certificates?</button>
                        <button class="ai-chip">What are his strengths?</button>
                        <button class="ai-chip">Is he available?</button>
                        <button class="ai-chip">Compare his projects</button>
                        <button class="ai-chip">What's his best project?</button>
                    </div>
                </div>
            </div>
            <div class="ai-input-area">
                <div class="ai-input-wrapper">
                    <input class="ai-input" type="text" placeholder="Ask anything — dates, counts, details, or say Assalam o Alaikum..." autocomplete="off" />
                    <button class="ai-send-btn">➤</button>
                </div>
                <div class="ai-disclaimer">Maoz AI v4.0 — Portfolio data answered locally • General questions powered by Gemini AI</div>
            </div>
        `;
        document.body.appendChild(overlay);

        const chat = overlay.querySelector('#ai-chat');
        const input = overlay.querySelector('.ai-input');
        const sendBtn = overlay.querySelector('.ai-send-btn');
        const backBtn = overlay.querySelector('.ai-back-btn');
        const chips = overlay.querySelectorAll('.ai-chip');
        let welcomeShown = true;

        function parseMd(text) {
            return text
                .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.+?)\*/g, '<em>$1</em>')
                .replace(/\n/g, '<br>')
                .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" style="color:#64ffda;">$1</a>');
        }

        function renderFollowUpSuggestions(topic) {
            const suggestions = getFollowUpSuggestions(topic);
            if (!suggestions || suggestions.length === 0) return '';

            let html = '<div class="ai-followup-suggestions" style="margin-top:12px; display:flex; flex-wrap:wrap; gap:8px;">';
            suggestions.forEach(s => {
                html += `<button class="ai-followup-chip" style="background:rgba(100,255,218,0.1); border:1px solid rgba(100,255,218,0.3); color:#64ffda; padding:6px 14px; border-radius:20px; font-size:0.82rem; cursor:pointer; transition:all 0.2s; font-family:inherit;">${s}</button>`;
            });
            html += '</div>';
            return html;
        }

        function addMessage(text, isUser, topic) {
            if (welcomeShown) {
                const w = chat.querySelector('.ai-welcome');
                if (w) w.remove();
                welcomeShown = false;
            }
            const msg = document.createElement('div');
            msg.className = `ai-message ${isUser ? 'user' : 'bot'}`;

            let contentHtml = isUser ? text : parseMd(text);

            // Add follow-up suggestions for bot messages
            if (!isUser && topic) {
                contentHtml += renderFollowUpSuggestions(topic);
            }

            // Add fun fact if milestone reached
            if (!isUser && conversationMemory.shouldShowFunFact()) {
                const fact = funFacts[Math.floor(Math.random() * funFacts.length)];
                contentHtml += `<div style="margin-top:14px; padding:10px 14px; background:rgba(100,255,218,0.08); border-left:3px solid #64ffda; border-radius:4px; font-size:0.85rem;">${parseMd(fact)}</div>`;
            }

            msg.innerHTML = `
                <div class="ai-message-avatar">${isUser ? 'Y' : '✨'}</div>
                <div class="ai-message-content">${contentHtml}</div>
            `;
            chat.appendChild(msg);
            chat.scrollTop = chat.scrollHeight;

            // Attach event listeners to follow-up chips
            if (!isUser) {
                const followupChips = msg.querySelectorAll('.ai-followup-chip');
                followupChips.forEach(chip => {
                    chip.addEventListener('click', () => send(chip.textContent.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FEFF}]/gu, '').trim()));
                    chip.addEventListener('mouseenter', () => { chip.style.background = 'rgba(100,255,218,0.25)'; });
                    chip.addEventListener('mouseleave', () => { chip.style.background = 'rgba(100,255,218,0.1)'; });
                });
            }
        }

        function showTyping() {
            const t = document.createElement('div');
            t.className = 'ai-message bot'; t.id = 'ai-typing';
            t.innerHTML = `<div class="ai-message-avatar">✨</div><div class="ai-message-content"><div class="ai-typing"><div class="ai-typing-dot"></div><div class="ai-typing-dot"></div><div class="ai-typing-dot"></div></div></div>`;
            chat.appendChild(t);
            chat.scrollTop = chat.scrollHeight;
        }

        async function send(text) {
            if (!text.trim()) return;
            addMessage(text, true);
            input.value = '';
            showTyping();

            // Try local KB first
            const localResponse = getResponse(text);

            if (localResponse !== '__GEMINI_FALLBACK__') {
                // Local KB answered — show with small delay for natural feel
                const delay = 300 + Math.random() * 600;
                setTimeout(() => {
                    const el = document.getElementById('ai-typing');
                    if (el) el.remove();
                    const lastTopic = conversationMemory.getLastTopic() || 'default';
                    addMessage(localResponse, false, lastTopic);
                }, delay);
            } else {
                // Fallback to Gemini API
                try {
                    const geminiResponse = await askGemini(text);
                    const el = document.getElementById('ai-typing');
                    if (el) el.remove();

                    if (geminiResponse) {
                        const taggedResponse = `${geminiResponse}\n\n*🌐 Powered by Gemini AI*`;
                        conversationMemory.addMessage(text, 'gemini', taggedResponse, []);
                        addMessage(taggedResponse, false, 'gemini');
                    } else {
                        // Gemini failed — show offline fallback
                        const fallback = `I couldn't find that in the local portfolio data, and Gemini is currently unavailable. 😅\n\n**Try asking about:**\n- His projects, certifications, or awards\n- Skills, education, or experience\n- "Why should we hire him?"\n- "What makes him stand out?"`;
                        conversationMemory.addMessage(text, 'default', fallback, []);
                        addMessage(fallback, false, 'default');
                    }
                } catch (err) {
                    const el = document.getElementById('ai-typing');
                    if (el) el.remove();
                    const fallback = `Something went wrong connecting to Gemini. 😅 Try asking about Maoz's portfolio instead!`;
                    addMessage(fallback, false, 'default');
                }
            }
        }

        sendBtn.addEventListener('click', () => send(input.value));
        input.addEventListener('keydown', (e) => { if (e.key === 'Enter') send(input.value); });
        chips.forEach(c => c.addEventListener('click', () => send(c.textContent)));

        toggleBtn.addEventListener('click', () => {
            overlay.classList.add('active');
            document.body.classList.add('ai-active');
            setTimeout(() => input.focus(), 600);
        });

        backBtn.addEventListener('click', () => {
            overlay.classList.remove('active');
            document.body.classList.remove('ai-active');
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && overlay.classList.contains('active')) {
                overlay.classList.remove('active');
                document.body.classList.remove('ai-active');
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createUI);
    } else {
        createUI();
    }
})();
