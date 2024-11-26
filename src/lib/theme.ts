import type { AstroCookies } from "astro"

export function getPreferredThemeFromAstroCookies(cookies: AstroCookies) {
    const isDark = cookies.get("THEME_DARK")?.boolean() ?? false
    return isDark ? "dark" : "light"
}
