// @ts-check
import { defineConfig, envField } from "astro/config"

import vercel from "@astrojs/vercel"

import node from "@astrojs/node"

import auth from "auth-astro"

import tailwindcss from "@tailwindcss/vite"

import preact from "@astrojs/preact"

// https://astro.build/config
export default defineConfig({
    output: "server",
    integrations: [auth(), preact({ compat: true, devtools: true })],
    vite: {
        plugins: [tailwindcss()],
    },
    env: {
        schema: {
            DOCKER: envField.boolean({
                access: "secret",
                context: "server",
                default: false,
            }),
            API_KEY: envField.string({
                access: "secret",
                context: "server",
            }),
            PDF_SERVICES_CLIENT_ID: envField.string({
                access: "secret",
                context: "server",
            }),
            PDF_SERVICES_CLIENT_SECRET: envField.string({
                access: "secret",
                context: "server",
            }),
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
            FLAG_REACT_SCAN: envField.boolean({
                access: "public",
                context: "client",
                default: false,
            }),
        },
    },

    adapter: process.env.DOCKER
        ? node({ mode: "standalone" })
        : vercel({
              maxDuration: 60,
              webAnalytics: { enabled: true },
              imageService: true,
          }),

    image: {
        domains: ["lh3.googleusercontent.com"],
    },

    experimental: {
        clientPrerender: true,
    },
})
