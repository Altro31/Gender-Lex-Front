import { genderLexStream } from "@/services/domain/gender-lex"
import type { APIRoute } from "astro"
import { z } from "astro:schema"

export const POST: APIRoute = async ({ request }) => {
    const context = await request.json()
    const text = z.string().min(1).parse(context)
    const result = await genderLexStream(text)
    return result.toTextStreamResponse()
}
