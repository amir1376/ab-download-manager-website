import fa from "./locales/fa.json";
import en from "./locales/en.json";
import de from "./locales/de.json";
import it from "./locales/it.json";
import zh from "./locales/zh.json";
import ar from "./locales/ar.json";
import { addLocales, setDefaultLocale } from "./TranslationRegistry.ts";

export function setUpIntl() {
  addLocales({
    de,
    en,
    fa,
    ar,
    it,
    zh,
  });
  setDefaultLocale("en");
}
