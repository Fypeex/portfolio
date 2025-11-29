import styles from './Header.module.css';
import {Ref, useSearchContext} from "../../Provider/SearchProvider.tsx";
import {useEffect, useRef, useState} from "react";
import {IoSearch} from "react-icons/io5";
import {useKeypressContext} from "../../Provider/KeypressProvider.tsx";
import {buildRe} from "../../util/content.ts";
import CustomLink from "../../CustomLink.tsx";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch.tsx";
import {useTranslation} from "react-i18next";

export default function Header() {
    const {query} = useSearchContext();
    const {registerKeypress, unregisterKeypress} = useKeypressContext();
    const [value, setValue] = useState<string>("");

    const [results, setResults] = useState<Ref[]>([]);
    const searchbarRef = useRef<HTMLInputElement>(null);

    const {t} = useTranslation(undefined, {useSuspense: true});
    useEffect(() => {
        if (!value || value.length < 2) {
            setResults([]);
            return;
        }

        const results = query(value);
        setResults(results);
    }, [query, value]);


    useEffect(() => {
        const handleKeypress = () => {
            if (searchbarRef.current) {
                searchbarRef.current.blur()
                setOpen(false);
            }
            setValue("");
            setResults([]);
        }

        registerKeypress("Escape", handleKeypress);

        return () => {
            unregisterKeypress("Escape");
        }
    }, [registerKeypress, unregisterKeypress]);

    const [open, setOpen] = useState(false);

    return (
        <header className={styles.header}>
            <div className={styles.backdrop} onClick={() => setOpen(false)}/>
            {open && (
                <>
                    <div>
                        <IoSearch className={styles.searchIconCenter}/>
                        <input type={"text"} value={value}
                               className={styles.searchbarCenter}
                               placeholder="Search..."
                               onChange={(e) => setValue(e.target.value)}
                               autoFocus={true}
                               ref={searchbarRef}
                        />
                    </div>
                    <div className={styles.results}>
                        {
                            value.length > 2 && results.length == 0 && (
                                <div className={styles.noResults}>
                                    <h4>No results found</h4>
                                    <p>Try searching for something else</p>
                                </div>
                            )

                        }
                        {results.map((result, index) => {
                            const text = result.text.replace(
                                buildRe(value),
                                `<span class=${styles.highlight}>$1</span>`
                            );
                            return index > 4 ? null : (
                                <CustomLink
                                    href={result.url}
                                    key={index}
                                    className={styles.resultItem}
                                    onClick={() => {
                                        setValue("");
                                        setResults([]);
                                        setOpen(false);
                                    }}
                                >
                                    <span className={styles.resultInfo}>
                                        <p className={styles.resultTitle}>{result.title}</p>
                                        <p className={styles.url}>{result.url}</p>
                                    </span>
                                    <p className={styles.resultDescription} dangerouslySetInnerHTML={{__html: text}}/>
                                </CustomLink>
                            )
                        })}
                    </div>
                </>
            )
            }
            <nav className={styles.navbar}>
                <div className={styles.navItem}>
                    <CustomLink href="/">Home</CustomLink>
                </div>
                <div className={styles.navItem}>
                    <CustomLink href="/about">{t("about.aboutTitle")}</CustomLink>
                </div>
                <div className={styles.navItem}>
                    <CustomLink href="/projects">{t("projects.title")}</CustomLink>
                </div>
                <div className={styles.navItem}>
                    <CustomLink href="/contact">{t("contact.title")}</CustomLink>
                </div>
            </nav>
            <div className={styles.antiNav}>
                <div className={styles.searchbarWrapper}>
                    <IoSearch className={styles.searchIcon}/>
                    <input type={"text"} value={value}
                           className={styles.searchbar}
                           placeholder="Search..."
                           ref={searchbarRef}
                           onFocus={() => setOpen(true)}
                    />
                </div>
                <ThemeSwitch/>
            </div>
        </header>
    )
}