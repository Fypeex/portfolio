import {createContext, useContext, useEffect, useState} from "react";

export type Theme = "light" | "dark";


export interface IThemeContext {
    theme: Theme;
    setTheme: (theme: Theme) => void;
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
    console.log("ThemeProvider rendered", document.cookie.split("; ").find(row => row.startsWith("theme="))?.split("=")[1]);
    const [theme, setTheme] = useState<Theme>(
        document.cookie.split("; ").find(row => row.startsWith("theme="))?.split("=")[1] as Theme || "dark");

    useEffect(() => {
        document.documentElement.style.colorScheme = theme;
        document.cookie = `theme=${theme}; path=/; max-age=31536000; SameSite=Lax;`;
        console.log("Theme set to:", theme, document.cookie);
    }, [theme]);


    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}