// @ts-check
import { defineConfig, envField } from "astro/config"

import tailwind from "@astrojs/tailwind"

import vue from "@astrojs/vue"

import vercel from "@astrojs/vercel/serverless";

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
      schema: {
          GROQ_API_KEY: envField.string({
              access: "secret",
              context: "server"
          })
      },
  },

  adapter: vercel(),
})