import { models } from "@/services/ai/models.ts"
import { genderLexSystemPrompt } from "@/services/ai/system-prompts/gender-lex.ts"
import { genderLexSchema } from "@/lib/schemas/gender-lex"
import { generateObject, streamObject } from "ai"

export async function genderLex(text: string) {
    return generateObject({
        model: models.Llama,
        prompt: text,
        system: genderLexSystemPrompt,
        schema: genderLexSchema,
    })
}

export function genderLexStream(text: string) {
    return streamObject({
        model: models.Llama,
        prompt: text,
        system: genderLexSystemPrompt,
        schema: genderLexSchema,
    })
}
