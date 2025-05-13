import {MyLocale} from "~/i18n/MyLocale.ts";

export type LanguageInfo = {
    locale: string,
    name: LanguageName,
    isRTL: boolean,
    language:string
    country?:string
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
    "bn": {
        english: "Bengali",
        native: "বাংলা",
    },
    "de": {
        english: "German",
        native: "Deutsch",
    },
    "en": {
        english: "English",
        native: "English",
    },
    "es": {
        english: "Spanish",
        native: "Español",
    },
    "fa": {
        english: "Persian",
        native: "فارسی",
    },
    "fi": {
        english: "Finnish",
        native: "Suomi",
    },
    "fr": {
        english: "French",
        native: "Français",
    },
    "id": {
        english: "Indonesian",
        native: "Bahasa Indonesia"
    },
    "jp": {
        english: "Japanese",
        native: "日本語",
    },
    "hu": {
        english: "Hungarian",
        native: "Magyar",
    },
    "it": {
        english: "Italian",
        native: "Italiano",
    },
    "pl": {
        english: "Polish",
        native: "Polski",
    },
    "pt-BR": {
        english: "Brazilian Portuguese",
        native: "Português do Brasil",
    },
    "ru": {
        english: "Russian",
        native: "Русский",
    },
    "uk": {
        english: "Ukrainian",
        native: "Українська",
    },
    "tr": {
        english: "Turkish",
        native: "Türkçe",
    },
    "vi": {
        english: "Vietnamese",
        native: "Tiếng Việt",
    },
    "zh-CN": {
        english: "Simplified Chinese",
        native: "简体中文",
    },
    "zh-TW": {
        english: "Traditional Chinese",
        native: "正體中文",
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
        if (found){
            return found
        }
    }
    return languageNames[localeName.language]
}