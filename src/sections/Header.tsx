import {useMemo} from "react";
import appIcon from "~/assets/icons/app_icon_simple.svg"
import {Icon} from "@iconify/react";
import {useWindowScroll} from "react-use";
import classNames from "classnames";
import {
    getAvailableLanguages,
    useChangeLanguage,
    useCurrentDirection,
    useCurrentLocale,
    useTranslate
} from "~/abstraction/i18n";
import type {LanguageInfo} from "~/i18n/languageNames";
import {MyLink} from "~/abstraction/navigation";
import {useTheme} from "~/abstraction/theme/useTheme";
import Constants from "~/data/Constants.ts";
import {SocialLink, useGetNameForSocialLink} from "~/utils/SocialLink.tsx";

export default function Header() {
    const {y} = useWindowScroll()
    const isScrolled = useMemo(() => {
        if (y >= 1) {
            return true
        }
        return false
    }, [y])
    return <div dir="ltr" className={classNames(
        "sticky top-0 w-full z-10 transition-colors",
        isScrolled
            ? "bg-base-200/75 backdrop-blur-3xl shadow border-b border-base-content/10"
            : "bg-transparent border-transparent"
    )}>
        <div className={
            classNames(
                "py-2 px-6 flex flex-row items-center container",
            )
        }>
            <Brand/>
            <div className="flex-grow"/>
            <Options/>
        </div>
    </div>
}

function SourceCode() {
    const t = useTranslate()
    return <MyLink title={t("source_code")}
                   className="btn btn-ghost btn-circle"
                   target="_blank" href={Constants.openSource.sourceCodeUrl}>
        <Icon height={24} width={24} icon="mdi:github"/>
    </MyLink>
}

function Theme() {
    const themeManager = useTheme()
    const t = useTranslate()
    const icon = themeManager.theme == "dark"
        ? "material-symbols:light-mode"
        : "material-symbols:dark-mode"

    function toggleTheme() {
        if (themeManager.theme == "dark") {
            themeManager.setTheme("light")
        } else {
            themeManager.setTheme("dark")
        }
    }

    return <div onClick={toggleTheme}
                title={t("theme")}
                className="btn btn-ghost btn-circle cursor-pointer">
        <Icon height={24} width={24} icon={icon}/>
    </div>
}

function LanguageItem(props: { lang: LanguageInfo, active: boolean }) {
    return <div
        className="flex flex-row justify-between">
        {props.lang.name}
        {props.active && (
            <Icon icon="mdi:done"/>
        )}
    </div>
}

function SocialItem(props: { socialLink: SocialLink }) {
    const name = useGetNameForSocialLink(props.socialLink)
    return <a
        href={props.socialLink.link}
        target="_blank"
        className="flex flex-row">
        <span className="text-nowrap">{name}</span>
        <Icon className="opacity-25 self-start" icon="gg:external" height={24} width={24} />
    </a>
}

function LanguageDropDown() {
    const languages = getAvailableLanguages()
    const activeLocale = useCurrentLocale()
    const currentLang = languages[activeLocale]
    const changeLang = useChangeLanguage()
    return <div dir={useCurrentDirection()} className="dropdown">
        <div tabIndex={0} className="dropdown-bottom btn btn-ghost">
            <Icon height={24} width={24} icon="mdi:language"/> {currentLang?.name}
        </div>
        <ul tabIndex={0} className="dropdown-content menu-lg rounded shadow-lg menu bg-base-200">
            {Object.values(languages).map(l => (
                <li onClick={() => changeLang(l.code)} key={l.code}>
                    <LanguageItem lang={l} active={currentLang?.code == l.code}/>
                </li>
            ))}
        </ul>
    </div>
}

function LanguageForMobile() {
    const languages = getAvailableLanguages()
    const activeLocale = useCurrentLocale()
    const currentLang = languages[activeLocale]
    const changeLang = useChangeLanguage()
    return <details dir={useCurrentDirection()}>
        <summary>
            <Icon icon="mdi:language"/> {currentLang?.name}
        </summary>
        <ul>
            {Object.values(languages).map(l => (
                <li onClick={() => changeLang(l.code)} key={l.code}>
                    <LanguageItem lang={l} active={currentLang?.code == l.code}/>
                </li>
            ))}
        </ul>
    </details>
}

function CommunityForMobile() {
    const socials = Constants.social
    const t = useTranslate()
    return <details dir={useCurrentDirection()}>
        <summary>
            <Icon icon="iconoir:community" height={24} width={24}/>
            {t("social_and_community")}
        </summary>
        <ul>
            {socials.map(l => (
                <li key={l.link}>
                    <SocialItem socialLink={l}/>
                </li>
            ))}
        </ul>
    </details>
}

function CommunityDesktop() {
    const t = useTranslate()
    const social = Constants.social
    return <div dir={useCurrentDirection()} className="dropdown">
        <div tabIndex={0} className="dropdown-bottom btn btn-ghost">
            <Icon icon="iconoir:community" height={24} width={24}/>
            {t("social_and_community")}
        </div>
        <ul tabIndex={0} className="dropdown-content menu-lg rounded shadow-lg menu bg-base-200">
            {social.map(l => (
                <li key={l.link}>
                    <SocialItem socialLink={l}/>
                </li>
            ))}
        </ul>
    </div>
}

function OptionMobile() {
    return <div className="dropdown dropdown-bottom dropdown-end md:hidden">
        <div tabIndex={0} role="button" className="btn btn-ghost">
            <Icon height={24} width={24} icon="ic:round-menu"/>
        </div>
        <div tabIndex={0} className="dropdown-content shadow-lg w-56 rounded-box bg-base-200">
            <ul className="menu">
                <li><LanguageForMobile/></li>
            </ul>
            <ul className="menu">
                <li><CommunityForMobile/></li>
            </ul>
            <div className="divider my-0"/>
            <div className="menu justify-end flex flex-row ">
                <SourceCode/>
                <Theme/>
            </div>
        </div>
    </div>
}
function OptionDesktop() {
    return <div className="hidden md:flex flex-row space-x-4">
        <SourceCode/>
        <CommunityDesktop/>
        <LanguageDropDown/>
        <Theme/>
    </div>
}

function Options() {
    return <>
        <OptionMobile/>
        <OptionDesktop/>
    </>
}

function Brand() {
    const t = useTranslate()
    return <MyLink href="/">
        <div className="flex flex-row space-x-4 items-center">
            <img className="w-8 h-8" src={appIcon} alt="App Icon"/>
            <h1 className="font-bold text-lg text-gradient bg-gradient-to-l my-primary-gradient-colors">
                {t("app_long_name")}
            </h1>
        </div>
    </MyLink>
}