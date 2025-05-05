// TransitionProvider.tsx
import {createContext, useContext, useEffect} from 'react';
import {motion, useAnimation} from 'framer-motion';
import {useLocation} from "react-router";

type Trigger = () => Promise<void>;

interface ICurtainContext {
    runExit: Trigger;
    runOpen: Trigger;
}

const CurtainContext = createContext<ICurtainContext>({} as ICurtainContext);

export const useCurtainContext = () => {
    const ctx = useContext(CurtainContext);
    if (!ctx) {
        throw new Error("useCurtainContext must be used within a TransitionProvider");
    }
    return ctx;
}

export function CurtainProvider({children}: { children: React.ReactNode }) {
    const controls = useAnimation();
    const location = useLocation();


    const runExit: Trigger = () => controls.start('closed');
    const runOpen: Trigger = () => controls.start('open');

    useEffect(() => {
        setTimeout(() => controls.start('open'), 300);
    }, [controls,location]);

    return (
        <CurtainContext.Provider value={{runExit, runOpen}}>
            <motion.div
                className={"curtain"}
                initial={"closed"}
                animate={controls}
                variants={{
                    closed: {
                        transition: {
                            staggerChildren: 0.1,
                            staggerDirection: -1,
                        }
                    },
                    open: {
                        transition: {
                            staggerChildren: 0.25,
                        }
                    },
                }}
            >
                {
                    [0, 0, 0, 0, 0, 0].map((_, i) => (
                        <motion.div
                            key={i}
                            className={"curtain-item"}
                            variants={{
                                closed: {
                                    x: 0,
                                    transition: {
                                        duration: 0.1,
                                        ease: "easeInOut",
                                    }
                                },
                                open: {
                                    x: "-100%",
                                    transition: {
                                        duration: 0.5,
                                        ease: "easeInOut",
                                    }
                                },
                            }}

                        />
                    ))
                }

            </motion.div>
            {children}
        </CurtainContext.Provider>
    );
}
