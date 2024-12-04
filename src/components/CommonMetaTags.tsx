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
        <meta property="og:title" content={title}/>
        <meta property="og:description" content={description}/>
        <meta property="og:type" content="website"/>
        <meta property="og:site_name" content={title}/>
        <meta property="og:locale" content={locale}/>
        <meta property="og:image" content={bannerFullLink}/>
        {allLocales.map((locale) => <link
                key={locale}
                rel="alternate"
                hrefLang={locale}
                href={`${import.meta.resolve("/")}?lang=${locale}`}
            />
        )}
    </Helmet>
}
