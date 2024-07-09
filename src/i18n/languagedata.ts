import "server-only"

import {availableCodesList, AvailableLanguage, definedLanguageCodeAndName, LanguageInfo} from "~/i18n/languageNames";
import {ILanguageData} from "~/i18n/ILanguageData";
export type DefinedLanguageData = LanguageInfo & {
    getData: () => Promise<ILanguageData>
}
export const definedLanguages: Record<AvailableLanguage, DefinedLanguageData> = {
    "en": {
        ...definedLanguageCodeAndName.en,
        getData: async () => (await import("~/i18n/locales/en")).default
    },
    "fa": {
        ...definedLanguageCodeAndName.fa,
        getData: async () => (await import("~/i18n/locales/fa")).default
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
