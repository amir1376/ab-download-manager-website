import {availableCodesList, AvailableLanguage, definedLanguageCodeAndName} from "~/i18n/languageNames";
import {useIntl} from "react-intl";
import {FlattenKeys} from "~/utils/types";
import {ILanguageData} from "~/i18n/ILanguageData";
import {useTranslationContext} from "~/i18n/TranslationContext";
import {Translatable} from "~/i18n/Translatable.ts";

export function useCurrentLocale(): AvailableLanguage {
    return useIntl().locale as AvailableLanguage
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
        // @ts-ignore
        if (!getAvailableLocales().includes(l)) {
            return
        }
        translationContext.changeLanguage(l)
    }
}

export function getAvailableLocales() {
    return availableCodesList
}

export function getAvailableLanguages() {
    return definedLanguageCodeAndName
}

export function getLanguageDirection(code: string): "ltr"|"rtl" {
    const lang = definedLanguageCodeAndName[code]
    if (lang) {
        return lang.dir
    } else {
        return "ltr"
    }
}
export function useCurrentDirection() {
    const currentLanguage = useCurrentLocale();
    return getLanguageDirection(currentLanguage)
}
