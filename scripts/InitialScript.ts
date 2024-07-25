import {generateLatestVersionData} from "./GenerateLatestVersionData";
import path from "path";
import * as fs from "node:fs";

function getGeneratedPath() {
    return path.resolve(__dirname, "..", "public", "generated");
}

export async function main() {
    const generatedPath = getGeneratedPath();
    fs.mkdirSync(generatedPath,{
        recursive:true,
    })
    await generateLatestVersionData(generatedPath)
}
main()
