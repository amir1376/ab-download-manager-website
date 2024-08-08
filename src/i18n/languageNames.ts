export type AvailableLanguage =
    | "de"
    | "en"
    | "fa"
    | "it"

export type LanguageInfo = {
    code: string
    name: string
    dir: "ltr" | "rtl"
}


export const availableCodesList: AvailableLanguage[] = [
    "de",
    "en",
    "fa",
    "it",
]

export const definedLanguageCodeAndName: Record<AvailableLanguage, LanguageInfo> = {
    "de": {
        code: "de",
        name: "German",
        dir: "ltr",
    },
    "en": {
        code: "en",
        name: "English",
        dir: "ltr",
    },
    "fa": {
        code: "fa",
        name: "Persian",
        dir: "rtl",
    },
    "it": {
        code: "it",
        name: "Italian",
        dir: "ltr",
    },
}
