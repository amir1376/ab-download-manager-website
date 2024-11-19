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
    "ar": {
        english: "Arabic",
        native: "العربية",
    },
    "de": {
        english: "German",
        native: "Deutsch",
    },
    "en": {
        english: "English",
        native: "English",
    },
    "fa": {
        english: "Persian",
        native: "فارسی",
    },
    "fr": {
        english: "French",
        native: "Français",
    },
    "it": {
        english: "Italian",
        native: "Italiano",
    },
    "ru": {
        english: "Russian",
        native: "Русский",
    },
    "zh-CN": {
        english: "Simplified Chinese",
        native: "简体中文",
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
        const found = languageNames[`${localeName.language}-${localeName.country}`]
        console.log(`${localeName.language}-${localeName.country}`,languageNames)
        if (found){
            return found
        }
    }
    return languageNames[localeName.language]
}