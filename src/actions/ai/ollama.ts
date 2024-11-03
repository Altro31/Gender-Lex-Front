import { defineAction } from "astro:actions"
import { z } from "astro:schema"
import { genderLex } from "@/services/domain/gender-lex.ts"

export const basicCall = defineAction({
    input: z.object({
        prompt: z.string(),
    }),
    async handler(input) {
        return genderLex(input.prompt)
    },
})
