import { z } from "astro:schema"

const models = ["Gemini 2.0", "LlaMa 3.1-8b", "LlaMa 3.3-70b"] as const

export const modelSchema = z.enum(models)
