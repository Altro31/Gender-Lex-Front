import { models } from "@/services/ai/models.ts"
import { genderLexSystemPrompt } from "@/services/ai/system-prompts/gender-lex.ts"
import { genderLexSchema } from "@/utils/schemas/gender-lex.ts"
import { generateObject, streamObject } from "ai"

export async function genderLex(text: string) {
    const { object } = await generateObject({
        model: models.Llama3_8b,
        prompt: text,
        system: genderLexSystemPrompt,
        schema: genderLexSchema,
    })
    return object
}

export function genderLexStream(text: string) {
    return streamObject({
        model: models.Llama3_8b,
        prompt: text,
        system: genderLexSystemPrompt,
        schema: genderLexSchema,
    })
}
