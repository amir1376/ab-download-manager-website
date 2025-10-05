import {Helmet} from "react-helmet";
import {useCurrentLocaleString, useTranslate} from "~/abstraction/i18n";
import {useTranslationContext} from "~/i18n/TranslationContext.tsx";
import {addLocales, getAvailableLocaleStrings} from "~/i18n/TranslationRegistry.ts";

export default function CommonMetaTags() {
    const t = useTranslate()
    const title = t("seo_title")
    const description = t("seo_description")

    const locale = useCurrentLocaleString()
    const allLocales = getAvailableLocaleStrings()
    const bannerFullLink = new URL("/assets/banners/banner.png", import.meta.url).href
    return <Helmet>
        <title>{title}</title>
        <meta name="description" content={description}/>
        <meta name="keywords" content={t("seo_keywords")}/>
        <meta name="author" content="AmirHossein Abdolmotallebi"/>
        <meta name="robots" content="index, follow"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

        <meta property="og:title" content={title}/>
        <meta property="og:description" content={description}/>
        <meta property="og:type" content="website"/>
        <meta property="og:site_name" content={title}/>
        <meta property="og:locale" content={locale}/>
        <meta property="og:image" content={bannerFullLink}/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
        <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : 'https://abdownloadmanager.com'}/>

        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content={title}/>
        <meta name="twitter:description" content={description}/>
        <meta name="twitter:image" content={bannerFullLink}/>

        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : 'https://abdownloadmanager.com'}/>

        <link rel="icon" type="image/svg+xml" href="/src/assets/icons/app_icon_simple.svg"/>

        {allLocales.map((locale) => <link
                key={locale}
                rel="alternate"
                hrefLang={locale}
                href={`${import.meta.resolve("/")}?lang=${locale}`}
            />
        )}
    </Helmet>
}
