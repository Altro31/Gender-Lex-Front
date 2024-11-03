import { createOpenAI } from "@ai-sdk/openai"
import { GROQ_API_KEY } from "astro:env/server"

export const provider = createOpenAI({
    baseURL: "https://api.groq.com/openai/v1",
    apiKey: GROQ_API_KEY,
})
