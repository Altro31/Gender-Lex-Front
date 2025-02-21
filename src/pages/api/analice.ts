import { availableModelsName } from "@/services/ai/models"
import { genderLex } from "@/services/domain/gender-lex"
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
    const { success, data, error } = analiceInput.safeParse(
        await request.json(),
    )
    if (!success) {
        return Response.json(error, {
            status: 400,
            statusText: "Bad request",
        })
    }

    const { object } = await genderLex(data.text, data.model)

    return Response.json(object)
}

const analiceInput = z.object({
    text: z.string(),
    model: z.enum(availableModelsName).default("Gemini 2.0"),
})
