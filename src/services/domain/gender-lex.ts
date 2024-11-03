import { generateObject } from "ai"
import { genderLexSchema } from "@/utils/schemas/gender-lex.ts"
import { genderLexSystemPrompt } from "@/services/ai/system-prompts/gender-lex.ts"
import { models } from "@/services/ai/models.ts"

export async function genderLex(text: string) {
    const { object } = await generateObject({
        model: models.Gemma2_9b_it,
        prompt: text,
        system: genderLexSystemPrompt,
        schema: genderLexSchema,
    })

    return object
}
