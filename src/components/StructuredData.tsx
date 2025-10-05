import {Helmet} from "react-helmet";
import {useCurrentLocaleString, useTranslate} from "~/abstraction/i18n";
import Constants from "~/data/Constants.ts";
import appIconWithBackground from "~/assets/icons/app_icon_with_background.svg";
import appHomeLightScreenshot from "~/assets/screenshots/app-home_light.png";
import appDownloadLightScreenshot from "~/assets/screenshots/app-download_light.png";

interface StructuredDataProps {
    currentUrl: string;
}

export default function StructuredData({ currentUrl }: StructuredDataProps) {
    const t = useTranslate();
    const locale = useCurrentLocaleString();

    const appName = t("app_long_name");
    const appShortName = t("app_short_name");
    const description = t("seo_description");
    const keywords = t("seo_keywords");

    // Software Application Schema
    const softwareApplicationSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": appName,
        "alternateName": appShortName,
        "description": description,
        "url": currentUrl,
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": ["Windows", "Linux", "macOS"],
        "author": {
            "@type": "Person",
            "name": Constants.developer.name,
            "url": Constants.developer.website,
            "sameAs": [
                Constants.developer.github
            ]
        },
        "publisher": {
            "@type": "Person",
            "name": Constants.developer.name,
            "url": Constants.developer.website,
            "sameAs": [
                Constants.developer.github
            ]
        },
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
        },
        "downloadUrl": currentUrl + "#download",
        "image": [
            {
                "@type": "ImageObject",
                "url": appIconWithBackground,
                "description": "AB Download Manager App Icon",
                "width": "512",
                "height": "512"
            },
            {
                "@type": "ImageObject",
                "url": appHomeLightScreenshot,
                "description": "AB Download Manager home screen"
            },
            {
                "@type": "ImageObject",
                "url": appDownloadLightScreenshot,
                "description": "AB Download Manager download screen"
            }
        ],
        "screenshot": [
            {
                "@type": "ImageObject",
                "url": appHomeLightScreenshot,
                "description": "AB Download Manager home screen"
            },
            {
                "@type": "ImageObject",
                "url": appDownloadLightScreenshot,
                "description": "AB Download Manager download screen"
            }
        ],
        "featureList": [
            t("home_feature_multi_threaded_title"),
            t("home_feature_queue_title"),
            t("home_feature_scheduler_title"),
            t("home_feature_speed_limiter_title"),
            t("home_feature_browser_integration_title"),
            t("home_feature_multiplatform_title"),
            t("home_feature_open_source_title"),
            t("home_feature_simple_ui_title")
        ],
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.6",
            "ratingCount": "152",
            "bestRating": "5",
            "worstRating": "1"
        },
        "keywords": keywords,
        "license": "https://opensource.org/licenses/Apache-2.0"
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": appName,
        "url": currentUrl,
        "description": description,
        "inLanguage": locale,
        "publisher": {
            "@type": "Person",
            "name": Constants.developer.name,
            "url": Constants.developer.website
        }
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": currentUrl
            }
        ]
    };

    // Product Schema (alternative view)
    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": appName,
        "description": description,
        "image": [
            {
                "@type": "ImageObject",
                "url": appIconWithBackground,
                "description": "AB Download Manager App Icon",
                "width": "512",
                "height": "512"
            },
            {
                "@type": "ImageObject",
                "url": appHomeLightScreenshot,
                "description": "AB Download Manager home screen"
            }
        ],
        "brand": {
            "@type": "Brand",
            "name": "AB Download Manager",
            "logo": {
                "@type": "ImageObject",
                "url": appIconWithBackground,
                "width": "512",
                "height": "512"
            }
        },
        "category": "Software",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.6",
            "bestRating": "5",
            "worstRating": "1",
            "ratingCount": "152"
        }
    };

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(softwareApplicationSchema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(websiteSchema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(breadcrumbSchema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(productSchema)}
            </script>
        </Helmet>
    );
}
