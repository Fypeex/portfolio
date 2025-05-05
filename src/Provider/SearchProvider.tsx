import {createContext, ReactNode, useCallback, useContext, useEffect} from "react";
import {buildRe, documents, replaceUmlaut} from "../util/content.ts";

export interface ISearchContext {
    query: (query: string) => Ref[];
}

type RefBase = { page: string; id: string, title: string };
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
            if(!results) {
                results = tokenResult;
            }
            else {
                results = new Set(
                    [...results].filter((r) => {
                        return [...tokenResult].some((r2) => {
                            return r.page === r2.page && r.id === r2.id && r.section === r2.section;
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
        return results? new Set(results) : new Set();
    };

    useEffect(() => {
        documents.forEach((d) => {
            Object.entries(d.sections).forEach(([k, v]) => {
                const ref = {page: d.page, id: `${d.title}-${k}`, title: d.title};
                add(k, v, ref)
            });

        });

    }, [add]);


    return (
        <SearchContext.Provider value={{query}}>
            {children}
        </SearchContext.Provider>
    )
}