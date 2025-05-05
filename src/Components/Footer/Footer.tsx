import styles from './Footer.module.css';
import TechStackIcon from "../../Routes/Projects/TechStackIcon.tsx";

export default function Footer() {
    return (
        <footer className={styles.coloredBorder}>
            < div className={styles.footer}>
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
            </div>
        </footer>
    )
        ;
}
