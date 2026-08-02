import {getLatestReleaseFromGithubRelease} from "~/data/GithubApi.ts";
import _, {lastIndexOf} from "lodash";
import Constants from "~/data/Constants.ts";
import * as z from "zod";

export type PossiblePlatformsType =
    | "android"
    | "windows"
    | "linux"
    | "mac"

export const PossibleArchitectureSchema = z.enum([
    "x64",
    "arm64",
    "universal",
]);

export type PossibleArchitectureType = z.infer<typeof PossibleArchitectureSchema>

const ChecksumHashSchema = z.object({
    value: z.string(),
    type: z.string(),
});
export type ChecksumHash =  z.infer<typeof ChecksumHashSchema>

const DirectLinkSchema = z.object({
    type: z.literal("direct"),
    link: z.url(),
    ext: z.string(),
    checksums: z.array(ChecksumHashSchema),
    arch: PossibleArchitectureSchema.optional(),
});

const ThirdPartyLinkSchema = z.object({
    type: z.literal("third_party"),
    provider: z.string(),
    link: z.url()
});

const ScriptLinkSchema = z.object({
    type: z.literal("script"),
    name: z.string(),
    script: z.string(),
});

const LinkSchema = z.discriminatedUnion("type", [
    DirectLinkSchema,
    ThirdPartyLinkSchema,
    ScriptLinkSchema,
]);

export type DirectLink = z.infer<typeof DirectLinkSchema>;
export type ThirdPartyLink = z.infer<typeof ThirdPartyLinkSchema>;
export type ScriptLink = z.infer<typeof ScriptLinkSchema>;
export type LinkType = z.infer<typeof LinkSchema>;

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


export function isDirectLink(link: LinkType): link is DirectLink {
    return link.type === "direct"
}

export function isThirdPartyLink(link: LinkType): link is ThirdPartyLink {
    return link.type === "third_party"
}

export function isInstallationScript(link: LinkType): link is ThirdPartyLink {
    return link.type === "script"
}

export function installationContainsLink(link: LinkType): link is ThirdPartyLink |  DirectLink {
    return isDirectLink(link) || isThirdPartyLink(link)
}
export function getInstallationArch(link: LinkType): PossibleArchitectureType | undefined {
    if (isDirectLink(link)){
        return link.arch
    }
    return undefined
}

export interface AppVersionData {
    platform: PossiblePlatformsType
    version: string
    changeLog: string
    links: LinkType[],
    experimental: boolean,
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

export function isBrowserExtensionSupportedInThisPlatform(
    platform: PossiblePlatformsType
): boolean {
    return platform !== "android"
}

const defaultVersionData: {
    link: LinkType,
    platform: PossiblePlatformsType
}[] = [
    {
        link: {
            type: "script",
            name: "Installation Script",
            script: "bash <(curl -fsSL https://raw.githubusercontent.com/amir1376/ab-download-manager/master/scripts/install.sh)"
        },
        platform: "linux"
    },
    {
        link: {
            type: "script",
            name: "Winget",
            script: "winget install amir1376.ABDownloadManager"
        },
        platform: "windows"
    },
    {
        link: {
            type: "script",
            name: "Scoop",
            script: "scoop install extras/abdownloadmanager"
        },
        platform: "windows"
    },
    {
        link: {
            type: "script",
            name: "Brew",
            script: "brew tap amir1376/tap && brew install --cask ab-download-manager"
        },
        platform: "linux"
    },
    {
        link: {
            type: "script",
            name: "Brew",
            script: "brew tap amir1376/tap && brew install --cask ab-download-manager"
        },
        platform: "mac"
    },
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

const experimentalPlatforms: PossiblePlatformsType[] = [

]

function isPlatformExperimental(platform: PossiblePlatformsType) {
    return experimentalPlatforms.includes(platform)
}

function mergeWithPredefined(appVersionData: AppVersionData[]) {
    const out = appVersionData
    const defaultGrouped = _
        .groupBy(defaultVersionData, i => i.platform)
    for (const [k, v] of Object.entries(defaultGrouped)) {
        let found = out.find(i => i.platform == k)
        if (!found) {
            found = {
                platform: k as PossiblePlatformsType,
                links: [],
                changeLog: "",
                version: "",
                experimental: false,
            }
            out.push(found)
        }
        found.links.push(...v.map(l => l.link))
    }
    for (const appVersionData of out) {
        appVersionData.experimental = appVersionData.experimental || isPlatformExperimental(appVersionData.platform)
    }
    return _.sortBy(out, l => l.experimental)
}

export async function getLatestVersionData(
    githubToken?: string
): Promise<VersionData> {
    return {
        app: mergeWithPredefined(
            await getLatestReleaseFromGithubRelease(
                Constants.github.user,
                Constants.github.repo,
                githubToken,
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
            {
                browserType:"edge",
                link:"https://chromewebstore.google.com/detail/ab-download-manager-brows/bbobopahenonfdgjgaleledndnnfhooj?authuser=0&hl=en"
            },
            {
                browserType:"opera",
                link:"https://chromewebstore.google.com/detail/ab-download-manager-brows/bbobopahenonfdgjgaleledndnnfhooj?authuser=0&hl=en"
            },
        ]
    }
}
