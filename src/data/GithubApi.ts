import {extractPlatformAndVersion} from "~/data/ArtiffactUtil.ts";
import {
    AppVersionData,
    ChecksumHash,
    DirectLink,
    PossibleArchitectureType,
    PossiblePlatformsType
} from "~/data/LatestAppVersionData.ts";
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
    repo: string,
    token?: string,
): Promise<GithubRelease> {
    const url = `https://api.github.com/repos/${owner}/${repo}/releases/latest`;
    const headers = new Headers()
    if (token) {
        headers.set("Authorization", "Bearer " + token)
    }
    const response = await fetch(url, {
        headers: headers
    });
    if (!_.inRange(response.status, 200, 299)) {
        throw Error(`fail to get latest version data code:${response.status} ${response.statusText}`);
    }
    return response.json()
}

async function downloadAsText(link: string): Promise<string> {
    try {
        const response = await fetch(link)
        return await response.text()
    } catch (e) {
        console.error("Fail to download link as a text")
        throw e;
    }
}

function getUserAwareNameForArchitecture(
    platform: PossiblePlatformsType,
    arch: PossibleArchitectureType,
): string | undefined {
    const archMap: Record<PossiblePlatformsType, Partial<Record<PossibleArchitectureType, string>>> = {
        android: {
            x64: "X64",
            arm64: "ARM-64",
        },
        windows: {
            x64: "X64 (Intel/AMD)",
            arm64: "ARM-64",
        },
        linux: {
            x64: "X64 (Intel/AMD)",
            arm64: "ARM-64",
        },
        mac: {
            x64: "Intel",
            arm64: "Apple Silicon",
        },
    };

    return archMap[platform]?.[arch];
}

export async function getLatestReleaseFromGithubRelease(
    owner: string,
    repo: string,
    token?: string,
): Promise<AppVersionData[]> {
    const release = (await hitRemote(owner, repo, token))

    const appReleaseAsset = release.assets.filter(f => {
        //make sure to add new file extensions here if we have new target
        return /^.+\.(exe|msi|deb|rpm|dmg|apk|zip|gz)$/.test(f.name)
    })
    // don't forget to update regex if change this
    const hashExtensions = ["md5", "sha"]
    const appHashAssets = release.assets.filter(f => {
        return /^.+\.(md5|sha)$/.test(f.name)
    })

    const groupedByPlatform = _.groupBy(
        appReleaseAsset
            .map((value) => {
                return {
                    link: value.browser_download_url,
                    name: value.name,
                    ...extractPlatformAndVersion(value.name),
                }
            }),
        i => i.platform
    )
    const linkAndHashes = await Promise.all(
        appReleaseAsset.map(async (appDownloadFileAsset) => {
            const possibleNameWithHashExtension = hashExtensions.map((hashExtension) => {
                return appDownloadFileAsset.name + "." + hashExtension
            })
            const hashAssets = appHashAssets.filter(
                ha => possibleNameWithHashExtension.includes(ha.name)
            )
            const checksums = await Promise.all(
                hashAssets.map(async hashAsset => {
                    const hashLink = hashAsset.browser_download_url
                    const hashType = hashAsset.name.split(".").pop()!
                    let hash: ChecksumHash = {
                        value: await downloadAsText(hashLink),
                        type: hashType,
                    }
                    return hash
                })
            )
            return [
                appDownloadFileAsset.browser_download_url,
                checksums,
            ]
        })
    )
    const hashesOfDownloadLinks: Record<string, ChecksumHash[]> = Object.fromEntries(linkAndHashes)
    return Object
        .entries(groupedByPlatform)
        .map(([k, v]) => {
            return {
                platform: k,
                changeLog: "",
                version: release.name,
                links: v.map((l) => {
                    return {
                        link: l.link,
                        type: "direct",
                        arch: l.arch,
                        ext: run(() => {
                            const p = l.name.split(".")
                            return p[p.length - 1]
                        }),
                        checksums: hashesOfDownloadLinks[l.link]
                    } satisfies DirectLink
                }),
                experimental: false,
            } as AppVersionData
        })
}
