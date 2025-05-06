import styles from './Footer.module.css';
import TechStackIcon from "../../Routes/Projects/TechStackIcon.tsx";
import {useTheme} from "../../Provider/ThemeProvider.tsx";

export default function Footer() {
    const {language, setLanguage} = useTheme()

    console.log(language)


    return (
        <footer className={styles.coloredBorder}>
            <div className={styles.footer}>
                <p className={styles.copy}>© {new Date().getFullYear()} — Felix Jungbluth</p>

                <nav className={styles.social}>
                    <a href="https://github.com/your-handle" aria-label="GitHub" target="_blank" rel="noreferrer">
                        <TechStackIcon name={"GitHub"} size={40}/>
                    </a>

                    <a href="https://linkedin.com/in/your-handle" aria-label="LinkedIn" target="_blank"
                       rel="noreferrer">
                        <TechStackIcon name={"LinkedIn"} size={40}/>
                    </a>
                </nav>

                <div className={styles.languageSelector}>
                    <span
                        className={language === "en" ? styles.activeLanguage : styles.language}
                        onClick={() => {
                            setLanguage("en")
                        }}>en</span>
                    <span
                        className={language === "de" ? styles.activeLanguage : styles.language}
                        onClick={() => {
                            setLanguage("de")
                        }}>de</span>
                </div>
            </div>
        </footer>
    )
}
