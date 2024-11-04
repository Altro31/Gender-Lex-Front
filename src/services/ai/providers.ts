import { createOpenAI } from "@ai-sdk/openai"
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { GROQ_API_KEY, GEMINI_API_KEY } from "astro:env/server"

export const groq = createOpenAI({
    baseURL: "https://api.groq.com/openai/v1",
    apiKey: GROQ_API_KEY,
})

export const google = createGoogleGenerativeAI({
    apiKey: GEMINI_API_KEY,
})
