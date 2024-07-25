import {PossiblePlatformsType} from "~/data/LatestAppVersionData.ts";

export function detectOS(): PossiblePlatformsType|null {
    const userAgent = window.navigator.userAgent;
    if (!userAgent)return null
    if (userAgent.indexOf("Windows") != -1) {
        return "windows"
    } else if (userAgent.indexOf("Mac OS") != -1) {
        return "mac"
    } else if (userAgent.indexOf("Linux") != -1) {
        return "linux"
    } else if (userAgent.indexOf("Android") != -1) {
        return "android"
    } else {
        return null
    }
}
