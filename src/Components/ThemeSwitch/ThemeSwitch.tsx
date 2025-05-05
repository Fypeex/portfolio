import {motion, useAnimation} from "framer-motion";
import {IoMoonOutline, IoSunny} from "react-icons/io5";
import {useEffect, useState} from "react";
import styles from "./ThemeSwitch.module.css";
import Tooltip from "../Tooltip/Tooltip.tsx";
import {useTheme} from "../../Provider/ThemeProvider.tsx";

export default function ThemeSwitch({
                                        position
                                    }: {
    position?: {
        top?: number | string;
        left?: number | string;
        right?: number | string;
        bottom?: number | string;
    }
}) {
    const controls = useAnimation();
    const {theme, setTheme} = useTheme();
    const [checked, setChecked] = useState(
        theme === "dark"
    );

    useEffect(() => {
        setTheme(checked ? "dark" : "light");
        controls.start(checked ? 'sun' : 'moon');
    }, [checked, controls, setTheme]);


    return (
        <>
            <div className={styles.switch} style={{
                top: position?.top,
                left: position?.left,
                right: position?.right,
                bottom: position?.bottom,
                position: position ? "absolute" : "relative",
            }}>
                <div className={styles.ofProtect}>
                    <motion.div
                        variants={{
                            sun: {
                                y: 0,
                            },
                            moon: {
                                y: 150,
                            },
                            hover: {
                                y: checked ? 25: 150,
                            }
                        }}
                        animate={controls}
                        transition={{
                            duration: 0.75,
                            ease: "easeOut",
                        }}
                        className={styles.iconDiv}
                    >
                        <IoSunny size={40} className={styles.sunIcon}/>
                    </motion.div>

                    <motion.div
                        variants={{
                            sun: {
                                y: 150,
                            },
                            moon: {
                                y: 0,
                            },
                            hover: {
                                y: checked ? 150 : 25,
                            }
                        }}
                        animate={controls}
                        transition={{
                            duration: 0.75,
                            ease: "easeOut",
                        }}
                        className={styles.iconDiv}
                    >
                        <IoMoonOutline size={40} className={styles.moonIcon}/>
                    </motion.div>
                    <input type="checkbox" id="switch" className={styles.switchInput}
                           onChange={() => {
                               setChecked(!checked);
                           }}
                           onMouseOver={() => {
                               controls.start("hover");
                           }}
                           onMouseLeave={() => {
                               controls.start(checked ? "sun" : "moon");
                           }}
                    />
                    <div className={styles.strokes}/>
                </div>
                <Tooltip name={checked ? "Light Mode" : "Dark Mode"} position={"bottom"}/>
            </div>
        </>
    )
}