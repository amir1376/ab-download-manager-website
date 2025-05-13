import {getLatestReleaseFromGithubRelease} from "~/data/GithubApi.ts";
import _ from "lodash";
import Constants from "~/data/Constants.ts";

export type PossiblePlatformsType =
    | "android"
    | "windows"
    | "linux"
    | "mac"
export const possiblePlatformNames: PossiblePlatformsType[] =
    [
        "android",
        "windows",
        "linux",
        "mac",
    ]


export type PossibleLinkType =
    | "direct"
    | "third_party"

export interface LinkType<Type extends PossibleLinkType = PossibleLinkType> {
    type: Type
    link: string
    ext?: string
}

export interface ChecksumHash{
    value: string
    type: string // "md5" | "sha" etc.
}

export interface DirectLink extends LinkType<"direct"> {
    checksums: ChecksumHash[]
}

export const osInfo: Record<PossiblePlatformsType, { icon: string, name: string }> = {
    android: {
        name: "Android",
        icon: "flat-color-icons:android-os",
    },
    windows: {
        name: "Windows",
        icon: "devicon:windows8",
    },
    linux: {
        name: "Linux",
        icon: "devicon:linux",
    },
    mac: {
        name: "Mac",
        icon: "ic:baseline-apple",
    },
}

export const providerInfo: Record<string, {
    icon: string,
    fullName: string
}> = {
    playStore: {
        icon: "logos:google-play-icon",
        fullName: "Google Play",
    },
    windowsStore: {
        icon: "fluent:store-microsoft-16-filled",
        fullName: "Windows Store",
    }
}

export interface ThirdPartyLink extends LinkType<"third_party"> {
    provider: keyof typeof providerInfo & string
}


export function isDirectLink(link: LinkType): link is DirectLink {
    return link.type === "direct"
}

export function isThirdPartyLink(link: LinkType): link is ThirdPartyLink {
    return link.type === "third_party"
}


export interface AppVersionData {
    platform: PossiblePlatformsType
    version: string
    changeLog: string
    links: LinkType[],
    experimental:boolean,
}

export type PossibleBrowserType =
    | "firefox"
    | "chrome"
    | "edge"
    | "opera"

export const possibleBrowserType: PossibleBrowserType[] = [
    "firefox",
    "chrome",
    "edge",
    "opera",
]
export const browserInfo: Record<PossibleBrowserType, {
    name: string,
    icon: string,
}> = {
    firefox: {
        name: "Firefox",
        icon: "logos:firefox",
    },
    chrome: {
        name: "Google Chrome",
        icon: "logos:chrome",
    },
    edge: {
        name: "Microsoft Edge",
        icon: "logos:microsoft-edge",
    },
    opera: {
        name: "Opera",
        icon: "logos:opera"
    }
}

export interface BrowserExtensionVersionData {
    browserType: PossibleBrowserType
    link: string
}

export type VersionData = {
    app: ReadonlyArray<AppVersionData>,
    browser_extension: ReadonlyArray<BrowserExtensionVersionData>,
}

const defaultVersionData: {
    link: LinkType,
    platform: PossiblePlatformsType
}[] = [
    // TODO add markets etc..
    // {
    //     link: {
    //         type: "third_party",
    //         link: "https://google.com",
    //         provider: "playStore",
    //     } as ThirdPartyLink,
    //     platform: "android",
    // }
]

const experimentalPlatforms:PossiblePlatformsType[] = [
    "linux", "mac"
]

function isPlatformExperimental(platform:PossiblePlatformsType){
    return experimentalPlatforms.includes(platform)
}

function mergeWithPredefined(appVersionData: AppVersionData[]){
    const out=appVersionData
    const defaultGrouped=_
        .groupBy(defaultVersionData,i=>i.platform)
    for (const [k,v] of Object.entries(defaultGrouped)) {
        let found=out.find(i=>i.platform==k)
        if (!found){
            found={
                platform:k as PossiblePlatformsType,
                links:[],
                changeLog:"",
                version:"",
                experimental:false,
            }
            out.push(found)
        }
        found.links.push(...v.map(l=>l.link))
    }
    for (const appVersionData of out){
        appVersionData.experimental = appVersionData.experimental || isPlatformExperimental(appVersionData.platform)
    }
    return _.sortBy(out, l => l.experimental)
}
export async function getLatestVersionData(): Promise<VersionData> {
    return {
        app:mergeWithPredefined(
            await getLatestReleaseFromGithubRelease(
                Constants.github.user,
                Constants.github.repo,
            )
        ),
        browser_extension: [
            // TODO add extensions here
            {
                browserType: "firefox",
                link: "https://addons.mozilla.org/en-US/firefox/addon/ab-download-manager/"
            },
            {
                browserType: "chrome",
                link: "https://chromewebstore.google.com/detail/ab-download-manager-brows/bbobopahenonfdgjgaleledndnnfhooj?authuser=0&hl=en"
            },
            // {
            //     browserType:"opera",
            //     link:""
            // },
            // {
            //     browserType:"edge",
            //     link:""
            // },
        ]
    }
}
