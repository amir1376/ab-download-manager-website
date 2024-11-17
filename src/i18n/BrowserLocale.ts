import {LocaleString} from "~/i18n/LanguageInfo.ts";
import {fromMyLocale, isLocaleContains, toMyLocale} from "~/i18n/MyLocale.ts";


export function getBrowserLanguageThatSupported(
    supportedLocaleStrings: LocaleString[],
): LocaleString | undefined {
    const supportedLocales = supportedLocaleStrings.map(l => toMyLocale(l))
    const browserLocales = navigator.languages.map(l => toMyLocale(l))
    for (const browserLocale of browserLocales) {
        for (const supportedLocale of supportedLocales) {
            if (isLocaleContains(supportedLocale, browserLocale)) {
                return fromMyLocale(supportedLocale)
            }
        }
    }
    return undefined
}