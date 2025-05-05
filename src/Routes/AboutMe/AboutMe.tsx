import styles from "./AboutMe.module.css";
import {motion, useInView} from "framer-motion";
import Timeline from "../../Components/Timeline/Timeline.tsx";
import {FaDownload} from "react-icons/fa";
import {IconType} from "../../Components/Icons/Icons.tsx";
import TechStackIcon from "../Projects/TechStackIcon.tsx";
import {useEffect, useRef, useState} from "react";

const variants = {
    "hover": {
        opacity: 0.6
    },
    "hidden": {
        opacity: 0
    },
    "normal": {
        opacity: 1,
    }
}

export default function AboutMe() {
    const triggerRef = useRef(null)
    const isInFlow = useInView(triggerRef)
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => {
            setMounted(true);
        },3000)

        return () => {
            clearTimeout(t);
        }
    }, []);



    return (
        <motion.main
            variants={{
                "hidden": {
                    opacity: 0
                },
                "normal": {
                    opacity: 1,
                    transition: {
                        duration: 0.5,
                        ease: "easeInOut",
                        staggerChildren: 0.2,
                        delayChildren: 2
                    }
                }
            }}

            initial={"hidden"}
            animate={"normal"}
        >
            <motion.div className={styles.info}
                        variants={{
                            "hidden": {
                                opacity: 0
                            },
                            "normal": {
                                opacity: 1,
                                transition: {
                                    duration: 0.5,
                                    ease: "easeInOut",
                                    staggerChildren: 0.2,
                                    delayChildren: 0.2
                                }
                            }
                        }}
            >
                <motion.div className={styles.coloredBorder}
                            variants={variants}
                >
                    <div className={styles.about}>
                        <h1 className={styles.title}>About Me</h1>
                        <p className={styles.text}>
                            I am a passionate software engineer with a strong interest in full-stack development and
                            competitive gaming. I have experience in managing online esports competitions and am
                            currently
                            pursuing a BSc in Information Technology at ETH Zurich.
                        </p>
                        <p className={styles.text}>
                            I enjoy building web applications and exploring new technologies. In my free time, I like to
                            play
                            volleyball and participate in tech projects.
                        </p>
                    </div>
                </motion.div>
                <motion.div variants={variants}
                            className={styles.coloredBorder}>
                    <div className={styles.languages}>
                        <h1 className={styles.title}>Languages</h1>
                        <ul>
                            <li>German (native)</li>
                            <li>English (fluent)</li>
                            <li>Spanish (basics)</li>
                        </ul>
                    </div>
                </motion.div>
                <motion.div variants={variants}
                            className={styles.coloredBorder}>
                    <div className={styles.hobbies}>
                        <h1 className={styles.title}>Hobbies</h1>
                        <ul>
                            <li>Volleyball</li>
                            <li>Competitive Gaming</li>
                            <li>Programming</li>
                            <li>Cooking</li>
                        </ul>
                    </div>
                </motion.div>
            </motion.div>
            <motion.div variants={variants}
                        className={styles.techstack}>
                <div className={styles.coloredBorder}>
                    <div>
                        <h1 className={styles.title}>My techstack</h1>
                        <div className={styles.techstackContent}>
                            <div className={styles.landm}>
                                <h3>Languages and Markup</h3>
                                <div className={styles.techIcons}>
                                    {
                                        (["Java", "JavaScript", "TypeScript", "Python", "HTML5", "CSS3"] as IconType[]).map((lang, index) => (
                                            <div key={index}>
                                                <TechStackIcon name={lang} size={40}/>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className={styles.tfl}>
                                <h3>Tools, Frameworks and Libraries</h3>
                                <div className={styles.techIcons}>
                                    {
                                        (["Docker", "Git", "PostgreSQL", "MongoDB", "SpringBoot", "React", "Express", "Mantine", "Bootstrap"] as IconType[]).map((icon) => (
                                            <div key={icon}>
                                                <TechStackIcon name={icon} size={40}/>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
            <motion.div variants={variants} className={styles.boxes}>
                <div className={styles.box}>
                    <motion.section
                        className={styles.timelineWrapper}
                        initial="hidden"
                        animate={"show"}
                        viewport={{once: true}}
                        variants={{
                            hidden: {opacity: 0},
                            show: {
                                opacity: 1,
                                transition: {staggerChildren: 0.3},
                            },
                        }}
                    >
                        <Timeline
                            title={"experience"}
                            entries={
                                [
                                    {
                                        date: "08/2021 – 06/2022",
                                        title: "FACEIT Ltd — Competition Coordinator (Remote)",
                                        summary: "Ran online esports competitions and enforced game rules.",
                                        details: `
    <ul>
      <li>Set up game servers, configured tournaments and brackets.</li>
      <li>Handled player inquiries on the FACEIT platform and Discord.</li>
    </ul>`
                                    },
                                    {
                                        date: "04/2021 – 08/2021",
                                        title: "FACEIT Ltd — Live Support (Remote)",
                                        summary: "Provided real-time player support via LiveChat.",
                                        details: `
    <p>Resolved game and server-related issues and supported players with general questions</p>`
                                    },
                                    {
                                        date: "01/2020 – 02/2021",
                                        title: "Ten Mans Management LLC — Volunteer General Manager",
                                        summary: "Helped managing a team of 50 volunteers and 10000+ players.",
                                        details: `
    <ul>
      <li>Created and maintained timetables for volunteer admins from all around the world</li>
      <li>Resolved personal issues between staff members</li>
      <li>Created tools and programs to improve efficiency and player satisfaction</li>
      <li>Conducted interviews and provided training to new staff</li>
    </ul>`
                                    },
                                    {
                                        date: "04/2019 – 01/2020",
                                        title: "Ten Mans Management LLC — Volunteer Competition Administrator",
                                        summary: "Moderated and enforced rules in online esports competitions.",
                                        details: `
    <ul>
      <li>Answered 200+ support tickets on Discord and FACEIT.</li>
      <li>Helped draft fair-play policies for amateur events.</li>
    </ul>`
                                    }

                                ]
                            }/>
                    </motion.section>
                </div>
                <div className={styles.box}>
                    <motion.section
                        className={styles.timelineWrapper}
                        initial="hidden"
                        animate="show"
                        viewport={{once: true}}
                        variants={{
                            hidden: {opacity: 0},
                            show: {
                                opacity: 1,
                                transition: {staggerChildren: 0.1},
                            },
                        }}
                    >
                        <Timeline
                            title={"education"}
                            entries={
                                [
                                    {
                                        date: "2022 – Present",
                                        title: "ETH Zurich — BSc Information Technology (ongoing)",
                                        summary: "Studying information technology at ETH Zurich.",
                                        details: `
    <ul>
      <li>Key coursework: Algorithms & Data Structures, Graph Theory, Computer Architecture, Multicore Programming.</li>
      <li>Active in student tech projects and volleyball club.</li>
    </ul>`
                                    },
                                    {
                                        date: "2016 – 2022",
                                        title: "Richard Fehrenbach-Gewerbeschule — Technisches Gymnasium",
                                        summary: "General University Entrance Qualification (major IT).",
                                        details: `
    <p>Completed an IT-focused high-school curriculum in Freiburg i. Br.</p>
    <p>Built several web-apps in React/TypeScript that sparked my interest in full-stack development.</p>`
                                    }

                                ]
                            }/>
                    </motion.section>

                </div>

            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isInFlow ? 1 : 0.6 }}
                transition={{
                    delay: mounted ? 0 : 3,
                    duration: 0.5,
                    ease: 'easeIn'
                }}
                className={isInFlow ? styles.inFlow : styles.fixedHover}
            >
                <motion.a
                    href="/cv-FelixJungbluth.pdf"
                    className={styles.button}
                    whileHover={{scale: 1.04}}
                    whileTap={{scale: 0.96}}
                    download
                    id={"cv-download"}
                >
                    <FaDownload className={styles.buttonIcon}/>
                    <span className={styles.buttonLink}>Download CV</span>
                </motion.a>
            </motion.div>
            {
                !isInFlow && (
                    <div className={styles.vbox}/>
                )
            }
            <motion.div variants={variants} ref={triggerRef}
                        className={isInFlow ? styles.triggerIn : styles.triggerOut}/>
        </motion.main>

    )
}