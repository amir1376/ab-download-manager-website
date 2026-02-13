import {PossibleArchitectureType, PossiblePlatformsType} from "~/data/LatestAppVersionData.ts";

export const archPriorityPerPlatform: Record<PossiblePlatformsType, Array<PossibleArchitectureType>> = {
    android: [
        "universal",
        "arm64",
        "x64",
    ],
    windows: [
        "universal",
        "x64",
        "arm64",
    ],
    linux: [
        "universal",
        "x64",
        "arm64",
    ],
    mac: [
        "universal",
        "arm64",
        "x64",
    ]
}

export const archNameMapper: Record<PossiblePlatformsType, Record<PossibleArchitectureType, string>> = {
    android: {
        "arm64": "arm64",
        "x64": "x64",
        "universal": "Universal",
    },
    windows: {
        "arm64": "ARM-64",
        "x64": "x64 (Intel/AMD)",
        "universal": "Universal",
    },
    linux: {
        "arm64": "ARM-64",
        "x64": "x64 (Intel/AMD)",
        "universal": "Universal",
    },
    mac: {
        "arm64": "Apple Silicon",
        "x64": "Intel",
        "universal": "Universal",
    },
}