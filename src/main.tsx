import {createRoot} from 'react-dom/client'
import './index.css'
import './ColorScheme/scheme.css'
import App from './App.tsx'
import {SearchProvider} from "./Provider/SearchProvider.tsx";
import {KeypressProvider} from "./Provider/KeypressProvider.tsx";
import ThemeProvider from "./Provider/ThemeProvider.tsx";
import i18n from "./i18n.ts";
import {I18nextProvider} from "react-i18next";

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/portfolio/sw.js', {
            scope: "/portfolio/",
        });
    });
}


createRoot(document.getElementById('root')!).render(
    <ThemeProvider>
        <I18nextProvider i18n={i18n}>
        <KeypressProvider>
            <SearchProvider>
                <App/>
            </SearchProvider>
        </KeypressProvider>
        </I18nextProvider>
    </ThemeProvider>
)
