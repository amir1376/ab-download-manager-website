import fa from "./locales/fa";
import en from "./locales/en";
import {addLocales, setDefaultLocale} from "./TranslationContext";
export function setUpIntl(){
    addLocales({en, fa})
    setDefaultLocale("en")
}