import {FormEvent, ReactElement, useEffect, useRef, useState} from "react";
import {motion} from "framer-motion";
import styles from "./Contact.module.css";
import {FaCheckCircle, FaEnvelope,} from "react-icons/fa";
import TechStackIcon, {IconName} from "../Projects/TechStackIcon.tsx";
import emailjs from "@emailjs/browser"
import {IoCloseCircle} from "react-icons/io5";
import {useLocation} from "react-router";
import {useTranslation} from "react-i18next";

interface Social {
    name: string;
    url: string;
    icon: ReactElement;
}


export default function Contact() {
    const {t} = useTranslation(undefined, {useSuspense: true});

    const socials: Social[] = [
        {
            name: "GitHub",
            url: "https://github.com/Fypeex",
            icon: <TechStackIcon name={t("contact.gh") as IconName}/>
        },
        {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/felix-jungbluth-8b0a1b1a4/",
            icon: <TechStackIcon name={t("contact.li") as IconName}/>,
        },
        {
            name: "Twitter",
            url: "https://twitter.com/Fypeex",
            icon: <TechStackIcon name={t("contact.tw") as IconName}/>,
        },
        {
            name: "Email",
            url: "mailto:f.jungbluth@protonmail.com",
            icon: <FaEnvelope size={38} id={"contact.em"}/>,
        },
    ];

    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText("f.jungbluth@protonmail.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [failed, setFailed] = useState(false);

    const formRef = useRef<HTMLFormElement>(null);
    const submitButtonRef = useRef<HTMLButtonElement>(null);


    const location = useLocation();


    useEffect(() => {
        if (location.state && location.state.scrollTo) {
            const element = document.getElementById(location.state.scrollTo);
            if (element) {
                element.scrollIntoView({behavior: "smooth"});
            }

            // Clear the state to prevent scrolling again on refresh
            const to = location.state.scrollTo;
            location.state.scrollTo = location.state.scrollFrom;
            location.state.scrollFrom = to;
        }
    }, [location.state]);

    useEffect(() => {
        let t: NodeJS.Timeout | undefined;

        if ((success || failed)) {
            setLoading(false);
            t = setTimeout(() => {
                setSuccess(false);
                setFailed(false);
            }, 3000);
        }

        return () => {
            if (t) clearTimeout(t);
        }
    }, [success, failed, loading]);


    const showLoading = () => {
        setLoading(true);
        setSuccess(false);
        setFailed(false);
    }

    const showSuccess = () => {
        setLoading(false);
        setSuccess(true);
        setFailed(false);
    }

    const showFailure = () => {
        setLoading(false);
        setSuccess(false);
        setFailed(true);
    }

    const submitForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!formRef.current) return;

        if (!formRef.current.checkValidity()) {
            formRef.current.reportValidity();
            return;
        }

        showLoading();
        emailjs
            .sendForm(
                "service_lvo8t9f",
                "template_uwesnhz",
                formRef.current,
                "iaC7RHqvAFg_T4yfn"
            )
            .then(
                (result) => {
                    console.log(result.text);
                    formRef.current?.reset();
                    showSuccess();
                },
                (error) => {
                    console.log(error.text);
                    showFailure();
                }
            );
    }

    return (
        <motion.main
            className={styles.container}
            initial={{opacity: 0, y: 30}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -30}}
            transition={{duration: 0.5, ease: "easeOut", delay: 2}}
        >
            <div className={styles.boxes}>
                <div className={styles.coloredBorder}>
                    <div className={styles.box}>
                        <motion.section className={styles.formSection}
                        >
                            <h2 className={styles.sectionTitle}
                                id={"contact.messageMe"}>
                                {t("contact.messageMe")}
                            </h2>
                            <motion.form
                                className={styles.form}
                                onSubmit={submitForm}
                                ref={formRef}
                                initial="hidden"
                                whileInView="show"
                                viewport={{once: true}}
                                variants={{
                                    hidden: {opacity: 0},
                                    show: {
                                        opacity: 1,
                                        transition: {staggerChildren: 0.1, delayChildren: 2.8},
                                    },
                                }}
                            >
                                <motion.div className={styles.field}
                                            variants={{
                                                hidden: {opacity: 0, y: 10},
                                                show: {opacity: 1, y: 0}
                                            }}
                                >
                                    <input id="name" name="name" required placeholder=" "/>
                                    <label htmlFor="name" id={"contact.name"}>{t("contact.name")}</label>
                                </motion.div>
                                <motion.div className={styles.field}
                                            variants={{
                                                hidden: {opacity: 0, y: 10},
                                                show: {opacity: 1, y: 0}
                                            }}
                                >
                                    <input
                                        id="email"
                                        name="email"
                                        required
                                        type="email"
                                        placeholder=" "
                                    />
                                    <label htmlFor="email" id={"contact.email"}>{t("contact.email")}</label>
                                </motion.div>
                                <motion.div className={styles.field}
                                            variants={{
                                                hidden: {opacity: 0, y: 10},
                                                show: {opacity: 1, y: 0}
                                            }}
                                >
                                    <textarea id="msg" name="message" rows={5} required placeholder=" "></textarea>
                                    <label htmlFor="msg" id={"contact.message"}>{t("contact.message")}</label>
                                </motion.div>
                                <motion.button
                                    type="submit"
                                    ref={submitButtonRef}
                                    className={styles.button}
                                    whileHover={{y: -2}}
                                    whileTap={{y: 0}}
                                    variants={{
                                        hidden: {opacity: 0, y: 10},
                                        show: {opacity: 1, y: 0}
                                    }}
                                    id={"contact.send"}
                                >
                                    <span className={styles.buttonLink}>
                                    {
                                        loading && t("sending") ||
                                        success && t("success") ||
                                        failed && t("failed") ||
                                        t("contact.send")
                                    }
                                        {
                                            loading && (
                                                <span className={styles.loader}/>
                                            )
                                        }{
                                        success && (
                                            <FaCheckCircle className={styles.success} size={20}/>
                                        )

                                    }{
                                        failed && (
                                            <IoCloseCircle className={styles.failed} size={20}/>
                                        )
                                    }
                                </span>
                                </motion.button>
                            </motion.form>
                        </motion.section>
                    </div>

                </div>
                <div className={styles.coloredBorder}>
                    <div className={styles.box}>
                        <section className={styles.hero}>
                            <motion.h2
                                className={styles.sectionTitle}
                                initial={{opacity: 0, y: 10}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 0.1}}
                                id={"contact.social"}
                            >{t("contact.social")}</motion.h2>
                            <motion.button
                                className={styles.button}
                                onClick={handleCopy}
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                            >
                                <span
                                    className={styles.buttonLink}
                                    id={"contact.copyMail"}
                                >{copied ? t("copied"):t("contact.copyMail")}</span>
                            </motion.button>
                        </section>

                        <motion.section
                            className={styles.socials}
                            initial="hidden"
                            whileInView="show"
                            viewport={{once: true}}
                            variants={{
                                hidden: {opacity: 0},
                                show: {
                                    opacity: 1,
                                    transition: {staggerChildren: 0.1, delayChildren: 2.8},
                                },
                            }}
                        >
                            {socials.map((s) => (
                                <motion.a
                                    key={s.name}
                                    href={s.url}
                                    className={styles.socialBtn}
                                    target="_blank"
                                    rel="noreferrer"
                                    variants={{hidden: {opacity: 0, y: 10}, show: {opacity: 1, y: 0}}}
                                    whileHover={{y: -2}}
                                >
                                    {s.icon}
                                    <span>{s.name}</span>
                                </motion.a>
                            ))}
                        </motion.section>
                    </div>
                </div>
            </div>
        </motion.main>
    );
}