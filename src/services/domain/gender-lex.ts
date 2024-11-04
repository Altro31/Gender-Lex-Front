import { models } from "@/services/ai/models.ts"
import { genderLexSystemPrompt } from "@/services/ai/system-prompts/gender-lex.ts"
import { genderLexSchema } from "@/utils/schemas/gender-lex.ts"
import { generateObject, streamObject } from "ai"

export async function genderLex(text: string) {
    const { object } = await generateObject({
        model: models.Gemini_1_5_pro,
        prompt: text,
        system: genderLexSystemPrompt,
        schema: genderLexSchema,
    })
    return object
}

export async function genderLexStream(text: string) {
    const { partialObjectStream } = await streamObject({
        model: models.Gemini_1_5_pro,
        prompt: text,
        system: genderLexSystemPrompt,
        schema: genderLexSchema,
    })
    return partialObjectStream
}
