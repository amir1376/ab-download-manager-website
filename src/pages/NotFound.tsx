import {useTranslate} from "~/abstraction/i18n";
import {MyLink} from "~/abstraction/navigation";
import classNames from "classnames";

export default function NotFound() {
    const t = useTranslate()
    return <div className={classNames(
        "h-96 flex flex-col justify-center items-center",
    )}>
        <span className="font-bold text-3xl opacity-75">
            <span>404</span>
            <span>{" | "}</span>
            <span>{t("not_found")} 😕</span>
        </span>
        <div className="h-6"/>
        <MyLink className="btn btn-ghost" href="/">{t("home")}</MyLink>
    </div>
}