import { z } from "astro:schema"

export const expressionSchema = z.object({
    originalText: z.string(),
    biasRate: z.number(),
    justification: z.string(),
    alternative: z.string(),
})
export type ExpressionType = z.infer<typeof expressionSchema>

export const genderLexSchema = z.object({
    expressions: z.array(expressionSchema),
})
