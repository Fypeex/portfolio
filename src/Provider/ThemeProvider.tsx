import {createContext, useContext, useEffect, useState} from "react";
import i18n from "../i18n.ts";

export type Theme = "light" | "dark";


export interface IThemeContext {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    language: string;
    setLanguage: (language: string) => void;
}

export const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}

export default function ThemeProvider({children}: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<string>(
        document.cookie.split("; ").find(row => row.startsWith("language="))?.split("=")[1] || navigator.language.split("-")[0]
    );
    const [theme, setTheme] = useState<Theme>(
        document.cookie.split("; ").find(row => row.startsWith("theme="))?.split("=")[1] as Theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    );


    console.log("Default theme: ", document.cookie.split("; ").find(row => row.startsWith("theme="))?.split("=")[1] as Theme , matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")

    useEffect(() => {
        document.documentElement.style.colorScheme = theme;
        document.cookie = `theme=${theme}; path=/; max-age=31536000; SameSite=Lax;`;
    }, [theme]);

    useEffect(() => {
        i18n.changeLanguage(language);
        document.cookie = `language=${language}; path=/; max-age=31536000; SameSite=Lax;`;
    }, [language]);



    return (
        <ThemeContext.Provider value={{theme, setTheme, language, setLanguage}}>
            {children}
        </ThemeContext.Provider>
    );
}