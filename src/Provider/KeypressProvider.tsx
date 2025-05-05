import {createContext, useContext} from "react";

export interface IKeypressContext {
    registerKeypress: (key: string, callback: () => void) => void;
    unregisterKeypress: (key: string) => void;
}

const KeypressContext = createContext<IKeypressContext>({} as IKeypressContext);

export const useKeypressContext = () => {
    const ctx = useContext(KeypressContext);
    if (!ctx) {
        throw new Error("useKeypressContext must be used within a KeypressProvider");
    }
    return ctx;
}

export const KeypressProvider = ({children}: { children: React.ReactNode }) => {
    const registerKeypress = (key: string, callback: () => void) => {
        // Register the keypress event
        window.addEventListener("keydown", (event) => {
            if (event.key === key) {
                callback();
            }
        });
    }

    const unregisterKeypress = (key: string) => {
        // Unregister the keypress event
        window.removeEventListener("keydown", (event) => {
            if (event.key === key) {
                // Do nothing
            }
        });
    }

    return (
        <KeypressContext.Provider value={{registerKeypress, unregisterKeypress}}>
            {children}
        </KeypressContext.Provider>
    )
}