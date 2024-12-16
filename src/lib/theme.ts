import type { ThemeType } from "@/schemas/theme"
import type { AstroCookies } from "astro"

export function getPreferredThemeFromAstroCookies(
    cookies: AstroCookies,
): ThemeType {
    return (cookies.get("THEME")?.value as ThemeType | undefined) ?? "light"
}
