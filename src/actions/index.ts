import { expressionSchema } from "@/utils/schemas/gender-lex"
import { userSchema } from "@/utils/schemas/user"
import { defineAction } from "astro:actions"
import { z } from "astro:schema"
import { getSession } from "auth-astro/server"
import { registerAnalysis } from "../services/domain/analysis"

export const server = {
    registerAnalysis: defineAction({
        input: z.object({
            text: z.string(),
            expressions: z.array(expressionSchema),
        }),
        async handler({ expressions, text }, { request }) {
            const session = await getSession(request)
            const user = userSchema.safeParse(session?.user)
            if (user.data) registerAnalysis(user.data, text, expressions)
            return {}
        },
    }),
}
