import {LocaleString} from "~/i18n/LanguageInfo.ts";

const localesTranslations: Record<string, TranslatedJson> = {}
let defaultLocale: string
type TranslatedJson = Record<string, any>

export function setDefaultLocale(locale: string) {
    defaultLocale = locale
}
export function getDefaultLocale() {
    return defaultLocale
}

export function addLocales(langInfo: Record<string, TranslatedJson>) {
    Object.keys(langInfo).forEach((value) => {
        localesTranslations[value] = langInfo[value]
    })
}
export function getAvailableLocaleStrings(){
    return Object.keys(localesTranslations)
}
export function getMessagesOfLocale(locale:LocaleString): TranslatedJson {
    return localesTranslations[locale]
}