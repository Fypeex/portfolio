export const documents = [
    {
        title: "jb-maschinenbau",
        id: 0,
        page: "projects",
        sections: {
            title: "JB-Maschinenbau",
            description: "Corporate one-page site in German for JB Maschinenbau. Showcases core mechanical-engineering services, client references and legal info. Designed to build trust and drive direct contact inquiries.",
            technologies: "React, Bootstrap, TypeScript, Git, GitHub",
            creationDate: "2022",
            url: "https://jb-maschinenbau.de",
        }
    },
    {
        title: "gradetude",
        id: 1,
        page: "projects",
        sections: {
            title: "Gradetude",
            description: "Grading‑as‑a‑Service platform for educational institutions. Done as a project for the Fundamentals of Web Engineering course at ETH",
            subdescription: "The platform aims to aid teachers in small institutions to manage and oversee the grading process. It allows teachers create report cards for students based on .docx templating ",
            technologies: "React, Mantine, TypeScript, Python, FastAPI, PostgreSQL, Kubernetes, GitLab",
            creationDate: "2024",
            url: "https://fp-p10.fwe24.ivia.ch",
        }
    },
    {
        title: "fearless-flexqueue",
        id: 2,
        page: "projects",
        sections: {
            title: "Fearless Flexqueue",
            description: "Small Webpage to track progress of the Fearless Flexqueue project for the Twitch streamer Noway4u_sir.",
            technologies: "React, Mantine, TypeScript, NodeJs, Express, Git, GitHub, Docker, Vite",
            creationDate: "2025",
            url: "https://noway.fypex-test.com"
        }
    },
    {
        title: "portfolio",
        id: 3,
        page: "projects",
        sections: {
            title: "Portfolio",
            description: "My personal portfolio website",
            technologies: "React, TypeScript, TailwindCSS, Git, GitHub, Vite",
            creationDate: "2023",
            url: "http://localhost:5173"
        }
    },
    {
        title: "projects",
        id: 4,
        page: "projects",
        sections: {
            title: "Projects"
        }
    },
    {
        title: "socials",
        id: 5,
        page: "contact",
        sections: {
            links: "GitHub, LinkedIn, Twitter, X, Email, Contact, Copy Email",
            about: "Felix Jungbluth"
        }
    },
    {
        title: "contact",
        id: 6,
        page: "contact",
        sections: {
            title: "Contact",
            description: "Let's talk, Message"
        }
    },
    {
        title: "experience",
        id: 7,
        page: "contact",
        sections: {
            title: "Experience",
            "1": "08/2021 - 06/2022, FACEIT Ltd - Competition Coordinator (Remote), Ran online esports competitions and enforced game rules. Set up game servers, configured tournaments and brackets. Handled player inquiries on the FACEIT platform and Discord.",
            "2": "04/2021 - 08/2021, FACEIT Ltd - Live Support (Remote), Provided real-time player support via LiveChat, Resolved game and server-related issues and supported players with general questions, Resolved game and server-related issues and supported players with general questions",
            "3":  "01/2020 - 02/2021, Ten Mans Management LLC - Volunteer General Manager, Helped managing a team of 50 volunteers and 10000+ players, Created and maintained timetables for volunteer admins from all around the world,Resolved personal issues between staff members, Created tools and programs to improve efficiency and player satisfaction, Conducted interviews and provided training to new staff",
            "4": "04/2019 - 01/2020, Ten Mans Management LLC - Volunteer Admin, Moderated and enforced rules in online esports competitions. Answered 200+ support tickets on Discord and FACEIT, Helped draft fair-play policies for amateur events.",
        }
    },
    {
        title: "education",
        id: 8,
        page: "contact",
        sections: {
            title: "Education",
            "1": "09/2022 - Present, ETH Zurich - BSc Information Technology (ongoing), Studying information technology at ETH Zurich, Key coursework: Algorithms & Data Structures, Graph Theory, Computer Architecture, Multicore Programming, Active in student tech projects and volleyball club.",
            "2": "2016 - 2022, Richard Fehrenbach-Gewerbeschule - Technisches Gymnasium, General University Entrance Qualification (major IT). Completed an IT-focused high-school curriculum in Freiburg i. Br. Built several web-apps in React/TypeScript that sparked my interest in full-stack development."
        }
    },
    {
        title: "cv",
        id: 9,
        page: "contact",
        sections: {
            download: "Download CV",
        }
    }
]

export const esc = (s:string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');


export const umlaut = (ch: string) => {
    switch (ch.toLowerCase()) {
        case 'ä': return '(?:ä|ae|a)';
        case 'ö': return '(?:ö|oe|o)';
        case 'ü': return '(?:ü|ue|u)';
        case 'ß': return '(?:ß|ss)';
        default : return esc(ch);
    }
};

export const replaceUmlaut = (term: string) => {
    return term
        .replace(/ä/g, 'a')
        .replace(/ö/g, 'o')
        .replace(/ü/g, 'u')
        .replace(/ß/g, 'ss')
        .replace(/Ä/g, 'A')
        .replace(/Ö/g, 'O')
        .replace(/Ü/g, 'U')
};

export const buildRe = (term: string) =>
    new RegExp(`(${[...term].map(umlaut).join('')})`, 'gi');

