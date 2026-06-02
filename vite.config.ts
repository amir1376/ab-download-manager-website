import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"
import * as fs from "node:fs";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        // GitHub pages doesn't support SPA by default, this is a workaround
        {
            name: "copy-404",
            closeBundle() {
                fs.copyFileSync("dist/index.html", "dist/404.html");
                console.log("404.html created from index.html");
            },
        },
    ],
    resolve: {
        alias: {
            "~": path.resolve(__dirname, "./src")
        }
    },
    server: {
        port: 3000,
    }
})
