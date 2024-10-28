// @ts-check
import { defineConfig } from "astro/config"

import tailwind from "@astrojs/tailwind"

import vue from "@astrojs/vue"

// https://astro.build/config
export default defineConfig({
    output: "static",
    integrations: [
        tailwind({
            applyBaseStyles: false,
        }),
        vue(),
    ],
    env: {
        schema: {},
    },
})
