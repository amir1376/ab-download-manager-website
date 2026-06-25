import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from "path"
import * as fs from "node:fs";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
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
