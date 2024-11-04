import { defineAction } from "astro:actions"
import { z } from "astro:schema"
import { genderLex } from "@/services/domain/gender-lex.ts"

export const basicCall = defineAction({
    accept: "form",
    input: z.object({
        text: z.string(),
    }),
    handler(input) {
        return genderLex(input.text)
    },
})
