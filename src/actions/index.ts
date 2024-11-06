import { defineAction } from "astro:actions"
import { z } from "astro:schema"

export const server = {
    analyzeText: defineAction({
        accept: "form",
        input: z.object({
            text: z.string(),
        }),
        async handler(input) {
            return input
        },
    }),
}
