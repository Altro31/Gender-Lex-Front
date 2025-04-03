import { z } from "astro:schema"

export type GoogleLoginEntity = z.infer<typeof googleLoginEntitySchema>
export const googleLoginEntitySchema = z.object({
    jwt: z.string().jwt(),
    user: z.object({
        id: z.string(),
        email: z.string(),
        provider: z.enum(["Local", "Google"]),
        createdAt: z.coerce.date(),
    }),
})
