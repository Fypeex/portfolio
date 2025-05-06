import {createContext, ReactNode, useCallback, useContext, useEffect, useMemo} from "react";
import {buildRe, replaceUmlaut} from "../util/content.ts";
import {useTheme} from "./ThemeProvider.tsx";
import en from "../locales/en.json";
import de from "../locales/de.json";
import meta from "../locales/meta.json";

import {useTranslation} from "react-i18next";

const staticInterpolates = {
    age: new Date(Date.now() - new Date("2003-04-26").getTime()).getFullYear() - 1970
}


export interface ISearchContext {
    query: (query: string) => Ref[];
}

type RefBase = { page: string; title: string, url: string };
export type Ref = RefBase & { section: string, text: string };

const index: Map<string, Ref[]> = new Map();

const SearchContext = createContext<ISearchContext>({} as ISearchContext);

export const useSearchContext = () => {
    const ctx = useContext(SearchContext);
    if (!ctx) {
        throw new Error("useSearchContext must be used within a SearchProvider");
    }
    return ctx;
}

export const SearchProvider = ({children}: { children: ReactNode }) => {
    const {language} = useTheme();

    const {t, ready} = useTranslation(undefined, {useSuspense: true});

    const chunkify = useCallback((t: string): string[] => {
        const s = t.trim();
        return s.split(/[.,]/g)
    }, []);
    const tokenize = useCallback((t: string): string[] => {
        const s = t.trim();
        const normalized = s.split(/\s+/g)
            .map((token) => token.toLowerCase())
            .map((token) => token.replace(/[^a-zA-Z0-9äöüß]/g, ''))
            .map((token) => replaceUmlaut(token))
            .filter((token) => token.length > 0)
            .join(" ")

        //Sliding window of size 3
        const tokens = new Set<string>();
        for (let i = 0; i < normalized.length; i++) {
            const token = normalized.slice(i, i + 3);
            if (token.length === 3) {
                tokens.add(token);
            }
        }
        return Array.from(tokens);
    }, []);
    const add = useCallback((key: string, raw: string, base: RefBase) => {
        chunkify(raw)
            .forEach(piece => {
                const text = piece.trim();
                tokenize(text).forEach((token) => {
                    const ref: Ref = {
                        ...base,
                        section: key,
                        text: text
                    };

                    if (!index.has(token)) {
                        index.set(token, []);
                    }
                    index.get(token)!.push(ref);
                })
            });
    }, [chunkify, tokenize]);
    const query = (q: string): Ref[] => {
        const tokens = tokenize(q);
        if (tokens.length === 0) {
            return [];
        }

        let results: Set<Ref> | undefined = undefined;

        tokens.forEach((token) => {
            const tokenResult = querySingle(token);

            //Intersect the results
            if (!results) {
                results = tokenResult;
            } else {
                results = new Set(
                    [...results].filter((r) => {
                        return [...tokenResult].some((r2) => {
                            return r.page === r2.page && r.section === r2.section;
                        })
                    })
                );
            }

        });

        return results ? (Array.from(results) as Ref[]).filter((ref: Ref) => {
            return ref.text.match(buildRe(q))
        }) : [];
    };
    const querySingle = (q: string): Set<Ref> => {
        const results = index.get(q);
        return results ? new Set(results) : new Set();
    };
    const formatTranslations = useCallback((translations: typeof en | typeof de) => {
        const formatPage = (attr: Record<string, string | object>, prefix = "") => {
            return Object.fromEntries(Object.entries(attr).map(([k, v]): [string, string | object] => {
                if (typeof v === "string") {
                    return [k, t(`${prefix}.${k}`, staticInterpolates)]
                }
                if (typeof v === "object") {
                    return [k, formatPage(v as Record<string, string>, `${prefix}.${k}`)]
                }
                return [k, v]
            }))
        }

        let id = 0;
        const pages = Object.entries(translations).filter(([, v]) => {
            return typeof v === "object"
        })

        const documents = []

        for (const [name, attr] of pages) {
            documents.push({
                id: id++,
                page: name,
                sections: {
                    ...formatPage(attr as Record<string, string | object>, name)
                }
            })
        }

        return documents;
    }, [t]);
    const pages = useMemo(() => {
        if (!ready) {
            return [];
        }
        let translations;
        switch (language.split("-")[0]) {
            case "en":
                translations = en;
                break;
            case "de":
                translations = de;
                break;
            default:
                translations = en;
        }

        return formatTranslations(translations)

    }, [formatTranslations, language, ready]);

    useEffect(() => {
        index.clear();

        pages.forEach((d) => {
            Object.entries(d.sections).forEach(([k, v]) => {
                if(typeof v === "string") {
                    const ref = {
                        page: d.page,
                        title: `${meta.title[d.page as keyof typeof meta.title]}`,
                        url: `${meta.links[d.page as keyof typeof meta.links]}`
                    };
                    add(k, v, ref)
                }else {
                    Object.entries(v).forEach(([k2, v2]) => {
                        const ref = {
                            page: d.page,
                            title: `${meta.title[d.page as keyof typeof meta.title]}`,
                            url: `${meta.links[d.page as keyof typeof meta.links]}`
                        };
                        add(k2, v2 as string, ref)
                    })
                }
            });
        });

    }, [add, pages]);

    return (
        <SearchContext.Provider value={{query}}>
            {children}
        </SearchContext.Provider>
    )
}