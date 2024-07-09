import {PossiblePlatformsType} from "~/data/LatestAppVersionData.tsx";

export type SemanticVersion = `${number}.${number}.${number}` | `${number}.${number}.${number}-${string}`
export type ArtifactInfo = {
    version: SemanticVersion,
    platform: PossiblePlatformsType
}
const versionPatern = /(\d+\.\d+\.\d+)/
const versionAndPlatformRegex = /_(\d+\.\d+\.\d+)_([a-zA-Z]+)/

export function extractVersion(name: string):SemanticVersion|null {
    const x = versionPatern.exec(name)
    const v = x?.["1"];
    if (!v) {
        return null
    }
    return v as SemanticVersion
}

export function extractPlatformAndVersion(name: string):ArtifactInfo|null {
    const result=versionAndPlatformRegex.exec(name)
    if (!result)return null
    return {
        version:result[1] as SemanticVersion,
        platform:result[2] as PossiblePlatformsType,
    }
}