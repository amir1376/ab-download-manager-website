import {SocialLink} from "~/utils/SocialLink.tsx";

const githubInfo = {
    user: "amir1376",
    repo: "ab-download-manager",
}
const developerInfo = {
    name: "Amir Ab",
    website: "https://amirab.ir",
    github: "https://github.com/amir1376"
}
const sourceCodeUrl = `https://github.com/${githubInfo.user}/${githubInfo.repo}`
const issuesUrl = `${sourceCodeUrl}/issues/`
const discussionsUrl = `${sourceCodeUrl}/discussions/`

export default {
    github: githubInfo,
    developer: developerInfo,
    social:[
        {
            type:"telegram-channel",
            link:"https://t.me/abdownloadmanager",
        },
        {
            type:"telegram-group",
            link:"https://t.me/abdownloadmanager_discussion",
        },
    ] as SocialLink[],
    openSource: {
        sourceCodeUrl: sourceCodeUrl,
        issuesUrl: issuesUrl,
        discussionsUrl: discussionsUrl,
    },
}