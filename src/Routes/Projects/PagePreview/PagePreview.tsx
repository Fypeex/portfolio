import {LayoutGroup, motion} from "framer-motion";
import styles from "./PagePreview.module.css";
import {useEffect, useState} from "react";
import {IoClose} from "react-icons/io5";
import {FiExternalLink} from "react-icons/fi";
import {useKeypressContext} from "../../../Provider/KeypressProvider.tsx";
import {createPortal} from "react-dom";

export default function PagePreview({
                                        src,
                                        name,
                                        additionalInfo
                                    }: {
    src: string,
    name: string,
    additionalInfo?: {
        [key: string]: string
    }
}) {
    const {registerKeypress, unregisterKeypress} = useKeypressContext();
    const [open, setOpen] = useState<boolean>(false);

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
                                <a href={src} target={"_blank"}>{src}</a>
                            </div>
                        )
                    }
                    {
                        open && additionalInfo && (
                            <div className={styles.previewAdditionalInfo}>
                                {
                                    Object.entries(additionalInfo).map(([key, value]) => {
                                        return <p>{key}: {value}</p>
                                    })
                                }
                            </div>
                        )
                    }
                    <div className={styles.loading}/>
                    <iframe
                        src={src}
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
                                        window.open(src, "_blank");
                                        setOpen(false);
                                    })}
                                    title={"Open in new tab"}
                            >
                                <FiExternalLink size={20} className={styles.icon}/>
                            </button>
                            <button className={`${styles.button} ${styles.closeButton}`}
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
            {!open && <Preview />}
            {open && createPortal(<Preview />, document.body)}
        </LayoutGroup>
    )
}