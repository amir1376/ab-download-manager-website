import * as fs from "node:fs";
import path from "path";
import {getLatestVersionData} from "../src/data/LatestAppVersionData";

export async function generateLatestVersionData(
    generatedFolder: string,
    githubToken?: string
) {
    console.log("going to fetch latest version data");
    if (githubToken) {
        console.log("github token provided");
    }else {
        console.log("github token not provided, we might face rate limit...");
    }
    const data = await getLatestVersionData(githubToken)
    const file = path.resolve(generatedFolder, "latest_version_data.json")
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}
