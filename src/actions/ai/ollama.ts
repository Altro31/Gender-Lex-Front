import { defineAction } from "astro:actions"
import { z } from "astro:schema"

export const analyze = defineAction({
    accept: "form",
    input: z.object({
        text: z.string(),
    }),
    handler(input) {
        return input
    },
})
