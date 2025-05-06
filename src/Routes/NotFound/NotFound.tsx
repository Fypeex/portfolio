import styles from "./NotFound.module.css";
import {useTranslation} from "react-i18next";
import CustomLink from "../../CustomLink.tsx";

export default function NotFound() {
    const {t} = useTranslation(undefined, {useSuspense: true});

    return (
        <main>
            <div className={styles.notFoundContainer}>
                <div className={styles.notFoundBG}>
                    404
                </div>
                <div className={styles.notFoundText}>
                    {t("notFound")}
                </div>
                <button className={styles.button}>
                    <CustomLink
                        href={"/"}
                        className={styles.buttonLink}
                        onClick={() => window.scrollTo(0, 0)}
                    >
                        {t("goHome")}
                    </CustomLink>
                </button>
            </div>
        </main>
    )
}