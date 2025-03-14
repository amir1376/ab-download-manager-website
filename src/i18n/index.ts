import ar_SA from "./locales/ar-SA.json";
import bn_BD from "./locales/bn-BD.json";
import de_DE from "./locales/de-DE.json";
import en_US from "./locales/en-US.json";
import es_ES from "./locales/es-ES.json";
import fa_IR from "./locales/fa-IR.json";
import fr_FR from "./locales/fr-FR.json";
import id_ID from "./locales/id-ID.json";
import jp_JP from "./locales/ja-JP.json";
import it_IT from "./locales/it-IT.json";
import pt_BR from "./locales/pt-BR.json";
import ru_RU from "./locales/ru-RU.json";
import tr_TR from "./locales/tr-TR.json";
import uk_UA from "./locales/uk-UA.json";
import vi_VN from "./locales/vi-VN.json";
import zh_CN from "./locales/zh-CN.json";
import zh_TW from "./locales/zh-TW.json";
import { addLocales, setDefaultLocale } from "./TranslationRegistry.ts";

export function setUpIntl() {
  addLocales({
    "ar-SA":ar_SA,
    "bn-BD":bn_BD,
    "de-DE":de_DE,
    "en-US":en_US,
    "es-ES":es_ES,
    "fa-IR":fa_IR,
    "fr-FR":fr_FR,
    "id-ID":id_ID,
    "it-IT":it_IT,
    "jp-JP":jp_JP,
    "pt-BR":pt_BR,
    "ru-RU":ru_RU,
    "tr-TR":tr_TR,
    "uk-UA":uk_UA,
    "vi-VN":vi_VN,
    "zh-CN":zh_CN,
    "zh-TW":zh_TW,
  });
  setDefaultLocale("en-US");
}
