import appIcon from "~/assets/icons/app_icon_simple.svg"
import appIconBordered from "~/assets/icons/app_icon_bordered.svg"
import {getIcoifyLink} from "~/utils/IconifyUtil";
import {Translatable} from "~/i18n/Translatable.ts";
import appHomeDarkScreenshot from "~/assets/screenshots/app-home_dark.png"
import appHomeLightScreenshot from "~/assets/screenshots/app-home_light.png"
import appDownloadDarkScreenshot from "~/assets/screenshots/app-download_dark.png"
import appDownloadLightScreenshot from "~/assets/screenshots/app-download_light.png"

export interface ImageProp {
    src: string
    alt: string
}

export interface FeatureProp {
    title: Translatable
    description: Translatable
}

export interface BrowserProp {
    icon: string
    title: string
    link:string
}
export interface MainAppScreenshot{
    home:Screenshot
    download:Screenshot
}
export type Screenshot =Record<"dark"|"light", ImageProp>

export interface HomeData{
    shortName:Translatable
    longName:Translatable
    title:Translatable
    description:Translatable
    headerIcon:ImageProp
    borderedIcon:ImageProp
    features:FeatureProp[]
    screenshots:MainAppScreenshot
    browserExtensions:BrowserProp[],
}

export function getHomeData():HomeData {
    return {
        headerIcon:{
            src:appIcon,
            alt:"App Icon",
        },
        borderedIcon:{
            src:appIconBordered,
            alt:"App Icon",
        },

        shortName:"app_short_name",
        screenshots:{
            home:{
                dark:{
                    alt:"home-screenshot-dark",
                    src:appHomeDarkScreenshot
                },
                light:{
                    alt:"home-screenshot-light",
                    src:appHomeLightScreenshot
                },
            },
            download:{
                dark:{
                    alt:"download-screenshot-dark",
                    src:appDownloadDarkScreenshot
                },
                light:{
                    alt:"download-screenshot-light",
                    src:appDownloadLightScreenshot
                },
            }
        },
        longName:"app_long_name",
        title:"home_hero_title",
        description:"home_hero_description",
        browserExtensions:[
            {
                icon:getIcoifyLink("logos:firefox"),
                title:"Firefox",
                link:"https://google.com"
            },
            {
                icon:getIcoifyLink("logos:chrome"),
                title:"Chrome",
                link:"https://google.com"
            },
        ],
        features:[
            {
                title:"home_feature_simple_ui_title",
                description:`home_feature_simple_ui_description`,
            },
            {
                title:"home_feature_multi_threaded_title",
                description:`home_feature_multi_threaded_description`
            },
            {
                title:"home_feature_queue_title",
                description:`home_feature_queue_description`
            },
            {
                title:"home_feature_scheduler_title",
                description:`home_feature_scheduler_description`
            },
            {
                title:"home_feature_speed_limiter_title",
                description:`home_feature_speed_limiter_description`
            },
            {
                title:"home_feature_browser_integration_title",
                description:`home_feature_browser_integration_description`
            },
            {
                title:"home_feature_multiplatform_title",
                description:`home_feature_multiplatform_description`
            },
            {
                title:"home_feature_open_source_title",
                description:`home_feature_open_source_description`
            },
        ],
    }
}