import {Helmet} from "react-helmet";
import {useCurrentLocaleString, useTranslate} from "~/abstraction/i18n";
export default function CommonMetaTags(){
    const t = useTranslate()
    const title = t("seo_title")
    const description = t("seo_description")

    const locale = useCurrentLocaleString()
    const bannerFullLink = new URL("/assets/banners/banner.png",import.meta.url).href
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
    </Helmet>
}
