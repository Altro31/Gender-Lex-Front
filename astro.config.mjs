// @ts-check
import { defineConfig, envField } from "astro/config"

import vercel from "@astrojs/vercel"

import node from "@astrojs/node"

import auth from "auth-astro"

import react from "@astrojs/react"

import tailwindcss from "@tailwindcss/vite"

// https://astro.build/config
export default defineConfig({
    output: "server",
    integrations: [auth(), react()],
    
    vite: {
        plugins: [tailwindcss()],
    },
    env: {
        schema: {
            PDF_SERVICES_CLIENT_ID: envField.string({
                access: "secret",
                context: "server",
            }),
            PDF_SERVICES_CLIENT_SECRET: envField.string({
                access: "secret",
                context: "server",
            }),
            UPLOADTHING_TOKEN: envField.string({
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
        },
    },

    adapter: process.env.DOCKER
        ? node({ mode: "standalone" })
        : vercel({
              maxDuration: 60,
              webAnalytics: { enabled: true },
          }),

    image: {
        domains: ["lh3.googleusercontent.com"],
    },

    experimental: {
        clientPrerender: true,
    },
})
