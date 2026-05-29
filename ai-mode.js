// ============================================================
// MAOZ AI v2.0 - Advanced Portfolio Knowledge Engine
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

        about: "Syed Maoz Arif is a hardware developer and electronics engineering student in his 4th semester at COMSATS University, with hands-on experience in multi-layer PCB design and embedded systems. He doesn't just study engineering — he builds things that work in the real world, from first schematic to final production. Beyond the lab, he believes great engineers also lead. As Membership Head for IET On Campus and a Cabinet Member of the Youth Parliament Pakistan, he's learned that the best solutions come from people who can both think critically and bring others together.",

        traits: [
            { trait: "Engineering Academic", detail: "4th-semester Electrical (Electronics) Engineering undergraduate at COMSATS University Abbottabad." },
            { trait: "Technical Specialist", detail: "Expert in multi-layer PCB design, embedded systems/IoT (ESP32, STM32), and 3D mechanical modeling." },
            { trait: "Active Freelancer", detail: "Professional hardware and mechanical designer providing services on Fiverr and Upwork." },
            { trait: "Recognized Innovator", detail: "Altium Global Scholarship awardee and runner-up in the Instructables Sensors Contest." },
            { trait: "Community Leader", detail: "Membership Head for IET On Campus and Cabinet Member of the Youth Parliament Pakistan." },
            { trait: "Versatile Developer", detail: "Proficient in Altium Designer, Autodesk Fusion 360, Python, and LaTeX." },
            { trait: "Sports Enthusiast", detail: "Active in cricket." }
        ],

        projects: [
            { id: "p6", name: "IncliSense Digital Level", tech: ["Arduino Nano", "MPU6050", "IoT", "3D Printing"], desc: "A precision digital leveling device built to provide high-accuracy numerical feedback, featuring PC telemetry and a responsive 11-LED interface.", featured: true, achievement: "Won Runner-Up in Instructables Sensors Contest 2026", date: "2026" },
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
            { name: "IET On Campus Leadership", issuer: "IET (Institution of Engineering and Technology)", date: "February 23, 2026", category: "Leadership", desc: "Recognized for exceptional leadership and organizational contributions as a Membership Officer for the IET On Campus community.", tags: ["iet", "leadership", "membership", "officer"] },
            { name: "Arduino & IoT - Cardiff Institute", issuer: "Cardiff Institute", date: "February 23, 2026", category: "IoT/Embedded", desc: "Completed the comprehensive Arduino and IoT course from Cardiff Institute, gaining hands-on experience in building smart, connected hardware devices and sensor networks.", tags: ["arduino", "iot", "cardiff", "embedded"] },
            { name: "Practical Entrepreneurship", issuer: "Training Institute", date: "February 23, 2026", category: "Business", desc: "Completed intensive training in Practical Entrepreneurship, learning how to bridge the gap between technical engineering solutions and real-world business applications.", tags: ["entrepreneurship", "business"] },
            { name: "Unleashing Creativity with AI", issuer: "Workshop Organizer", date: "February 23, 2026", category: "AI", desc: "Participated in the Unleashing Creativity with AI program, exploring innovative applications and the intersection of artificial intelligence with creative engineering processes.", tags: ["ai", "creativity", "workshop"] },
            { name: "IET On Campus Recognition", issuer: "IET (Institution of Engineering and Technology)", date: "February 23, 2026", category: "Community", desc: "Acknowledged for active participation and dedication to the IET On Campus community, fostering technical growth and professional collaboration.", tags: ["iet", "recognition", "community"] }
        ],

        awards: [
            { name: "Best Project Award", issuer: "COMSATS University", date: "2026", desc: "Awarded 'Best Project' for outstanding engineering design, technical execution, and innovation at COMSATS University.", tags: ["best", "project"] },
            { name: "1st Position - Best Circuit Design", issuer: "COMSATS University & IET", date: "2026", desc: "Secured first place in a competitive hardware workshop at COMSATS University Islamabad, Abbottabad Campus in collaboration with IET. Demonstrated advanced proficiency in applied electronics by engineering an efficient, functional circuit layout under strict time constraints.", tags: ["circuit", "design", "first", "1st", "iet", "workshop"] },
            { name: "Altium Designer Essentials Certification", issuer: "Altium", date: "April 5, 2026", desc: "Successfully fulfilled the certification requirements for the Altium Designer Essentials program, demonstrating proficiency in professional PCB design and schematic capture.", tags: ["altium", "certification"] },
            { name: "Instructables Sensors Contest Runner-Up", issuer: "Instructables (Global)", date: "April 2026", desc: "Awarded Runner Up in the global Instructables Sensors Contest for the 'IncliSense' project, earning a bronze medal and recognition for precision-engineered dual-axis digital level design.", tags: ["instructables", "contest", "sensors", "runner", "inclisense", "global", "bronze"] }
        ],

        experience: [
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
            { name: "Leadership & Project Management", desc: "Delivering freelance engineering projects on Upwork and Fiverr, combined with organizational leadership as Membership Head for IET On Campus and Cabinet Member of Youth Parliament Pakistan.", tags: ["leadership", "management", "freelance"] },
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
        totalProjects: 6,
        totalCertifications: 11,
        totalAwards: 4,
        totalPlatforms: 2
    };

    // ==================== SMART RESPONSE ENGINE ====================
    function getResponse(query) {
        const q = query.toLowerCase().trim();
        const words = q.split(/\s+/);

        // --- GREETINGS ---
        if (/^(hi|hello|hey|assalam|salam|greetings|good morning|good evening|sup|yo)\b/.test(q)) {
            return `Hello! 👋 I'm **Maoz AI**, the personal assistant for **${KB.name}**'s portfolio.\n\nI have deep knowledge of all his **${KB.totalProjects} projects**, **${KB.totalCertifications} certifications**, **${KB.totalAwards} awards**, skills, education, experience, and contact details.\n\nAsk me anything specific! For example:\n- "How many Altium certificates does he have?"\n- "When did he get the Arduino certification?"\n- "What is his student ID?"`;
        }

        // --- COUNT QUERIES (how many) ---
        if (/how many/.test(q)) {
            // Altium specific
            if (/altium/.test(q)) {
                const altiumCerts = KB.certifications.filter(c => c.tags.some(t => t === 'altium'));
                const altiumAwards = KB.awards.filter(a => a.tags.some(t => t === 'altium'));
                let resp = `Maoz has **${altiumCerts.length} Altium certification(s)**:\n\n`;
                altiumCerts.forEach((c,i) => { resp += `${i+1}. **${c.name}** — Issued by ${c.issuer}, Date: ${c.date}\n`; });
                if (altiumAwards.length) {
                    resp += `\nPlus **${altiumAwards.length} Altium award(s)**:\n`;
                    altiumAwards.forEach((a,i) => { resp += `${i+1}. **${a.name}** — ${a.date}\n`; });
                }
                return resp;
            }
            if (/iet/.test(q)) {
                const ietCerts = KB.certifications.filter(c => c.tags.some(t => t === 'iet'));
                return `Maoz has **${ietCerts.length} IET certificate(s)**:\n\n` + ietCerts.map((c,i) => `${i+1}. **${c.name}** — ${c.date}`).join('\n');
            }
            if (/ai/.test(q)) {
                const aiCerts = KB.certifications.filter(c => c.tags.some(t => t === 'ai'));
                return `Maoz has **${aiCerts.length} AI-related certificate(s)**:\n\n` + aiCerts.map((c,i) => `${i+1}. **${c.name}** (${c.issuer}) — ${c.date}`).join('\n');
            }
            if (/project/.test(q)) return `Maoz has built **${KB.totalProjects} projects**: ${KB.projects.map(p => p.name).join(', ')}.`;
            if (/certif/.test(q)) return `Maoz holds **${KB.totalCertifications} certifications** in total. They span PCB/Hardware, AI, IoT, Leadership, Academic, and Business categories.`;
            if (/award/.test(q)) return `Maoz has earned **${KB.totalAwards} awards**: ${KB.awards.map(a => a.name).join(', ')}.`;
            if (/skill/.test(q)) return `Maoz has **${KB.skills.length} core skill areas**: ${KB.skills.map(s => s.name).join(', ')}.`;
            if (/experience|role|position/.test(q)) return `Maoz has **${KB.experience.length} experiences/roles**: ${KB.experience.map(e => `${e.title} at ${e.org}`).join(', ')}.`;
            return `📊 **Full Portfolio Stats:**\n- **${KB.totalProjects}** Projects\n- **${KB.totalCertifications}** Certifications\n- **${KB.totalAwards}** Awards\n- **${KB.skills.length}** Core Skills\n- **${KB.experience.length}** Experiences/Roles\n- **${KB.totalPlatforms}** Freelancing Platforms\n- **${Object.keys(KB.software).length}** Software Categories`;
        }

        // --- DATE QUERIES (when) ---
        if (/when|what date|which date|date of/.test(q)) {
            // Check certifications
            for (const c of KB.certifications) {
                if (c.tags.some(t => q.includes(t)) || q.includes(c.name.toLowerCase())) {
                    return `📅 **${c.name}** was received on **${c.date}**, issued by **${c.issuer}**.`;
                }
            }
            // Check awards
            for (const a of KB.awards) {
                if (a.tags.some(t => q.includes(t)) || q.includes(a.name.toLowerCase())) {
                    return `📅 **${a.name}** was awarded in **${a.date}** by **${a.issuer}**.`;
                }
            }
            // Check experience
            for (const e of KB.experience) {
                if (e.tags.some(t => q.includes(t)) || q.includes(e.org.toLowerCase())) {
                    return `📅 **${e.title}** at **${e.org}**: ${e.date}`;
                }
            }
            if (/graduat|finish|complete/.test(q)) return `🎓 Maoz is expected to graduate in **${KB.expectedGrad}** from ${KB.university}. He enrolled in **${KB.enrollmentYear}**.`;
            if (/college|fsc|peace/.test(q)) return `🎓 Maoz completed his FSc Pre-Engineering from **${KB.college}** in **${KB.collegeCompleted}**.`;
            return `I couldn't find a specific date for that. Try asking about a specific certificate, award, or experience by name!`;
        }

        // --- SPECIFIC TOPIC: ALTIUM ---
        if (/altium/.test(q)) {
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
            return resp;
        }

        // --- SPECIFIC TOPIC: IET ---
        if (/\biet\b/.test(q)) {
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
            return resp;
        }

        // --- SPECIFIC TOPIC: ARDUINO / IOT ---
        if (/arduino|iot|esp32|stm32|embedded|sensor|mqtt|firebase|blynk/.test(q)) {
            const iotCert = KB.certifications.find(c => c.tags.includes('arduino') || c.tags.includes('iot'));
            const iotSkill = KB.skills.find(s => s.tags.includes('iot') || s.tags.includes('embedded'));
            let resp = `📡 **Maoz's IoT & Embedded Systems expertise:**\n\n`;
            if (iotSkill) resp += `**Skill:** ${iotSkill.name}\n${iotSkill.desc}\n\n`;
            if (iotCert) resp += `**Certification:** ${iotCert.name} — Issued by ${iotCert.issuer}, Date: **${iotCert.date}**\n${iotCert.desc}\n\n`;
            resp += `**IoT Software:** ${KB.software["IoT & Cloud Platforms"].hardware.join(', ')}, ${KB.software["IoT & Cloud Platforms"].networking.join(', ')}\n\n`;
            resp += `**Related Projects:**\n`;
            KB.projects.filter(p => p.tech.some(t => /esp32|arduino|iot|sensor|mqtt/i.test(t))).forEach(p => {
                resp += `- **${p.name}** — Tech: ${p.tech.join(', ')}\n`;
            });
            return resp;
        }

        // --- SPECIFIC TOPIC: INSTRUCTABLES ---
        if (/instructable/.test(q)) {
            const award = KB.awards.find(a => a.tags.includes('instructables'));
            return `🏆 **Instructables Achievement:**\n\n**${award.name}**\n- Date: **${award.date}**\n- Issuer: ${award.issuer}\n- ${award.desc}\n\nThe winning project was **IncliSense Digital Level** — a precision dual-axis digital level using Arduino Nano and MPU6050.`;
        }

        // --- WHO / ABOUT ---
        if (/who (is|are)|about (him|maoz|syed)|tell me about|introduce|yourself|overview/.test(q)) {
            return `**${KB.name}** is a ${KB.role}\n\n${KB.about}\n\n📊 **Quick Stats:** ${KB.totalProjects} Projects | ${KB.totalCertifications} Certifications | ${KB.totalAwards} Awards\n📧 ${KB.email} | 📱 ${KB.phone}\n🔗 LinkedIn: ${KB.linkedin}`;
        }

        // --- NAME ---
        if (/what('s| is) (his|the|your) (full )?name|his name|your name/.test(q)) {
            return `His full name is **${KB.name}**.`;
        }

        // --- CONTACT ---
        if (/contact|email|phone|reach|number|call|social|linkedin|facebook/.test(q)) {
            return `📧 **Personal Email:** ${KB.email}\n📧 **University Email:** ${KB.eduEmail}\n📱 **Phone:** ${KB.phone}\n🔗 **LinkedIn:** ${KB.linkedin}\n📘 **Facebook:** ${KB.facebook}\n📍 **Location:** ${KB.location}`;
        }

        // --- EDUCATION ---
        if (/education|university|college|degree|study|student|semester|comsats|peace group|fsc|bsc/.test(q)) {
            return `🎓 **Education:**\n\n**1. ${KB.university}**\n- Enrolled: ${KB.enrollmentYear} | Expected Graduation: ${KB.expectedGrad}\n- Degree: ${KB.degree}\n- Semester: ${KB.semester}\n- Student ID: **${KB.studentId}**\n- Email: ${KB.eduEmail}\n- Focus: Embedded Systems, PCB Design, Signal Integrity, IoT\n- Website: ${KB.universityUrl}\n\n**2. ${KB.college}**\n- Completed: ${KB.collegeCompleted}\n- Degree: ${KB.collegeDegree}\n- Subjects: ${KB.collegeSubjects}\n- Website: ${KB.collegeUrl}`;
        }

        // --- PROJECTS (specific) ---
        for (const p of KB.projects) {
            if (q.includes(p.name.toLowerCase()) || (p.name.includes("IncliSense") && q.includes("inclisense"))) {
                let resp = `🚀 **${p.name}**${p.featured ? ' ⭐ Featured Project' : ''}\n\n**Tech Stack:** ${p.tech.join(', ')}\n\n${p.desc}`;
                if (p.achievement) resp += `\n\n🏆 **Achievement:** ${p.achievement}`;
                if (p.date) resp += `\n📅 **Year:** ${p.date}`;
                return resp;
            }
        }

        // --- PROJECTS (general) ---
        if (/project|build|made|created|developed/.test(q)) {
            let resp = `🚀 **Maoz has built ${KB.totalProjects} projects:**\n\n`;
            KB.projects.forEach((p, i) => {
                resp += `**${i+1}. ${p.name}**${p.featured ? ' ⭐' : ''}\n- Tech: ${p.tech.join(', ')}\n- ${p.desc}${p.achievement ? `\n- 🏆 ${p.achievement}` : ''}\n\n`;
            });
            return resp;
        }

        // --- CERTIFICATIONS (specific) ---
        for (const c of KB.certifications) {
            if (q.includes(c.name.toLowerCase())) {
                return `📜 **${c.name}**\n- Issued by: **${c.issuer}**\n- Date: **${c.date}**\n- Category: ${c.category}\n\n${c.desc}`;
            }
        }

        // --- CERTIFICATIONS (general) ---
        if (/certif|certificate/.test(q)) {
            let resp = `📜 **All ${KB.totalCertifications} Certifications:**\n\n`;
            KB.certifications.forEach((c, i) => {
                resp += `**${i+1}. ${c.name}**\n- Issued by: ${c.issuer}\n- Date: **${c.date}**\n- Category: ${c.category}\n\n`;
            });
            return resp;
        }

        // --- AWARDS ---
        if (/award|winner|won|prize|medal|first position|1st position|runner.?up|trophy|achievement/.test(q)) {
            let resp = `🏆 **All ${KB.totalAwards} Awards:**\n\n`;
            KB.awards.forEach((a, i) => {
                resp += `**${i+1}. ${a.name}**\n- Issued by: ${a.issuer}\n- Date: **${a.date}**\n- ${a.desc}\n\n`;
            });
            return resp;
        }

        // --- EXPERIENCE ---
        if (/experience|work|job|career|freelanc|fiverr|upwork|membership|youth parliament|cabinet/.test(q)) {
            let resp = `💼 **All ${KB.experience.length} Experiences & Roles:**\n\n`;
            KB.experience.forEach((e, i) => {
                resp += `**${i+1}. ${e.title}** — ${e.org}\n- Period: **${e.date}**\n- Category: ${e.category}\n- ${e.desc}\n\n`;
            });
            return resp;
        }

        // --- SKILLS ---
        if (/skill|can he|what (does|can) he do|abilit|capable|expertise|proficien/.test(q)) {
            let resp = `⚡ **${KB.skills.length} Core Skills:**\n\n`;
            KB.skills.forEach((s, i) => {
                resp += `**${i+1}. ${s.name}**\n- ${s.desc}\n\n`;
            });
            return resp;
        }

        // --- SOFTWARE ---
        if (/software|tool|program|app/.test(q)) {
            let resp = `🛠️ **Technical Software Suite (${Object.keys(KB.software).length} categories):**\n\n`;
            for (const [cat, data] of Object.entries(KB.software)) {
                resp += `**${cat}:**\n`;
                for (const [subcat, tools] of Object.entries(data)) {
                    resp += `- *${subcat}:* ${tools.join(', ')}\n`;
                }
                resp += `\n`;
            }
            return resp;
        }

        // --- TRAITS ---
        if (/trait|define|quality|characteristic|what makes|strength/.test(q)) {
            let resp = `✨ **What defines ${KB.name}:**\n\n`;
            KB.traits.forEach((t, i) => { resp += `**${i+1}. ${t.trait}:** ${t.detail}\n\n`; });
            return resp;
        }

        // --- STUDENT ID ---
        if (/student.?id|roll.?no|enrollment|registration/.test(q)) {
            return `🆔 **Student ID:** ${KB.studentId}\n📧 **University Email:** ${KB.eduEmail}\n🏛️ **University:** ${KB.university}\n📅 **Enrolled:** ${KB.enrollmentYear}`;
        }

        // --- HOBBIES ---
        if (/hobb|interest|free time|fun|cricket|sport|trek|outdoor/.test(q)) {
            return `🏏 Maoz enjoys: ${KB.hobbies.join(', ')}.\n\nHe says trekking and exploring new places fuel his creativity and keep him grounded when away from the workbench.`;
        }

        // --- LOCATION ---
        if (/where|location|city|country|live|from/.test(q)) {
            return `📍 Maoz is based in **${KB.location}**. He studies at ${KB.university}.`;
        }

        // --- RESUME ---
        if (/resume|cv|download/.test(q)) {
            return `📄 You can download Maoz's latest CV from the portfolio. Look for the **"Download CV"** button in the hero section.`;
        }

        // --- THANK YOU ---
        if (/thank|thanks|thx|appreciate/.test(q)) {
            return `You're welcome! 😊 Feel free to ask anything else about **${KB.name}**'s portfolio!`;
        }

        // --- HELP ---
        if (/what can you|help|what do you know|capable|feature/.test(q)) {
            return `🧠 I have **deep knowledge** of everything in Maoz's portfolio:\n\n- 👤 **About** — Full bio and background\n- 🚀 **${KB.totalProjects} Projects** — Names, tech stacks, descriptions\n- 📜 **${KB.totalCertifications} Certifications** — Names, issuers, **exact dates**, categories\n- 🏆 **${KB.totalAwards} Awards** — Full details and dates\n- 💼 **${KB.experience.length} Experiences** — Roles, organizations, dates\n- ⚡ **${KB.skills.length} Skills** — Technical and soft skills\n- 🛠️ **${Object.keys(KB.software).length} Software Categories** — Every tool\n- 🎓 **Education** — University, college, student ID\n- 📧 **Contact** — All emails, phone, social links\n\n**Smart queries:** Try "how many Altium certificates?", "when did he get the Arduino cert?", "what IET roles?"`;
        }

        // --- FUZZY SEARCH: try to match any keyword against all data ---
        const allItems = [
            ...KB.certifications.map(c => ({ ...c, type: 'Certification' })),
            ...KB.awards.map(a => ({ ...a, type: 'Award' })),
            ...KB.experience.map(e => ({ ...e, name: `${e.title} at ${e.org}`, type: 'Experience' })),
            ...KB.skills.map(s => ({ ...s, type: 'Skill' })),
            ...KB.projects.map(p => ({ ...p, tags: p.tech.map(t => t.toLowerCase()), type: 'Project' }))
        ];

        const matches = allItems.filter(item => {
            const searchable = (item.name + ' ' + (item.desc || '') + ' ' + (item.tags || []).join(' ')).toLowerCase();
            return words.some(w => w.length > 2 && searchable.includes(w));
        });

        if (matches.length > 0 && matches.length <= 5) {
            let resp = `🔍 I found **${matches.length} result(s)** related to your query:\n\n`;
            matches.forEach((m, i) => {
                resp += `**${i+1}. [${m.type}] ${m.name}**\n`;
                if (m.date) resp += `- Date: **${m.date}**\n`;
                if (m.issuer) resp += `- Issued by: ${m.issuer}\n`;
                if (m.desc) resp += `- ${m.desc}\n`;
                resp += '\n';
            });
            return resp;
        }

        // --- FALLBACK ---
        return `I'm not sure about that specific question. Try asking more specifically!\n\n**Example queries:**\n- "How many Altium certificates does he have?"\n- "When did he get the Arduino certification?"\n- "Tell me about the IncliSense project"\n- "What IET roles does he hold?"\n- "List all awards"\n- "What is his student ID?"`;
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
                        <div class="ai-header-subtitle">Portfolio Knowledge Engine v2.0</div>
                    </div>
                </div>
                <button class="ai-back-btn">← Back to Portfolio</button>
            </div>
            <div class="ai-chat-container" id="ai-chat">
                <div class="ai-welcome">
                    <div class="ai-welcome-icon">✨</div>
                    <h2>Hello, I'm Maoz AI</h2>
                    <p>I have deep knowledge of every detail in Syed Maoz Arif's portfolio — including exact dates, issuers, IDs, and descriptions. Ask me anything!</p>
                    <div class="ai-suggestions">
                        <button class="ai-chip">How many Altium certificates?</button>
                        <button class="ai-chip">When did he get each certification?</button>
                        <button class="ai-chip">Tell me about IncliSense</button>
                        <button class="ai-chip">What are his IET roles?</button>
                        <button class="ai-chip">What is his student ID?</button>
                        <button class="ai-chip">Full portfolio stats</button>
                    </div>
                </div>
            </div>
            <div class="ai-input-area">
                <div class="ai-input-wrapper">
                    <input class="ai-input" type="text" placeholder="Ask anything — dates, counts, details..." autocomplete="off" />
                    <button class="ai-send-btn">➤</button>
                </div>
                <div class="ai-disclaimer">Maoz AI v2.0 — All data sourced from portfolio content with exact dates and details.</div>
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

        function addMessage(text, isUser) {
            if (welcomeShown) {
                const w = chat.querySelector('.ai-welcome');
                if (w) w.remove();
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

        function showTyping() {
            const t = document.createElement('div');
            t.className = 'ai-message bot'; t.id = 'ai-typing';
            t.innerHTML = `<div class="ai-message-avatar">✨</div><div class="ai-message-content"><div class="ai-typing"><div class="ai-typing-dot"></div><div class="ai-typing-dot"></div><div class="ai-typing-dot"></div></div></div>`;
            chat.appendChild(t);
            chat.scrollTop = chat.scrollHeight;
        }

        function send(text) {
            if (!text.trim()) return;
            addMessage(text, true);
            input.value = '';
            showTyping();
            const delay = 300 + Math.random() * 600;
            setTimeout(() => {
                const el = document.getElementById('ai-typing');
                if (el) el.remove();
                addMessage(getResponse(text), false);
            }, delay);
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
