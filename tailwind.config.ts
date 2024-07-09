import type {Config} from 'tailwindcss'
import daisyui, {Config as DaysiUiConfig} from "daisyui";
import defaultThemes from "daisyui/src/theming/themes";

import tinycolor from "tinycolor2";

// noinspection ES6PreferShortImport
import {runWith} from "./src/utils/functionalUtils";


const daisyuiConfigs: DaysiUiConfig = {
    themes: [
        {
            "light": {
                ...defaultThemes.light,
                "primary": "#2563eb",
                "secondary": "#C631FF",
                ...runWith(tinycolor("#eeeeee"), (color) => {
                    return {
                        "base-100": color.toRgbString(),
                        "base-200": color.darken(5).toRgbString(),
                        "base-300": color.darken(5).toRgbString(),
                    }
                }),
            }
        },
        {
            "dark": {
                ...defaultThemes.dark,
                "primary": "#2563eb",
                // "primary-content":"#ffffff",
                "secondary": "#C631FF",
                ...runWith(tinycolor("#0f172a"), (color) => {
                    return {
                        "base-100": color.toRgbString(),
                        "base-200": color.brighten(5).toRgbString(),
                        "base-300": color.brighten(5).toRgbString(),
                    }
                }),
                // "base-100": "#16161e",
            },
        },
    ]
}
const config: Config = {
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {},
            container: {
                center: true
            },
            boxShadow: {
                'btn-blur': '0px 0px 50px 10px rgba(0, 0, 0, 0.3)',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [
        daisyui,
    ],
    daisyui: daisyuiConfigs
}
export default config
