import ar_SA from "./locales/ar-SA.json";
import bn_BD from "./locales/bn-BD.json";
import bqi_IR from "./locales/bqi-IR.json";
import ckb_IR from "./locales/ckb-IR.json";
import de_DE from "./locales/de-DE.json";
import el_GR from "./locales/el-GR.json";
import en_US from "./locales/en-US.json";
import es_ES from "./locales/es-ES.json";
import fa_IR from "./locales/fa-IR.json";
import fi_FI from "./locales/fi-FI.json";
import fr_FR from "./locales/fr-FR.json";
import hu_HU from "./locales/hu-HU.json";
import id_ID from "./locales/id-ID.json";
import jp_JP from "./locales/ja-JP.json";
import it_IT from "./locales/it-IT.json";
import ko_KR from "./locales/ko-KR.json";
import lt_LT from "./locales/lt-LT.json";
import pl_PL from "./locales/pl-PL.json";
import pt_BR from "./locales/pt-BR.json";
import nl_NL from "./locales/nl-NL.json";
import ru_RU from "./locales/ru-RU.json";
import tr_TR from "./locales/tr-TR.json";
import th_TH from "./locales/th-TH.json";
import uk_UA from "./locales/uk-UA.json";
import vi_VN from "./locales/vi-VN.json";
import zh_CN from "./locales/zh-CN.json";
import zh_TW from "./locales/zh-TW.json";
import { addLocales, setDefaultLocale } from "./TranslationRegistry.ts";

export function setUpIntl() {
  addLocales({
    "ar-SA":ar_SA,
    "bn-BD":bn_BD,
    "bqi-IR":bqi_IR,
    "ckb-IR":ckb_IR,
    "de-DE":de_DE,
    "el-GR":el_GR,
    "en-US":en_US,
    "es-ES":es_ES,
    "fa-IR":fa_IR,
    "fi-FI":fi_FI,
    "fr-FR":fr_FR,
    "hu-HU":hu_HU,
    "id-ID":id_ID,
    "it-IT":it_IT,
    "ko-KR":ko_KR,
    "lt-LT":lt_LT,
    "jp-JP":jp_JP,
    "nl-NL":nl_NL,
    "pl-PL":pl_PL,
    "pt-BR":pt_BR,
    "ru-RU":ru_RU,
    "th-TH":th_TH,
    "tr-TR":tr_TR,
    "uk-UA":uk_UA,
    "vi-VN":vi_VN,
    "zh-CN":zh_CN,
    "zh-TW":zh_TW,
  });
  setDefaultLocale("en-US");
}
