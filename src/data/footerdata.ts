import Constants from "~/data/Constants.ts";
import {SocialLink} from "~/utils/SocialLink.tsx";

export interface Licence {
    name: string
    link: string
}

export interface CopyWriteData {
    since: string
    for: string
}

export interface FooterData {
    sourceCodeUrl: string
    discussionLink: string
    issuesLink: string
    developerSite: string
    developerGithub: string
    developerName: string
    socials: SocialLink[],
    licence: Licence
    copyright: CopyWriteData
}

export function getFooterData(): FooterData {
    const openSource = Constants.openSource
    const developer = Constants.developer
    const socials = Constants.social

    return {
        developerName: developer.name,
        developerSite: developer.website,
        developerGithub: developer.github,
        discussionLink: openSource.discussionsUrl,
        issuesLink: openSource.issuesUrl,
        sourceCodeUrl: openSource.sourceCodeUrl,
        socials: socials,
        licence: {
            name: "Apache-2.0 license",
            link: "https://www.apache.org/licenses/LICENSE-2.0"
        },
        copyright: {
            since: "2024",
            for: "AB Download Manager App"
        },
    }
}