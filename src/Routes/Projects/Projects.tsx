// Projects.tsx
import styles from "./Projects.module.css";
import ProjectCardTechStack from "./ProjectCardTechStack";
import PagePreview from "./PagePreview/PagePreview";
import {iconType} from "../../Components/Icons/Icons.tsx";
import {motion} from "framer-motion";
import {useEffect} from "react";
import {useLocation} from "react-router";

const projects: {
    title: string;
    description: string;
    subdescription?: string;
    technologies: iconType[];
    preview: {
        src: string;
        name: string;
        additionalInfo?: {
            [key: string]: string;
        };
    };
    creationDate: string;
}[] = [
    {
        title: "JB‑Maschinenbau",
        description:
            "Modern corporate site for a German industrial machinery manufacturer.",
        technologies: [
            "React",
            "Bootstrap",
            "TypeScript",
            "Git",
            "GitHub"
        ],
        creationDate: "2022",
        preview: {src: "https://jb-maschinenbau.de", name: "JB‑Maschinenbau"},
    },
    {
        title: "Gradetude",
        description:
            "Grading‑as‑a‑Service platform for educational institutions. Done as a project for the Fundamentals of Web Engineering course at ETH",
        subdescription:
            "The platform aims to aid teachers in small institutions to manage and oversee the grading process. It allows teachers create report cards for students based on .docx templating ",
        technologies: [
            "React",
            "Mantine",
            "TypeScript",
            "Python",
            "FastAPI",
            "PostgreSQL",
            "Kubernetes",
            "GitLab"
        ],
        creationDate: "2024",
        preview: {
            src: "https://fp-p10.fwe24.ivia.ch",
            name: "Gradetude",
            additionalInfo: {Username: "demo‑user", Password: "demo‑password"},
        },
    },
    {
        title: "Fearless Flexqueue",
        description:
            "Small Webpage to track progress of the Fearless Flexqueue project for the Twitch streamer Noway4u_sir.",
        technologies: [
            "React",
            "Mantine",
            "TypeScript",
            "NodeJs",
            "Express",
            "Git",
            "GitHub",
            "Docker",
            "Vite"
        ],
        creationDate: "2025",
        preview: {
            src: "https://noway.fypex-test.com",
            name: "Fearless Flexqueue",
        },
    },
    {
        title: "Portfolio",
        description:
            "My personal portfolio website",
        technologies: [
            "React",
            "TypeScript",
            "TailwindCSS",
            "Git",
            "GitHub",
            "Vite"
        ],
        creationDate: "2025",
        preview: {
            src: "http://localhost:5173",
            name: "Portfolio",
        },
    }
];

export default function Projects() {
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.scrollTo) {
            const element = document.getElementById(location.state.scrollTo);
            if (element) {
                element.scrollIntoView({behavior: "smooth"});
            }

            // Clear the state to prevent scrolling again on refresh
            const to = location.state.scrollTo;
            location.state.scrollTo = location.state.scrollFrom;
            location.state.scrollFrom = to;
        }
    }, [location.state]);


    return (
        <main className={styles.container}>
            <h1 className={styles.title}
                id={"projects-title"}
            >Projects</h1>
            <motion.section className={styles.projectGrid}
                            initial="hidden"
                            whileInView="show"
                            viewport={{once: true}}
                            variants={{
                                hidden: {opacity: 0},
                                show: {
                                    opacity: 1,
                                    transition: {staggerChildren: 0.2, delayChildren: 2.3},
                                },
                            }}
            >
                {projects.map((p) => (
                    <motion.div className={styles.coloredBorder}
                                variants={{
                                    hidden: {opacity: 0, y: 10},
                                    show: {
                                        opacity: 1,
                                        y: 0
                                    },
                                }}
                    >
                        <article key={p.title} className={styles.projectCard}>
                            <div className={styles.unskew}>
                                <header>
                                    <h2 className={styles.title}
                                        id={`${p.title.toUpperCase()}-title`}
                                    >{p.title}</h2>
                                </header>
                                <PagePreview {...p.preview} />
                                <div className={styles.descriptionWrapper}>
                                    <div className={styles.line}/>
                                    <p className={styles.description}
                                       id={`${p.title.toLowerCase()}-description`}
                                    >{p.description}</p>
                                    {p.subdescription && (
                                        <p className={styles.subdescription}
                                           id={`${p.title.toLowerCase()}-subdescription`}
                                        >
                                            {p.subdescription}
                                        </p>
                                    )}
                                </div>
                                <div className={styles.line}

                                />
                                <div className={styles.boxes}

                                >
                                    <div className={styles.box}>
                                        <p className={styles.technologies}
                                           id={`${p.title.toLowerCase()}-technologies`}
                                        >
                                            Techstack:
                                        </p>
                                        <ProjectCardTechStack technologies={p.technologies}/>
                                    </div>
                                    <div className={styles.box}>
                                        <p id={`${p.title.toLowerCase()}-url`}>
                                            URL: <a href={p.preview.src} target={"_blank"}
                                                    className={styles.url}>{p.preview.src}</a>
                                        </p>
                                        <p id={`${p.title.toLowerCase()}-creationDate`}>
                                            Creation Date: {p.creationDate}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </motion.div>
                ))}
            </motion.section>
        </main>
    );
}
