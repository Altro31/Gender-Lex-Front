import { z } from "astro:schema"

export const genderLexSchema = z.object({
    expressions: z.array(
        z.object({
            content: z.string(),
            biasRate: z.number().min(0).max(1),
            justification: z.string(),
            fixedExample: z.string(),
        }),
    ),
})
