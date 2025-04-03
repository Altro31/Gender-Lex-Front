import { google, groq } from "@/services/ai/providers"
import type { UnionToTuple } from "type-fest"

export type AvailableModelsType = keyof typeof availableModels
export const availableModels = {
    "Deepseek R1": groq("deepseek-r1-distill-llama-70b"),
    "Gemini 2.0": google("gemini-2.0-flash-exp"),
    "LlaMa 3.3-70b": groq("llama-3.3-70b-versatile"),
    "LlaMa 3.1-8b": groq("llama-3.1-8b-instant"),
} as const
export type Model = (typeof availableModelsName)[number]
export const availableModelsName = [
    "deepseek",
    "gemini",
    "llama3_1",
    "llama3_3",
    "qwen",
]
