import { z } from "astro:schema"

export const analyzeTextInputSchema = z.object({
    text: z.string().min(1),
})
