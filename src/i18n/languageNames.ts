export type AvailableLanguage =
    | "de"
    | "en"
    | "fa"
    | "it"
    | "zh"
    | "ar"

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
    "zh",
    "ar",
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
    "ar": {
        code: "ar",
        name: "Arabic",
        dir: "rtl",
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
    "zh": {
        code: "zh",
        name: "Chinese",
        dir: "ltr",
    },
}
