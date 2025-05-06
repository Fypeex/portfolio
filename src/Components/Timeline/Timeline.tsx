import {motion, useAnimation} from "framer-motion";
import styles from "./Timeline.module.css";
import {useCallback, useEffect, useState} from "react";
import {useKeypressContext} from "../../Provider/KeypressProvider.tsx";
import {Trans, useTranslation} from "react-i18next";


export default function Timeline({
                                     entries,
                                     title
                                 }: {
    entries: {
        date: string;
        title: string;
        summary: string;
        details: string;
    }[],
    title: string
}) {
    const [zoomedEntry, setZoomedEntry] = useState<number | null>(null);
    const {registerKeypress, unregisterKeypress} = useKeypressContext();
    const controls = useAnimation();

    const zoomedVariant1 = useCallback((index: number) => ({
        left: index % 2 ? "2%" : "unset",
        right: index % 2 ? "unset" : "2%",
        width: "calc(100% - 10px)",
        textAlign: ((index % 2 === 1) ? "left" : "right") as CanvasTextAlign,
        opacity: 1,
        transition: {
            duration: 1,
            ease: "easeInOut",
        }
    }), []);

    const zoomedVariant2 = useCallback((index: number) => ({
        left: index % 2 === 1 ? "-100%" : "unset",
        right: index % 2 === 0 ? "-100%" : "unset",
        textAlign: ((index % 2 === 1) ? "left" : "right") as CanvasTextAlign,
        width: "calc(50% - 10px)",
        opacity: 0,
        height: "0px"
    }), []);

    useEffect(() => {
        if (zoomedEntry === null) {
            controls.start("normal");
            return;
        }

        controls.start("zoomed")
    }, [controls, zoomedEntry]);

    useEffect(() => {
        const handleKeyPress = () => {
            setZoomedEntry(null)
        }

        registerKeypress("Escape", handleKeyPress);

        return () => {
            unregisterKeypress("Escape");
        }
    }, [registerKeypress, unregisterKeypress]);

    const {t} = useTranslation(undefined, {useSuspense: true});

    return (
        <motion.div
            className={styles.timeline}
            initial="hidden"
            variants={{
                "normal": {
                    alignItems: "center",
                    opacity: 1,
                    y: 0
                },
                "hidden": {
                    opacity: 0,
                    y: 20
                },
            }}
            animate={controls}
            whileInView={"normal"}
            viewport={{once: true}}
            transition={{duration: 0.5, delay: 2.5}}
        >
            <h2 className={styles.title} id={`${title}.title`}>
                {title}
            </h2>
            <motion.div className={styles.timelineWrapper}
                        initial="hidden"
                        whileInView="normal"
                        animate={controls}
            >
                <motion.div className={styles.timelineline}
                            initial="hidden"
                            animate={controls}
                            variants={{
                                "zoomed": {
                                    left: zoomedEntry! % 2 === 0 ? "calc(100% - 2px)" : "0%",
                                },
                                "normal": {
                                    left: "50%"
                                }
                            }}
                            transition={{duration: 1, ease: "easeInOut"}}
                />
                {
                    entries.map((entry, index) => {
                        const isZoomed = zoomedEntry === index;
                        return (
                            <>
                                <motion.div
                                    key={entry.date}
                                    className={`${styles.entry} ${isZoomed ? styles.zoomed : ""}`}
                                    onClick={() => {
                                        setZoomedEntry(index);
                                    }}
                                    initial={"normal"}
                                    animate={zoomedEntry === null ? "normal" : "zoomed"}
                                    variants={{
                                        "zoomed": isZoomed ? {...zoomedVariant1(index)} : {...zoomedVariant2(index)},
                                        "normal": {
                                            opacity: 1,
                                            left: (index % 2 === 1) ? "50%" : "0%",
                                            transition: {
                                                duration: 1,
                                                ease: "easeInOut",
                                            },
                                            textAlign: (index % 2 === 1) ? "left" : "right",
                                            width: "calc(50% - 10px)",
                                            marginLeft: (index % 2 === 1) ? "10px" : "0",
                                            marginRight: (index % 2 === 1) ? "0" : "10px",
                                            height: "auto",
                                            overflow: "visible",
                                        },
                                        "hidden": {
                                            opacity: 0,
                                            y: 20
                                        },
                                    }}

                                    transition={{duration: 0.5}}
                                >
                                    <div className={styles.coloredBorder}>
                                        <div>
                                            {
                                                isZoomed && (
                                                    <motion.button
                                                        variants={{
                                                            "zoomed": {
                                                                left: index % 2 === 0 ? "unset" : "0%",
                                                                right: index % 2 === 0 ? "0%" : "unset",
                                                                opacity: 1
                                                            },
                                                            "normal": {
                                                                left: index % 2 === 1 ? "0%" : "unset",
                                                                right: index % 2 === 0 ? "0%" : "unset",
                                                                opacity: 1
                                                            }
                                                        }}
                                                        initial={"normal"}
                                                        animate={controls}
                                                        transition={{duration: 1, ease: "easeInOut"}}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setZoomedEntry(null)
                                                        }}
                                                        className={styles.backButton}
                                                    >
                                                        {t("back")}
                                                    </motion.button>
                                                )
                                            }
                                            <div>
                                                <h5 id={entry.date}
                                                    className={styles.date}>
                                                    {t(entry.date)}
                                                </h5>
                                            </div>
                                            <div>
                                                <h4 id={entry.title}
                                                    className={styles.details}>
                                                    {t(entry.title)}
                                                </h4>
                                                <Trans
                                                    t={t}
                                                    i18nKey={entry.summary}
                                                    components={{
                                                        "p": <p/>,
                                                        "ul": <ul/>,
                                                        "li": <li/>
                                                    }}
                                                />
                                                {isZoomed && (
                                                    <div className={styles.detailsExpanded}>
                                                        <Trans
                                                            t={t}
                                                            i18nKey={entry.details}
                                                            components={{
                                                                "p": <p/>,
                                                                "ul": <ul/>,
                                                                "li": <li/>
                                                            }}
                                                        />
                                                    </div>

                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </>
                        )
                    })
                }
            </motion.div>
        </motion.div>
    )
}