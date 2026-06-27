import {Helmet} from "react-helmet";
import {useCurrentLocaleString, useTranslate} from "~/abstraction/i18n";
import {getAvailableLocaleStrings} from "~/i18n/TranslationRegistry.ts";
import {usePageInfo} from "~/components/PageInfo.tsx";
import Constants from "~/data/Constants.ts";

export default function CommonMetaTags() {
    const pageInfo = usePageInfo()
    const t = useTranslate()
    const defaultTitle = t("seo_title")
    const defaultDescription = t("seo_description")
    const title = pageInfo.title || defaultTitle
    const description = pageInfo.description || defaultDescription

    const locale = useCurrentLocaleString()
    const allLocales = getAvailableLocaleStrings()


    const defaultUrl = Constants.website;
    const originUrl = typeof window !== 'undefined'
        ? window.origin : defaultUrl
    const currentUrl = typeof window !== 'undefined'
        ? window.location.href : defaultUrl

    // for now this banner is in public folder
    const banner = new URL("/assets/banners/banner.png", originUrl).href

    const getAlternateUrl = (targetLocale: string) => {
        const url = new URL(currentUrl)
        url.searchParams.set("lang", targetLocale)
        return url.href
    }

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
        <meta property="og:image" content={banner}/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
        <meta property="og:url" content={currentUrl}/>

        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content={title}/>
        <meta name="twitter:description" content={description}/>
        <meta name="twitter:image" content={banner}/>

        <link rel="canonical" href={currentUrl}/>

        <link rel="icon" type="image/svg+xml" href="/src/assets/icons/app_icon_simple.svg"/>

        {allLocales.map((loc) => <link
                key={loc}
                rel="alternate"
                hrefLang={loc}
                href={getAlternateUrl(loc)}
            />
        )}
    </Helmet>
}
