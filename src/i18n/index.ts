import fa from "./locales/fa";
import en from "./locales/en";
import de from "./locales/de";
import it from "./locales/it";
import zh from "./locales/zh";
import { addLocales, setDefaultLocale } from "./TranslationContext";

export function setUpIntl() {
  addLocales({
    de,
    en,
    fa,
    it,
    zh,
  });
  setDefaultLocale("en");
}
