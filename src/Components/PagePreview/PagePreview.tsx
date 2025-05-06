import {LayoutGroup, motion} from "framer-motion";
import styles from "./PagePreview.module.css";
import {useEffect, useMemo, useState} from "react";
import {IoClose} from "react-icons/io5";
import {FiExternalLink} from "react-icons/fi";
import {useKeypressContext} from "../../Provider/KeypressProvider.tsx";
import {createPortal} from "react-dom";
import {Trans, useTranslation} from "react-i18next";
import {useTheme} from "../../Provider/ThemeProvider.tsx";

export default function PagePreview({
                                        name
                                    }: {
    name: string
}) {
    const {registerKeypress, unregisterKeypress} = useKeypressContext();
    const {language} = useTheme();
    const [open, setOpen] = useState<boolean>(false);
    const {t, } = useTranslation(undefined, {useSuspense: true});
    useEffect(() => {
        if (open) {
            const closePreview = () => {
                setOpen(false);
            };
            registerKeypress("Escape", closePreview);
        } else {
            unregisterKeypress("Escape");
        }
    }, [open, registerKeypress, unregisterKeypress]);

    const additionalInfo = useMemo(() => {
        return t(`${name}.add`, {defaultValue: "", language})
    }, [name, t, language]);

    const Preview = () => (
        <>
            {
                open && <div className={styles.backdrop}
                             onClick={() => setOpen(false)}
                />
            }
            <motion.div
                layout
                layoutId={`page-preview-${name}`}
                className={`${styles.preview} ${open ? styles.active : ""}`}
                onClick={() => open || setOpen(true)}
            >
                <div className={open ? styles.bigPreviewContent : styles.smallPreviewContent}>
                    {
                        open && (
                            <div className={styles.previewInfo}>
                                <h4>{name}</h4>
                                <a href={t(`${name}.url`)} target={"_blank"} rel="noopener noreferrer">
                                    <p>{t(`${name}.url`)}</p>
                                </a>
                            </div>
                        )
                    }
                    {
                        open && additionalInfo && (
                            <div className={styles.previewAdditionalInfo}>
                                {
                                    <Trans
                                        i18nKey={`${name}.add`}
                                        components={{
                                            "p": <p/>
                                        }}
                                        defaultValue={""}
                                    />
                                }
                            </div>
                        )
                    }
                    <div className={styles.loading}/>
                    <iframe
                        src={t(`${name}.url`)}
                        className={`${styles.iframe} ${!open && styles.iframeOpen}`}
                        title="Preview"
                        loading="eager"
                    >
                    </iframe>
                </div>
                {
                    open && (
                        <div className={styles.buttonTray}>
                            <button className={`${styles.button} ${styles.enlargeButton}`}
                                    onClick={(() => {
                                        window.open(t(`${name}.url`), "_blank");
                                        setOpen(false);
                                    })}
                                    title={"Open in new tab"}
                            >
                                <FiExternalLink size={20} className={styles.icon}/>
                            </button>
                            <button className={`${styles.button} ${styles.enlargeButton}`}
                                    onClick={() => {
                                        setOpen(false)
                                    }}
                                    title={"Close"}
                            >
                                <IoClose size={20} className={styles.icon}/>
                            </button>
                        </div>
                    )
                }
            </motion.div>
        </>
    )

    return (
        <LayoutGroup>
            {!open && <Preview/>}
            {open && createPortal(<Preview/>, document.body)}
        </LayoutGroup>
    )
}