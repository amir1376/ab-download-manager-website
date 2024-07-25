import {extractPlatformAndVersion} from "~/data/ArtiffactUtil.ts";
import {AppVersionData} from "~/data/LatestAppVersionData.ts";
import _ from "lodash";
import {run} from "~/utils/functionalUtils.ts";

export type GithubRelease = {
    name: string,
    assets: GithubArtifactAsset[]
}

export type GithubArtifactAsset = {
    browser_download_url: string
    name: string
}

async function hitRemote(
    owner: string,
    repo: string
): Promise<GithubRelease> {
    const input = `https://api.github.com/repos/${owner}/${repo}/releases/latest`;
    const response = await fetch(input);
    if (!_.inRange(response.status,200,299)){
        throw Error(`fail to get latest version data code:${response.status} ${response.statusText}`);
    }
    return response.json()
}

export async function getLatestReleaseFromGithubRelease(
    owner: string,
    repo: string
): Promise<AppVersionData[]> {
    const release = (await hitRemote(owner, repo))

    const releaseLinks = release.assets.filter(f => {
        //make sure to add new file extensions here if we have new target
        return /^.+\.(exe|msi|deb|rpm|dmg|zip|apk)$/.test(f.name)
    })

    const groupedByPlatform = _.groupBy(
        releaseLinks
            .map((value) => {
                return {
                    link: value.browser_download_url,
                    name:value.name,
                    ...extractPlatformAndVersion(value.name),
                }
            }),
        i => i.platform
    )
    return Object
        .entries(groupedByPlatform)
        .map(([k, v]) => {
            return {
                platform: k,
                changeLog:"",
                version: release.name,
                links: v.map((l) => {
                    return {
                        link: l.link,
                        type: "direct",
                        ext: run(()=>{
                            const p=l.name.split(".")
                            return p[p.length-1]
                        })
                    }
                })
            } as AppVersionData
        })
}
