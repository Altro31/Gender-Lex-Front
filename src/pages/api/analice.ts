import { availableModels, availableModelsName } from "@/services/ai/models"
import type { APIRoute } from "astro"
import { API_KEY } from "astro:env/server"
import { z } from "astro:schema"

export const POST: APIRoute = async ({ request }) => {
    const apiKey = request.headers.get("API_KEY")
    if (apiKey !== API_KEY)
        return new Response(null, {
            status: 401,
            statusText: "Unauthorized",
        })
    const { success, data, error } = await analiceInput.safeParseAsync(
        request.json(),
    )
    if (!success) {
        return Response.json(error, {
            status: 400,
            statusText: "Bad request",
        })
    }
    return Response.json(data)
}

const analiceInput = z.object({
    text: z.string(),
    model: z.enum(availableModelsName).default("Gemini 2.0"),
})
