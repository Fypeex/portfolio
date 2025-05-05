import {createRoot} from 'react-dom/client'
import './index.css'
import './ColorScheme/scheme.css'
import App from './App.tsx'
import {SearchProvider} from "./Provider/SearchProvider.tsx";
import {KeypressProvider} from "./Provider/KeypressProvider.tsx";
import ThemeProvider from "./Provider/ThemeProvider.tsx";

createRoot(document.getElementById('root')!).render(
    <ThemeProvider>
        <KeypressProvider>
            <SearchProvider>
                <App/>
            </SearchProvider>
        </KeypressProvider>
    </ThemeProvider>
)
