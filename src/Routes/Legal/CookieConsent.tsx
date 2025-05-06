import React, {ForwardedRef, useEffect, useImperativeHandle} from "react";
import {useTranslation} from "react-i18next";
import styles from "./Legal.module.css"

export default function CookieConsent({
                                          ref
                                      }: {
    ref: ForwardedRef<{
        reset: () => void
    }>
}) {
    const [show, setShow] = React.useState(false);
    const {t} = useTranslation(undefined, {useSuspense: true});

    useEffect(() => {
        const cookies = document.cookie.split(';');

        let firstvisited = false;
        let accepted = false;

        cookies.forEach(cookie => {
            const [name, value] = cookie.split('=');
            if (name.trim() === 'firstvisited') {
                firstvisited = value === 'true';
            }
            if (name.trim() === 'accepted') {
                accepted = value === 'true';
            }
        });

        if (!firstvisited) {
            setShow(true);
            document.cookie = "firstvisited=true; path=/";
        }
        setShow(!accepted);
    }, []);


    const reset = () => {
        document.cookie = `accepted=false; path=/`;
        setShow(true);
    }

    const acceptCookies = () => {
        document.cookie = `accepted=true; path=/`;
        setShow(false);
    }

    useImperativeHandle(ref, () => ({
        reset
    }));

    return show ? (
        <>
            <div className={styles.cookies_backdrop}/>
            <div className={styles.cookies}>
                <p>
                    {t("cookie1")}
                </p>
                <label>
                    <input type="checkbox" checked disabled/>
                    {t("cookie2")}
                </label>
                <button className={styles.cookieButton} onClick={() => acceptCookies()}>
                    {t("cookieAccept")}
                </button>
            </div>
        </>
    ) : null;

}
