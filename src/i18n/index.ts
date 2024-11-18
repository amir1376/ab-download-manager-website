import fa_IR from "./locales/fa-IR.json";
import en_US from "./locales/en-US.json";
import de_DE from "./locales/de-DE.json";
import it_IT from "./locales/it-IT.json";
import zh_CN from "./locales/zh-CN.json";
import ar_SA from "./locales/ar-SA.json";
import { addLocales, setDefaultLocale } from "./TranslationRegistry.ts";

export function setUpIntl() {
  addLocales({
    "en-US":en_US,
    "fa-IR":fa_IR,
    "de-DE":de_DE,
    "it-IT":it_IT,
    "zh-CN":zh_CN,
    "ar-SA":ar_SA,
  });
  setDefaultLocale("en-US");
}
