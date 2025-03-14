import { themes } from "@/lib/constants"
import { z } from "astro:schema"

export const themeSchema = z.enum(themes)
export type ThemeType = z.infer<typeof themeSchema>
