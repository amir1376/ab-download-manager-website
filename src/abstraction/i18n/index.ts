import {countryCodeToFlag, getLocaleName, isRtl, LanguageInfo, LocaleString} from "~/i18n/LanguageInfo.ts";
import {useIntl} from "react-intl";
import {useTranslationContext} from "~/i18n/TranslationContext";
import {Translatable} from "~/i18n/Translatable.ts";
import {getAvailableLocales, getAvailableLocaleStrings, getDefaultLocale} from "~/i18n/TranslationRegistry.ts";
import {fromMyLocale, isLocaleIsSibling, localeEquals, MyLocale, toMyLocale} from "~/i18n/MyLocale.ts";
import _ from "lodash";
import {useMemo} from "react";

export function useCurrentLocaleString(): LocaleString {
    const saved = useTranslationContext().currentLocale
    const l = useMemo(
        () => getBestLanguageForThisLocale(saved)?.code,
        [saved],
    ) ?? getDefaultLocale()
    return l
}

export function useCurrentLocale(): MyLocale {
    const localeString = useCurrentLocaleString()
    return useMemo(
        () => toMyLocale(localeString),
        [localeString]
    )
}

export function useCurrentLanguageInfo(): LanguageInfo {
    const localeString = useCurrentLocaleString()
    return useMemo(
        () => {
            const result= getBestLanguageForThisLocale(localeString ?? getDefaultLocale())
            if (!result){
                console.error("[BUG] current language info is null!")
            }
            return result!
        },
        [localeString]
    )
}

export function useTranslate() {
    const intl = useIntl()
    return (key: Translatable, args?: any) => {
        return intl.$t({
            id: key,
        }, args)
    }
}

export function useChangeLanguage() {
    const translationContext = useTranslationContext()
    return (l: string) => {
        if (!getAvailableLocaleStrings().includes(l)) {
            return
        }
        translationContext.changeLanguage(l)
    }
}

export function getBestLanguageForThisLocale(locale: LocaleString): LanguageInfo | undefined {
    const locales = getAvailableLocales()
    const search = toMyLocale(locale)
    let found = _.find(locales, l => {
        return localeEquals(l, search)
    })
    if (found) {
        return getLanguageInfo(fromMyLocale(found))
    }
    found = _.find(locales, l => isLocaleIsSibling(l, search))
    if (found) {
        return getLanguageInfo(fromMyLocale(found))
    }
}

export function getLanguageInfo(localeString: LocaleString) {
    return getLanguagesInfo().find(l => l.code == localeString)
}

let languageInfo: LanguageInfo[] | undefined = undefined

export function getLanguagesInfo(): LanguageInfo[] {
    if (!languageInfo) {
        languageInfo = getAvailableLocaleStrings().map(localeString => {
            const locale = toMyLocale(localeString)
            return {
                code: localeString,
                name: getLocaleName(locale) ?? {english: localeString, native: localeString},
                isRTL: isRtl(locale),
                flag:locale?.country && countryCodeToFlag(locale.country)
            }
        })
    }
    return languageInfo

}

export function getLanguageDirection(code: string): "ltr" | "rtl" {
    if (isRtl(toMyLocale(code))) {
        return "rtl"
    } else {
        return "ltr"
    }
}

export function useCurrentLangIsRtl() {
    const currentLanguage = useCurrentLanguageInfo();
    return currentLanguage.isRTL
}

export function useCurrentDirection(): "ltr" | "rtl" {
    if (useCurrentLangIsRtl()) {
        return "rtl"
    } else {
        return "ltr"
    }
}

