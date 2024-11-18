import {MyLocale} from "~/i18n/MyLocale.ts";

export type LanguageInfo = {
    code: string,
    name: LanguageName,
    isRTL: boolean,
    flag?:string
}

export type LanguageName = {
    native: string
    english: string
}
export type LocaleString =
    | `${string}`
    | `${string}-${string}`

const rtlLanguages: LocaleString[] = [
    "ar",
    "fa",
]

const languageNames: Record<LocaleString, LanguageName> = {
    "de": {
        english: "German",
        native: "Deutsch",
    },
    "en": {
        english: "English",
        native: "English",
    },
    "ar": {
        english: "Arabic",
        native: "العربية",
    },
    "fa": {
        english: "Persian",
        native: "فارسی",
    },
    "it": {
        english: "Italian",
        native: "Italiano",
    },
    "zh": {
        english: "Chinese",
        native: "中文",
    },
};

export function countryCodeToFlag(countryCode:string) {
    return countryCode
        .toUpperCase()
        .split('')
        .map(char => String.fromCodePoint(127397 + char.charCodeAt(0)))
        .join('');
}

export function isRtl(locale:MyLocale) {
    return rtlLanguages.includes(locale.language)
}

export function getLocaleName(localeName:MyLocale):LanguageName|undefined {
    if (localeName.country){
        const found = languageNames[`${localeName.language}-${localeName.country}}`]
        if (found){
            return found
        }
    }
    return languageNames[localeName.language]
}