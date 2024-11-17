export type LanguageName = {
    native: string
    english: string
}
export type LocaleString =
    | `${string}`
    | `${string}-${string}`

export const rtlLanguages: LocaleString[] = [
    "de",
    "fa",
]

export const definedLanguageCodeAndName: Record<LocaleString, LanguageName> = {
    "de": {
        english: "German",
        native: "Deutsch",
    },
    "en": {
        english: "English",
        native: "English",
    },
    "ar": {
        english: "Arabic",
        native: "العربية",
    },
    "fa": {
        english: "Persian",
        native: "فارسی",
    },
    "it": {
        english: "Italian",
        native: "Italiano",
    },
    "zh": {
        english: "Chinese",
        native: "中文",
    },
};
