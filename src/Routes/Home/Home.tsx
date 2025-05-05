// Home.tsx
import {motion} from "framer-motion";
import {FaArrowRight} from "react-icons/fa6";
import CustomLink from "../../CustomLink.tsx";
import styles from "./Home.module.css";
import {useEffect, useRef} from "react";
import ThemeSwitch from "../../Components/ThemeSwitch/ThemeSwitch.tsx";

const btn = (d: number) => ({
    initial: "hidden",
    whileInView: "show",
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

    return (
        <motion.main className={styles.container}>
           <ThemeSwitch
                position={{
                    top: "2rem",
                    right: "4rem",
                }}
           />
            <section className={styles.info}>
                <h1 className={styles.name}>Felix Jungbluth</h1>
                <div className={styles.intro}>Hi and nice to meet you!
                    <div ref={waveEmojiRef} className={styles.emoji}
                         onClick={highfive}
                    >👋
                    </div>
                </div>
                <p className={styles.subintro}>Let me introduce myself</p>
                <p className={styles.personal}>I am a {
                    new Date(Date.now() - new Date("2003-04-26").getTime()).getFullYear() - 1970
                } year old Computer Science student with a passion for everything that involves computers</p>
                <p className={styles.personal}>Currently I am studying at <a href="https://www.ethz.ch/" target="_blank"
                                                                             rel="noopener noreferrer">ETH Zürich</a> in
                    Switzerland.</p>
                <p className={styles.personal}>My main focus is on Software Engineering, Web Development and Machine
                    Learning. But I am always eager to learn new things.</p>
            </section>

            <motion.section className={styles.about}>
                <h2>Find out more about me</h2>
                <motion.button {...btn(.3)}>
                    <CustomLink href="/about" className={styles.buttonLink}>
                        About Me
                    </CustomLink>
                    <FaArrowRight className={styles.buttonIcon}/>
                </motion.button>
            </motion.section>

            <motion.section className={styles.projects}>
                <h2>Explore my projects</h2>
                <motion.button {...btn(.5)}>
                    <CustomLink href="/projects" className={styles.buttonLink}>
                        Projects
                    </CustomLink>
                    <FaArrowRight className={styles.buttonIcon}/>
                </motion.button>
            </motion.section>

            <motion.section className={styles.contact}>
                <h2>Get in touch</h2>
                <motion.button {...btn(.6)}>
                    <CustomLink href="/contact" className={styles.buttonLink}>
                        Contact
                    </CustomLink>
                    <FaArrowRight className={styles.buttonIcon}/>
                </motion.button>
            </motion.section>
        </motion.main>
    );
}
