import * as fs from "node:fs";
import path from "path";
import {getLatestVersionData} from "../src/data/LatestAppVersionData";

export async function generateLatestVersionData(
    generatedFolder:string
) {
    const data =await getLatestVersionData()
    const file = path.resolve(generatedFolder,"latest_version_data.json")
    fs.writeFileSync(file,JSON.stringify(data, null, 2));
}
