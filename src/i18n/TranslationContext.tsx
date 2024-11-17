import React, {PropsWithChildren, useContext, useEffect, useMemo} from "react";
import {IntlProvider, useIntl} from "react-intl";
import {FlattenKeys} from "~/utils/types";
import {ILanguageData} from "~/i18n/ILanguageData";
import {useLocalStorage} from "usehooks-ts";
import {runWith} from "~/utils/functionalUtils";
import {useSearchParams} from "react-router-dom";
import {getLanguageDirection} from "~/abstraction/i18n";
import {getBrowserLanguageThatSupported} from "~/i18n/BrowserLocale.ts";
import {getAvailableLocaleStrings, getDefaultLocale, getMessagesOfLocale} from "~/i18n/TranslationRegistry.ts";

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

export function TranslationWrapper(
    props: PropsWithChildren
) {
    const [params] = useSearchParams()
    const paramLang = runWith(params.get("lang"), (lang) => {
        if (lang && getAvailableLocaleStrings().includes(lang)) {
            return lang
        }
        return null
    })
    const [locale, setLocale] = useLocalStorage("language", ()=>{
        const locale = getBrowserLanguageThatSupported(getAvailableLocaleStrings())
        return locale ?? getDefaultLocale()
    })
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
        return getMessagesOfLocale(locale!)
    }, [locale])

    function selectLanguage(localeCode: string) {
        console.log(localeCode)
        if (getAvailableLocaleStrings().includes(localeCode)) {
            console.log("selected",localeCode)
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
