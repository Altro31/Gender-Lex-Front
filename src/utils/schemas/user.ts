import { z } from "astro:schema"

export const userSchema = z.object({
    name: z.string(),
    email: z.string(),
})
