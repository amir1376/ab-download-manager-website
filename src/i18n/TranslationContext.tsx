import React, {PropsWithChildren, useContext, useEffect, useMemo} from "react";
import {IntlProvider, useIntl} from "react-intl";
import {FlattenKeys} from "~/utils/types";
import {ILanguageData} from "~/i18n/ILanguageData";
import {useLocalStorage} from "usehooks-ts";
import {runWith} from "~/utils/functionalUtils";
import {useSearchParams} from "react-router-dom";
import {getLanguageDirection} from "~/abstraction/i18n";

interface I18NContext {
    currentLocale: string,
    translations: any,

    changeLanguage(code: string): void
}

interface I18NHook extends I18NContext {
    t(key: FlattenKeys<ILanguageData>, payload?: any): any,
}


// @ts-ignore
const TranslationContext = React.createContext<I18NContext>(undefined)

type TranslatedJson = Record<string, any>

const localesTranslations: Record<string, TranslatedJson> = {}
let defaultLocale: string

export function setDefaultLocale(locale: string) {
    defaultLocale = locale
}

export function addLocales(langInfo: Record<string, TranslatedJson>) {
    Object.keys(langInfo).forEach((value) => {
        localesTranslations[value] = langInfo[value]
    })
}

export function TranslationWrapper(
    props: PropsWithChildren
) {
    const [params] = useSearchParams()
    const paramLang = runWith(params.get("lang"), (lang) => {
        if (lang && Object.keys(localesTranslations).includes(lang)) {
            return lang
        }
        return null
    })
    const [locale, setLocale] = useLocalStorage("language", defaultLocale)
    const direction = getLanguageDirection(locale!)
    useEffect(() => {
        document.documentElement.dir = direction
    }, [direction]);
    useEffect(() => {
        if (locale) {
            document.documentElement.lang = locale
        }
    }, [locale]);

    useEffect(() => {
        if (paramLang) {
            setLocale(paramLang)
        }
    }, [paramLang])
    const messages = useMemo(() => {
        return localesTranslations[locale!]
    }, [locale])

    function selectLanguage(localeCode: string) {
        if (Object.keys(localesTranslations).includes(localeCode)) {
            setLocale(localeCode)
        }
    }

    return <TranslationContext.Provider value={
        {
            currentLocale: locale!,
            translations: messages,
            changeLanguage: selectLanguage,
        }
    }>
        <IntlProvider locale={locale!} messages={messages}>
            {props.children}
        </IntlProvider>
    </TranslationContext.Provider>
}

export function useTranslationContext(): I18NHook {
    const {$t, locale} = useIntl()
    const {changeLanguage, translations} = useContext(TranslationContext)
    return {
        t: (key, payload) => {
            return $t({
                id: key,
            }, payload)
        },
        translations: translations,
        currentLocale: locale,
        changeLanguage: changeLanguage
    }
}
