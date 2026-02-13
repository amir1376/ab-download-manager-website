import {PossibleArchitectureType, PossiblePlatformsType} from "~/data/LatestAppVersionData.ts";

export type SemanticVersion = `${number}.${number}.${number}` | `${number}.${number}.${number}-${string}`
export type ArtifactInfo = {
    version: SemanticVersion,
    platform: PossiblePlatformsType,
    arch: PossibleArchitectureType,
}
const versionPattern = /(\d+\.\d+\.\d+)/
const versionAndPlatformAndArchRegex = /_(\d+\.\d+\.\d+)_([a-zA-Z]+)_([a-zA-Z0-9]+)/

export function extractVersion(name: string): SemanticVersion | null {
    const x = versionPattern.exec(name)
    const v = x?.["1"];
    if (!v) {
        return null
    }
    return v as SemanticVersion
}

export function extractPlatformAndVersion(name: string): ArtifactInfo | null {
    const result = versionAndPlatformAndArchRegex.exec(name)
    if (!result) return null
    let arch: PossibleArchitectureType | undefined = result[3] as PossibleArchitectureType | undefined
    if (!arch) {
        arch = "universal"
    }
    return {
        version: result[1] as SemanticVersion,
        platform: result[2] as PossiblePlatformsType,
        arch: arch,
    }
}
