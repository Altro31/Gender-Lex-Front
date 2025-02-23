import { defineMiddleware, sequence } from "astro/middleware"
import { API_KEY } from "astro:env/server"

const apiKeyMiddleware = defineMiddleware(
    async ({ request, originPathname }, next) => {
        if (
            originPathname.startsWith("/api/ai") ||
            originPathname.startsWith("/api/analice")
        ) {
            const apiKey = request.headers.get("API_KEY")
            if (apiKey !== API_KEY)
                return new Response(null, {
                    status: 401,
                    statusText: "Unauthorized",
                })
        }
        return next()
    },
)

export const onRequest = sequence(apiKeyMiddleware)
