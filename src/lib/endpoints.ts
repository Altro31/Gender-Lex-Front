import { API_URL } from "astro:env/server"

export const endpoints = {
    auth: {
        google: {
            callback: API_URL + "/auth/google/callback",
        },
    },
    ai: {
        analice: API_URL + "/ai/analice",
        analiceFile: API_URL + "/ai/analice/file",
    },
    request: {
        root: API_URL + "/request",
        details: API_URL + "/request/:id",
    },
}
