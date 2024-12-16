import { themes } from "@/constants/theme"
import { z } from "astro:schema"

export const themeSchema = z.enum(themes)
export type ThemeType = z.infer<typeof themeSchema>
