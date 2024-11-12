import { z } from "astro:schema"

export function additionalContextEvaluationItemSchema(description: string) {
    return z.object({
        presence: z.boolean({ description: "<true=Sí/false=No>" }),
        influencePercentage: z.coerce
            .number({
                description: "<Porcentaje de influencia en el sesgo general>",
            })
            .min(0)
            .max(1),
        explanation: z.string({ description }),
    })
}

export const additionalContextEvaluationSchema = z.object({
    stereotype: additionalContextEvaluationItemSchema(
        "<Explicación del sesgo de género asociado al estereotipo>",
    ),
    powerAsymmetry: additionalContextEvaluationItemSchema(
        "<Explicación del sesgo de género asociado a la asimetría de poder>",
    ),
    genderRepresentationAbsence: additionalContextEvaluationItemSchema(
        "<Explicación del sesgo de género asociado a la falta de representatividad de género>",
    ),
})

export const biasedMetaphorSchema = z.object({
    metaphor: z.string({
        description: "<Metáfora o expresión figurativa identificada>",
    }),
    influencePercentage: z.coerce
        .number({
            description: "<Porcentaje de influencia en el sesgo general>",
        })
        .min(0)
        .max(1),
    explanation: z.string({
        description:
            "<Explicación detallada del sesgo de género asociado a la metáfora>",
    }),
})

export const biasedTermSchema = z.object({
    term: z.string({ description: "<Término identificado>" }),
    influencePercentage: z.coerce
        .number({
            description: "<Porcentaje de influencia en el sesgo general>",
        })
        .min(0)
        .max(1),
    explanation: z.string({
        description:
            "<Explicación detallada del sesgo de género asociado al término>",
    }),
})

export const analysisSchema = z.object({
    biasedTerms: z.array(biasedTermSchema),
    biasedMetaphors: z.array(biasedMetaphorSchema),
    additionalContextEvaluation: additionalContextEvaluationSchema,
})

export const genderLexSchema = z.object({
    originalText: z.string({
        description: "<Texto original aquí>",
    }),
    analysis: analysisSchema,
    modifiedText: z.string({
        description: "<Texto modificado con cambios subrayados>",
    }),
    conclusion: z.string({
        description: "<Conclusión sobre el análisis del sesgo de género>",
    }),
})
