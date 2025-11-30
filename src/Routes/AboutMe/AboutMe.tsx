import styles from "./AboutMe.module.css";
import {motion, useInView} from "framer-motion";
import Timeline from "../../Components/Timeline/Timeline.tsx";
import {FaDownload} from "react-icons/fa";
import {IconType} from "../../Components/Icons/Icons.tsx";
import TechStackIcon from "../Projects/TechStackIcon.tsx";
import {useEffect, useRef, useState} from "react";
import {Trans, useTranslation} from "react-i18next";

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
        }, 3000)

        return () => {
            clearTimeout(t);
        }
    }, []);

    const {t} = useTranslation();


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
                        <h1 className={styles.title} id={"about.aboutTitle"}>{t("about.aboutTitle")}</h1>
                        <Trans id={"about.aboutSub"} t={t} i18nKey={"about.aboutSub"} components={{
                            "p": <p className={styles.text}/>,
                        }}/>
                    </div>
                </motion.div>
                <motion.div variants={variants}
                            className={styles.coloredBorder}>
                    <div className={styles.languages}>
                        <h1 className={styles.title} id={"about.languagesTitle"}>{t("about.languagesTitle")}</h1>
                        <ul>
                            <Trans id={"about.languagesSub"} t={t} i18nKey={"about.languagesSub"} components={{
                                "li": <li/>,
                            }}/>
                        </ul>
                    </div>
                </motion.div>
                <motion.div variants={variants}
                            className={styles.coloredBorder}>
                    <div className={styles.hobbies}>
                        <h1 className={styles.title} id={"about.hobbiesTitle"}>{t("about.hobbiesTitle")}</h1>
                        <ul>
                            <Trans id={"about.hobbiesSub"} t={t} i18nKey={"about.hobbiesSub"} components={{
                                "li": <li/>,
                            }}/>
                        </ul>
                    </div>
                </motion.div>
            </motion.div>
            <motion.div variants={variants}
                        className={styles.techstack}>
                <div className={styles.coloredBorder}>
                    <div>
                        <h1 className={styles.title} id={"about.techStackTitle"}>{t("about.techStackTitle")}</h1>
                        <div className={styles.techstackContent}>
                            <div className={styles.landm}>
                                <h3 id={"about.lam"}>{t("about.lam")}</h3>
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
                                <h3 id={"about.tfl"}>{t("about.tfl")}</h3>
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
                                [1, 2, 3, 4].map((index) => ({
                                    date: `experience.exp${index}.date`,
                                    title: `experience.exp${index}.title`,
                                    summary: `experience.exp${index}.summary`,
                                    details: `experience.exp${index}.details`,

                                }))
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
                                [1,2].map((index) => ({
                                    date: `education.edu${index}.date`,
                                    title: `education.edu${index}.title`,
                                    summary: `education.edu${index}.summary`,
                                    details: `education.edu${index}.details`,

                                }))
                            }/>
                    </motion.section>

                </div>

            </motion.div>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: isInFlow ? 1 : 0.6}}
                transition={{
                    delay: mounted ? 0 : 3,
                    duration: 0.5,
                    ease: 'easeIn'
                }}
                className={isInFlow ? styles.inFlow : styles.fixedHover}
            >
                <motion.a
                    href="/portfolio/cv-FelixJungbluth.pdf"
                    className={styles.button}
                    whileHover={{scale: 1.04}}
                    whileTap={{scale: 0.96}}
                    download
                    id={"cv.button"}
                >
                    <FaDownload className={styles.buttonIcon}/>
                    <span className={styles.buttonLink}>{t("cv.button")}</span>
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