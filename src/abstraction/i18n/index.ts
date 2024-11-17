import {definedLanguageCodeAndName, LocaleString, rtlLanguages} from "~/i18n/LanguageInfo.ts";
import {useIntl} from "react-intl";
import {useTranslationContext} from "~/i18n/TranslationContext";
import {Translatable} from "~/i18n/Translatable.ts";
import {getAvailableLocaleStrings} from "~/i18n/TranslationRegistry.ts";

export function useCurrentLocale(): LocaleString {
    return useIntl().locale
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


export function getLanguageNames() {
    return definedLanguageCodeAndName
}

export function getLanguageDirection(code: string): "ltr"|"rtl" {
    const isRtl = rtlLanguages.includes(code)
    if (isRtl) {
        return "rtl"
    } else {
        return "ltr"
    }
}
export function useCurrentDirection() {
    const currentLanguage = useCurrentLocale();
    return getLanguageDirection(currentLanguage)
}
