import schemas from "@zenstackhq/runtime/zod/models"
import { z } from "astro:schema"

export const genderLexSchema = schemas.RequestSchema.omit({
    id: true,
    createdAt: true,
    User: true,
    userEmail: true,
})

export const altGenderLexSchema = z.object({
    originalText: z.string(),
    modifiedText: z.string(),
    conclusion: z.string(),
    Analysis: z.object({
        biasedTerms: z.array(
            z.object({
                content: z.string(),
                influencePercentage: z.number().gte(0).lte(1),
                explanation: z.string(),
            }),
        ),
        biasedMetaphors: z.array(
            z.object({
                content: z.string(),
                influencePercentage: z.number().gte(0).lte(1),
                explanation: z.string(),
            }),
        ),
        additionalContextEvaluation: z.object({
            stereotype: z.object({
                presence: z.boolean(),
                influencePercentage: z.number().gte(0).lte(1),
                explanation: z.string(),
            }),
            powerAsymmetry: z.object({
                presence: z.boolean(),
                influencePercentage: z.number().gte(0).lte(1),
                explanation: z.string(),
            }),
            genderRepresentationAbsence: z.object({
                presence: z.boolean(),
                influencePercentage: z.number().gte(0).lte(1),
                explanation: z.string(),
            }),
        }),
    }),
})
