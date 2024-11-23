import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { createGroq } from "@ai-sdk/groq"
import { GEMINI_API_KEY, GROQ_API_KEY } from "astro:env/server"

export const groq = createGroq({
    baseURL: "https://api.groq.com/openai/v1",
    apiKey: GROQ_API_KEY,
})

export const google = createGoogleGenerativeAI({
    apiKey: GEMINI_API_KEY,
})
