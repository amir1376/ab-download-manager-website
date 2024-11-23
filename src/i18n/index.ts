import ar_SA from "./locales/ar-SA.json";
import bn_BD from "./locales/bn-BD.json";
import de_DE from "./locales/de-DE.json";
import en_US from "./locales/en-US.json";
import fa_IR from "./locales/fa-IR.json";
import fr_FR from "./locales/fr-FR.json";
import it_IT from "./locales/it-IT.json";
import tr_TR from "./locales/tr-TR.json";
import ru_RU from "./locales/ru-RU.json";
import es_ES from "./locales/es-ES.json";
import zh_CN from "./locales/zh-CN.json";
import zh_TW from "./locales/zh-TW.json";
import { addLocales, setDefaultLocale } from "./TranslationRegistry.ts";

export function setUpIntl() {
  addLocales({
    "ar-SA":ar_SA,
    "bn-BD":bn_BD,
    "de-DE":de_DE,
    "en-US":en_US,
    "fa-IR":fa_IR,
    "fr-FR":fr_FR,
    "it-IT":it_IT,
    "ru-RU":ru_RU,
    "es-ES":es_ES,
    "tr-TR":tr_TR,
    "zh-CN":zh_CN,
    "zh-TW":zh_TW,
  });
  setDefaultLocale("en-US");
}
