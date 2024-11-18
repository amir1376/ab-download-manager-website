import {LocaleString} from "~/i18n/LanguageInfo.ts";
import {toMyLocale} from "~/i18n/MyLocale.ts";

const localesTranslations: Record<string, TranslatedJson> = {}
let defaultLocale: string
type TranslatedJson = Record<string, any>

export function setDefaultLocale(locale: string) {
    defaultLocale = locale
}
export function getDefaultLocale() {
    return defaultLocale
}

export function addLocales(translations: Record<string, TranslatedJson>) {
    Object.keys(translations).forEach((value) => {
        localesTranslations[value] = translations[value]
    })
}
export function getAvailableLocaleStrings(){
    return Object.keys(localesTranslations)
}
export function getAvailableLocales(){
    return Object
        .keys(localesTranslations)
        .map(l=>toMyLocale(l))
}
export function getMessagesOfLocale(locale:LocaleString): TranslatedJson {
    return localesTranslations[locale]
}