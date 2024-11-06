// @ts-check
import { defineConfig, envField } from "astro/config"

import tailwind from "@astrojs/tailwind"

import vue from "@astrojs/vue"

import vercel from "@astrojs/vercel/serverless"

import auth from "auth-astro"

// https://astro.build/config
export default defineConfig({
    output: "server",

    integrations: [tailwind({
        applyBaseStyles: false,
    }), vue(), auth()],

    env: {
        schema: {
            GROQ_API_KEY: envField.string({
                access: "secret",
                context: "server",
            }),
            GEMINI_API_KEY: envField.string({
                access: "secret",
                context: "server",
            }),
            AUTH_TRUST_HOST: envField.boolean({
                access: "secret",
                context: "server",
                default: false
            }),
            AUTH_SECRET: envField.string({
                access: "public",
                context: "client",
                min: 32
            }),
        },
    },

    adapter: vercel({
        maxDuration: 60
    }),
})