import { userSchema } from "@/utils/schemas/user"
import { defineAction } from "astro:actions"
import { z } from "astro:schema"
import { getSession } from "auth-astro/server"
import {
    completeAnalysisCreating,
    initializeAnalysis,
} from "../services/domain/analysis"
import { expressionSchema } from "@/utils/schemas/gender-lex"

export const server = {
    analyzeText: defineAction({
        accept: "form",
        input: z.object({
            text: z.string(),
        }),
        async handler(input, { request }) {
            const session = await getSession(request)
            const user = userSchema.safeParse(session?.user)
            const res = {
                text: input.text,
                id: undefined as number | undefined,
            }
            if (user.data)
                res.id = await initializeAnalysis(input.text, user.data)
            return res
        },
    }),
    completeAnalysisCreating: defineAction({
        input: z.object({
            analysisId: z.number(),
            expressions: z.array(expressionSchema),
        }),
        handler({ analysisId, expressions }) {
            completeAnalysisCreating(analysisId, expressions)
            return {}
        },
    }),
}
