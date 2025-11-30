// Projects.tsx
import styles from "./Projects.module.css";
import ProjectCardTechStack from "./ProjectCardTechStack";
import PagePreview from "../../Components/PagePreview/PagePreview";
import {motion} from "framer-motion";
import {Trans, useTranslation} from "react-i18next";
import {IconName} from "./TechStackIcon.tsx";

const projects: [string, boolean][] = [
    ["jbm", true],
    ["gradetude", true],
    ["ATARI AI", false],
    ["portfolio", true]
]


export default function Projects() {
    const {t} = useTranslation(undefined, {useSuspense: true});


    return (
        <main className={styles.container}>
            <h1 className={styles.title}
                id={"projects.title"}
            >{t("projects.title")}</h1>
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
                {projects.map(([p, hasPreview]) => (
                    <motion.div className={styles.coloredBorder}
                                variants={{
                                    hidden: {opacity: 0, y: 10, skew: "1deg"},
                                    show: {
                                        opacity: 1,
                                        y: 0,
                                        skew: "1deg"
                                    },
                                }}
                    >
                        <article key={p} className={styles.projectCard}>
                            <div className={styles.unskew}>
                                <header>
                                    <h2 className={styles.title}
                                        id={`${p}.title`}
                                    >{t(`${p}.title`)}</h2>
                                </header>
                                <PagePreview name={p} hasPreview={hasPreview}/>
                                <div className={styles.descriptionWrapper}>
                                    <div className={styles.line}/>
                                    <p className={styles.description}
                                       id={`${p}.description`}
                                    >{t(`${p}.description`)}</p>

                                    <Trans className={styles.subdescription}
                                           components={{
                                               "a": <a className={styles.url}/>
                                           }}
                                           i18nKey={`${p}.sub`}
                                           defaults={" "}
                                    >
                                    </Trans>


                                </div>
                                <div className={styles.line}

                                />
                                <div className={styles.boxes}

                                >
                                    <div className={styles.box}>
                                        <p className={styles.technologies}
                                           id={`${p}.techStack`}
                                        >
                                            {t(`${p}.techStack`)}:
                                        </p>
                                        <ProjectCardTechStack
                                            technologies={t(`${p}.technologies`).split(" ~ ") as IconName[]}
                                            id={`${p}.technologies`}/>
                                    </div>
                                    <div className={styles.box}>
                                        <p id={`${p}.url`}>
                                            URL: <a href={t(`${p}.url`)} target={"_blank"}
                                                    className={styles.url}>{t(`${p}.url`)}</a>
                                        </p>
                                        <p id={`${p}.creationDate`}>
                                            {t(`${p}.creationDate`)}
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
