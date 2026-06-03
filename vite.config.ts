import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"
import * as fs from "node:fs";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
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
