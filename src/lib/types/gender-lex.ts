import type {
    additionalContextEvaluationItemSchema,
    additionalContextEvaluationSchema,
    analysisSchema,
    biasedMetaphorSchema,
    biasedTermSchema,
    genderLexSchema,
} from "@/lib/schemas/gender-lex"
import type { z } from "astro:schema"

export type GenderLexType = z.infer<typeof genderLexSchema>

export type AnalysisType = z.infer<typeof analysisSchema>

export type BiasedTermType = z.infer<typeof biasedTermSchema>

export type BiasedMetaphorType = z.infer<typeof biasedMetaphorSchema>

export type AdditionalContextEvaluationType = z.infer<
    typeof additionalContextEvaluationSchema
>

export type AdditionalContextEvaluationItemType = z.infer<
    ReturnType<typeof additionalContextEvaluationItemSchema>
>
