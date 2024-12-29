import { modelSchema } from "@/schemas/models"
import { themeSchema } from "@/schemas/theme"
import { defineAction } from "astro:actions"

export const server = {
    registerTheme: defineAction({
        input: themeSchema,
        handler(theme, context) {
            context.cookies.set("THEME", theme, {
                path: "/",
            })
        },
    }),
    registerModel: defineAction({
        input: modelSchema,
        handler(model, context) {
            context.cookies.set("MODEL", model, {
                path: "/",
            })
        },
    }),
}
