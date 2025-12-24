import {useMemo, useState, useRef, useEffect} from "react";
import appIcon from "~/assets/icons/app_icon_simple.svg"
import {Icon} from "@iconify/react";
import {useWindowScroll} from "react-use";
import classNames from "classnames";
import {
    getLanguagesInfo,
    useChangeLanguage,
    useCurrentDirection,
    useCurrentLanguageInfo,
    useTranslate
} from "~/abstraction/i18n";
import {MyLink} from "~/abstraction/navigation";
import {useTheme} from "~/abstraction/theme/useTheme";
import Constants from "~/data/Constants.ts";
import {SocialLink, useGetNameForSocialLink} from "~/utils/SocialLink.tsx";
import {LanguageInfo} from "~/i18n/LanguageInfo.ts";

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
                "py-2 px-4 lg:px-6 flex flex-row items-center container",
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

function LanguageItem(props: { language: LanguageInfo, active: boolean }) {
    return <div
        dir="ltr"
        className={classNames(
            "flex flex-row flex-nowrap",
            "border",
            props.active
                ? "bg-base-content/15 border-base-content/15"
                : "border-transparent"
        )}>
        {/*<div className="text-2xl">*/}
        {/*    {props.language.flag}*/}
        {/*</div>*/}
        <div className="flex-shrink-0">
            <LanguageFlagIcon highlighted={props.active} height={24} language={props.language}/>
        </div>
        <div className="flex-1 min-w-0 max-w-full overflow-hidden">
            <div className="truncate">
                {props.language.name.native}
            </div>
        </div>
        <Icon
            className={classNames(
                "transform transition flex-shrink-0",
                !props.active && "scale-0 opacity-0",
            )}
            icon="mdi:done"
        />
    </div>
}

function SocialItem(props: { socialLink: SocialLink }) {
    const name = useGetNameForSocialLink(props.socialLink)
    return <a
        href={props.socialLink.link}
        target="_blank"
        className="flex flex-row">
        <span className="text-nowrap">{name}</span>
        <Icon className="opacity-25 self-start" icon="gg:external" height={24} width={24}/>
    </a>
}

function LanguageFlagIcon(
    props: {
        language: LanguageInfo,
        highlighted?: boolean
        height?: number,
    }
) {
    const {language, ...restProps} = props
    // const countryCode = language?.country
    // const iconName = useMemo(
    //     () => {
    //         if (countryCode) {
    //             return "flag:" + countryCode.toLowerCase() + "-4x3"
    //         } else {
    //             return "mdi:language"
    //         }
    //     },
    //     [countryCode]
    // )
    return <div
        className={classNames(
            "text-xs px-1",
            "rounded border",
            props.highlighted ?
                "text-base-content border-base-content"
                : "border-base-content/50 text-base-content/50",
        )}
        {...restProps}
    >
        <span className="font-bold">
            {language.language.toUpperCase()}
        </span>
    </div>
}

function LanguageDropDown() {
    const languages = getLanguagesInfo()
    const currentLanguageInfo = useCurrentLanguageInfo()
    const changeLang = useChangeLanguage()
    return <div dir={useCurrentDirection()} className={classNames(
        "dropdown",
        !currentLanguageInfo.isRTL && "dropdown-end",
    )}>
        <div tabIndex={0} className="btn btn-ghost">
            <Icon height={24} width={24} icon="mdi:language"/>
            <div className="w-1"></div>
            <div>
                {currentLanguageInfo?.name?.native}
            </div>
        </div>
        <div className={classNames(
            "dropdown-content",
            "max-h-[calc(100vh-5rem)] overflow-y-auto mt-2",
            "shadow-lg bg-base-200",
            "overscroll-contain",
            "rounded-box border border-base-content/25"
        )}>
            <ul tabIndex={0} className="menu space-y-1">
                {Object.values(languages).map(lang => (
                    <li className="" onClick={() => changeLang(lang.locale)} key={lang.locale}>
                        <LanguageItem language={lang} active={currentLanguageInfo?.locale == lang.locale}/>
                    </li>
                ))}
            </ul>
        </div>
    </div>
}

function LanguageForMobile() {
    const languages = getLanguagesInfo()
    const activeLocale = useCurrentLanguageInfo()
    const changeLang = useChangeLanguage()
    return <details dir={useCurrentDirection()}>
        <summary>
            <Icon height={24} width={24} icon="mdi:language"/>
            {activeLocale?.name?.native}
        </summary>
        <ul className="max-h-[calc(100vh-12rem)] overflow-y-auto overscroll-contain space-y-1 pr-4 py-1 pl-4">
            {Object.values(languages).map(lang => (
                <li key={lang.locale} className="block w-full" onClick={() => changeLang(lang.locale)}>
                    <LanguageItem language={lang} active={activeLocale?.locale == lang.locale}/>
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
        <div className={
            classNames(
                "dropdown-content mt-2",
                "menu-lg rounded shadow-lg bg-base-200",
                "rounded-box border border-base-content/25",
            )
        }>
            <ul tabIndex={0} className="menu">
                {social.map(l => (
                    <li key={l.link}>
                        <SocialItem socialLink={l}/>
                    </li>
                ))}
            </ul>
        </div>
    </div>
}

function OptionMobile() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    
    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
                buttonRef.current?.blur();
            }
        };
        
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);
    
    // Close dropdown when pressing Escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
                buttonRef.current?.blur();
            }
        };
        
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen]);
    
    const handleButtonClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        
        if (isOpen) {
            // If open, close it and prevent focus
            setIsOpen(false);
            // Use setTimeout to ensure the state update happens before any focus events
            setTimeout(() => {
                buttonRef.current?.blur();
                // Remove tabIndex temporarily to prevent immediate refocus
                if (buttonRef.current) {
                    buttonRef.current.tabIndex = -1;
                    setTimeout(() => {
                        if (buttonRef.current) {
                            buttonRef.current.tabIndex = 0;
                        }
                    }, 100);
                }
            }, 0);
        } else {
            // If closed, open it
            setIsOpen(true);
        }
    };
    
    return <div 
        ref={dropdownRef}
        className={classNames(
            "dropdown dropdown-bottom dropdown-end md:hidden",
            isOpen && "dropdown-open"
        )}
    >
        <div 
            ref={buttonRef}
            tabIndex={0} 
            role="button" 
            className={classNames(
                "btn btn-ghost relative transition-all duration-200",
                isOpen && "btn-active"
            )}
            onClick={handleButtonClick}
        >
            <div className="relative w-6 h-6 flex items-center justify-center">
                <Icon 
                    height={24} 
                    width={24} 
                    icon="ic:round-menu"
                    className={classNames(
                        "absolute transition-all duration-200 ease-in-out",
                        isOpen ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
                    )}
                />
                <Icon 
                    height={24} 
                    width={24} 
                    icon="mdi:close"
                    className={classNames(
                        "absolute transition-all duration-200 ease-in-out",
                        isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
                    )}
                />
            </div>
        </div>
        <div 
            tabIndex={0} 
            className="dropdown-content shadow-lg w-[calc(100vw-1rem)] max-w-[calc(100vw-1rem)] translate-x-2 rounded-box bg-base-200 overflow-x-hidden z-50"
        >
            <ul className="menu w-full min-w-0 max-w-full box-border">
                <li className="w-full min-w-0 max-w-full box-border"><LanguageForMobile/></li>
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
    return <div className="hidden md:flex flex-row  lg:space-x-4">
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