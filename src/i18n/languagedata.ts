import "server-only"

import {availableCodesList, AvailableLanguage, definedLanguageCodeAndName, LanguageInfo} from "~/i18n/languageNames";
import {ILanguageData} from "~/i18n/ILanguageData";
export type DefinedLanguageData = LanguageInfo & {
    getData: () => Promise<ILanguageData>
}
// to be removed later
export const definedLanguages: Record<AvailableLanguage, DefinedLanguageData> = {
    "de": {
        ...definedLanguageCodeAndName.de,
        getData: async () => (await import("~/i18n/locales/de")).default
    },
    "en": {
        ...definedLanguageCodeAndName.en,
        getData: async () => (await import("~/i18n/locales/en")).default
    },
    "fa": {
        ...definedLanguageCodeAndName.fa,
        getData: async () => (await import("~/i18n/locales/fa")).default
    },
    "it": {
        ...definedLanguageCodeAndName.it,
        getData: async () => (await import("~/i18n/locales/it")).default
    },
}
export function getLanguageDefinition(code: string) {
    // @ts-ignore
    if (!availableCodesList.includes(code)){
        return null
    }
    return definedLanguages[code as AvailableLanguage]
}
export async function getLanguageDataOrDefault(code: string) {
    let data=await getLanguageDefinition(code)?.getData()
    if (!data){
        data= await getLanguageDefinition(availableCodesList[0])!.getData()
    }
    return data
}
