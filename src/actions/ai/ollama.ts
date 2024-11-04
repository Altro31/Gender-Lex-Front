import { genderLexStream } from "@/services/domain/gender-lex.ts"
import { defineAction } from "astro:actions"
import { z } from "astro:schema"

export const analyze = defineAction({
    accept: "form",
    input: z.object({
        text: z.string(),
    }),
    handler(input, ctx) {
        return input
    },
})
