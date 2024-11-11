import { z } from "astro:schema"

export const expressionSchema = z.object({
    targetContent: z.string(),
    biasRate: z.number(),
    fixedExample: z.string(),
    justification: z.string(),
})
export type ExpressionType = z.infer<typeof expressionSchema>

export const genderLexSchema = z.object({
    expressions: z.array(expressionSchema),
})
