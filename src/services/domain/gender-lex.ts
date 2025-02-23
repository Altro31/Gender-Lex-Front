// @ts-nocheck
import { altGenderLexSchema } from "@/schemas/gender-lex"
import {
    availableModels,
    type AvailableModelsType,
} from "@/services/ai/models.ts"
import { genderLexSystemPrompt } from "@/services/ai/system-prompts/gender-lex.ts"
import { generateObject } from "ai"

export async function genderLex(text: string, modelName?: AvailableModelsType) {
    const model =
        availableModels[modelName ?? "Gemini 2.0"] ??
        availableModels["Gemini 2.0"]
    return generateObject({
        model,
        prompt: text,
        system: genderLexSystemPrompt,
        schema: altGenderLexSchema,
    })
}
