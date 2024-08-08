import fa from "./locales/fa";
import en from "./locales/en";
import de from "./locales/de";
import it from "./locales/it";
import {addLocales, setDefaultLocale} from "./TranslationContext";

export function setUpIntl() {
    addLocales({
        de,
        en,
        fa,
        it,
    })
    setDefaultLocale("en")
}
