import {useRef} from 'react';
import {createPortal} from 'react-dom';
import {useTheme} from '../../Provider/ThemeProvider.tsx';
import {useTranslation} from 'react-i18next';
import CookieConsent from '../../Routes/Legal/CookieConsent.tsx';
import TechStackIcon from '../../Routes/Projects/TechStackIcon.tsx';
import CustomLink from '../../CustomLink.tsx';
import styles from './Footer.module.css';


export default function Footer() {
    const {language, setLanguage} = useTheme();
    const {t} = useTranslation(undefined, {useSuspense: true});
    const cookieRef = useRef<{
        reset: () => void;
    }>(null);
    const handleReset = () => cookieRef.current?.reset();

    return (
        <>
            {createPortal(<CookieConsent ref={cookieRef}/>, document.body)}
            <footer className={styles.footer}>
                <div className={styles.grid}>
                    <section className={styles.section}>
                        <div className={styles.socialContainer} aria-label="Social links">
                            <a href={"https://github.com/Fypeex"}>
                                <TechStackIcon name="GitHub" size={36}/>
                            </a>
                            <a href={"https://www.linkedin.com/in/felix-jungbluth-8b0a1b1a4/"}>
                                <TechStackIcon name="LinkedIn" size={36}/>
                            </a>
                            <a href={"https://twitter.com/Fypeex"}>
                                <TechStackIcon name="Twitter" size={36}/>
                            </a>
                        </div>
                    </section>
                    <section className={styles.section}>
                        <div className={styles.legalContainer}>
                            <CustomLink href="/legal">
                                <span className={styles.legalText}>{t('datenschutzImpressum')}</span>
                            </CustomLink>
                            <button className={styles.resetBtn} onClick={handleReset} type="button">
                                {t('resetCookies')}
                            </button>
                        </div>
                    </section>
                    <section className={styles.section}>
                        <div className={styles.langContainer} role="group" aria-label="Language selector">
                            {['en', 'de'].map((lang) => (
                                <button
                                    key={lang}
                                    className={language === lang ? styles.activeLang : styles.langBtn}
                                    onClick={() => setLanguage(lang)}
                                    type="button"
                                >
                                    {lang.toUpperCase()}
                                </button>
                            ))}
                        </div>
                        <p className={styles.copy}>© {new Date().getFullYear()} Felix Jungbluth</p>
                    </section>
                </div>
            </footer>
        </>
    );
}