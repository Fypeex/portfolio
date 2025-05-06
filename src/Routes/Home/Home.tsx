// Home.tsx
import {motion} from "framer-motion";
import {FaArrowRight} from "react-icons/fa6";
import CustomLink from "../../CustomLink.tsx";
import styles from "./Home.module.css";
import {useEffect, useRef} from "react";
import ThemeSwitch from "../../Components/ThemeSwitch/ThemeSwitch.tsx";
import {Trans, useTranslation} from "react-i18next";

const btn = (d: number) => ({
    initial: "hidden",
    animate: "show",
    viewport: {once: true},
    whileHover: "hover",
    whileTap: "tap",
    className: styles.button,
    variants: {
        hidden: {opacity: 0, x: 200},
        show: {opacity: 1, x: 0, transition: {duration: .8, ease: "easeOut", delay: d}},
        tap: {scale: .95}
    }
});

export default function Home() {
    const waveEmojiRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<number | null>(null);

    const highfive = () => {
        if (!waveEmojiRef.current) return;
        waveEmojiRef.current.classList.add(styles.highFive);
        waveEmojiRef.current.addEventListener('animationend', () => {
            if (!waveEmojiRef.current) return;
            waveEmojiRef.current.classList.remove(styles.highFive);
        }, {once: true});
    }

    useEffect(() => {
        const wave = () => {
            if (!waveEmojiRef.current) return;
            waveEmojiRef.current.classList.toggle(styles.waving, true);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                if (!waveEmojiRef.current) return;
                waveEmojiRef.current.classList.toggle(styles.waving, false);
            }, 1000);
        }

        window.addEventListener("pointermove", wave);


        return () => {
            window.removeEventListener("pointermove", wave);
        }

    }, []);
    const {t} = useTranslation(undefined, {useSuspense: true});

    return (
        <motion.main className={styles.container}>
            <ThemeSwitch
                position={{
                    top: "2rem",
                    right: window.innerWidth > 768 ? "4rem" : "-2rem",
                }}
            />
            <section className={styles.info}>
                <h1 className={styles.name} id={"home.name"}>{t("home.name")}</h1>
                <div className={styles.intro} id={"home.greeting"}>
                    {t("home.greeting")}
                    <div ref={waveEmojiRef} className={styles.emoji}
                         onClick={highfive}
                    >👋
                    </div>
                </div>
                <p className={styles.subintro}
                   id={"home.introduction"}
                >{t("home.introduction")}</p>
                <Trans
                    i18nKey="home.description"
                    components={{
                        a: <a href={"https://www.ethz.ch"} target={"_blank"} rel={"noopener noreferrer"}/>,
                        p: <p className={styles.personal}></p>
                    }}
                    values={{
                        age: new Date(Date.now() - new Date("2003-04-26").getTime()).getFullYear() - 1970
                    }}
                />
            </section>

            <motion.section className={styles.about}>
                <h2 id={"home.aboutTitle"}>{t("home.aboutTitle")}</h2>
                <motion.button {...btn(.3)}>
                    <CustomLink href="/about" className={styles.buttonLink} id={"home.aboutSub"}>
                        {t("home.aboutSub")}
                    </CustomLink>
                    <FaArrowRight className={styles.buttonIcon}/>
                </motion.button>
            </motion.section>

            <motion.section className={styles.projects}>
                <h2 id={"home.projectsTitle"}>{t("home.projectsTitle")}</h2>
                <motion.button {...btn(.5)}>
                    <CustomLink href="/projects" className={styles.buttonLink} id={"home.projectsSub"}>
                        {t("home.projectsSub")}
                    </CustomLink>
                    <FaArrowRight className={styles.buttonIcon}/>
                </motion.button>
            </motion.section>

            <motion.section className={styles.contact}>
                <h2 id={"home.contactTitle"}>{t("home.contactTitle")}</h2>
                <motion.button {...btn(.6)}>
                    <CustomLink href="/contact" className={styles.buttonLink} id={"home.contactSub"}>
                        {t("home.contactSub")}
                    </CustomLink>
                    <FaArrowRight className={styles.buttonIcon}/>
                </motion.button>
            </motion.section>
        </motion.main>
    );
}
