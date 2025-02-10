import { google, groq } from "@/services/ai/providers"

export namespace models {
    export const Llama = groq("llama-3.3-70b-versatile")
    export const Gemini = google("gemini-2.0-flash-exp")
}

export type AvailableModelsType = keyof typeof availableModels
export const availableModels = {
    "Gemini 2.0": google("gemini-2.0-flash-exp"),
    "LlaMa 3.3-70b": groq("llama-3.3-70b-versatile"),
    "LlaMa 3.1-8b": groq("llama-3.1-8b-instant"),
} as const
export const availableModelsName = [
    "Gemini 2.0",
    "LlaMa 3.1-8b",
    "LlaMa 3.3-70b",
] as const satisfies AvailableModelsType[]
