// @ts-check
import { defineConfig, envField } from "astro/config"

import tailwind from "@astrojs/tailwind"

import vue from "@astrojs/vue"

import vercel from "@astrojs/vercel/serverless"

import auth from "auth-astro"

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
    output: "server",
    integrations: [tailwind({
        applyBaseStyles: false,
    }), vue(), auth(), react()],

    env: {
        schema: {
            DATABASE_URL: envField.string({
                access: "secret",
                context: "server",
            }),
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
                default: false,
            }),
            AUTH_SECRET: envField.string({
                access: "public",
                context: "client",
                min: 32,
            }),
            AUTH_GOOGLE_ID: envField.string({
                access: "secret",
                context: "server",
            }),
            AUTH_GOOGLE_SECRET: envField.string({
                access: "secret",
                context: "server",
            }),
        },
    },

    adapter: vercel({
        maxDuration: 60,
        webAnalytics: { enabled: true }
    }),

    image: {
        domains: ["lh3.googleusercontent.com"],
    },
})