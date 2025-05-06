import {useTheme} from "../../Provider/ThemeProvider.tsx";

export default function Impressum() {
    const {language} = useTheme()

    if(language === "en") {
        return (
            <div id={"imprint.text"}>
                <h1>Legal Notice</h1>
                <p>Felix Jungbluth<br/>
                    Kaiserstuhlstrasse 17/1<br/>
                    79276 Reute <br/>
                Germany</p>
                <h2>Contact</h2>
                <p>Phone: +41782557078<br/>
                    Email: fjungbluth10@gmail.com</p>
                <h2>Responsible for content</h2>
                <p>Felix Jungbluth</p>
            </div>
        )
    }

    return (
        <div id={"imprint.text"}>
            <h1>Impressum</h1>
            <p>Felix Jungbluth<br/>
                Kaiserstuhlstrasse 17/1<br/>
                79276 Reute <br/>
            Deutschland</p>
            <h2>Kontakt</h2>
            <p>Telefon: +41782557078<br/>
                E-Mail: fjungbluth10@gmail.com</p>
            <h2>Redaktionell verantwortlich</h2>
            <p>Felix Jungbluth</p>
        </div>
    )
}