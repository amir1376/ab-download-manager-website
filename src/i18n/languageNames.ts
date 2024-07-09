export type AvailableLanguage =
    | "en"
    | "fa"

export type LanguageInfo = {
    code: string
    name: string
    dir:"ltr"|"rtl"
}


export const availableCodesList:AvailableLanguage[]=["fa","en"]

export const definedLanguageCodeAndName: Record<AvailableLanguage, LanguageInfo> = {
    "en": {
        code: "en",
        name: "English",
        dir:"ltr",
    },
    "fa": {
        code: "fa",
        name: "Persian",
        dir:"rtl",
    },
}
