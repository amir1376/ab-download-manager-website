import {LocaleString} from "~/i18n/LanguageInfo.ts";

export interface MyLocale {
    language: string,
    country?: string
}

export function fromMyLocale(myLocale: MyLocale):LocaleString {
    let o = myLocale.language
    if (myLocale.country){
        o+="-"+myLocale.country
    }
    return o
}

export function toMyLocale(myLocale: LocaleString):MyLocale {
    const [lang, country] = myLocale.split("-")
    return {
        language: lang,
        country: country,
    }
}
export function localeEquals(a:MyLocale,b:MyLocale){
    return a.language == b.language && a.country == b.country
}
export function isLocaleContains(locale: MyLocale, localeToCheck: MyLocale): boolean {
    if (locale.language === localeToCheck.language) {
        if (locale.country) {
            return locale.country === localeToCheck.country
        } else {
            return true
        }
    } else {
        return false
    }
}

export function isLocaleIsSibling(locale: MyLocale, localeToCheck: MyLocale): boolean {
    return locale.language === localeToCheck.language
}