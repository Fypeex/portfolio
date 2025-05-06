
export const esc = (s:string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const umlaut = (ch: string) => {
    switch (ch.toLowerCase()) {
        case 'ä': return '(?:ä|ae|a)';
        case 'ö': return '(?:ö|oe|o)';
        case 'ü': return '(?:ü|ue|u)';
        case 'ß': return '(?:ß|ss)';
        default : return esc(ch);
    }
};

export const replaceUmlaut = (term: string) => {
    return term
        .replace(/ä/g, 'a')
        .replace(/ö/g, 'o')
        .replace(/ü/g, 'u')
        .replace(/ß/g, 'ss')
        .replace(/Ä/g, 'A')
        .replace(/Ö/g, 'O')
        .replace(/Ü/g, 'U')
};

export const buildRe = (term: string) =>
    new RegExp(`(${[...term].map(umlaut).join('')})`, 'gi');

