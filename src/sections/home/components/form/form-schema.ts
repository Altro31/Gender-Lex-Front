import { z } from "astro:schema"
import { toTypedSchema } from "@vee-validate/zod"

export const formSchema = toTypedSchema(
    z.object({
        text: z.string(),
    }),
)
