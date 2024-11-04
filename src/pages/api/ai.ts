import { genderLex } from "@/services/domain/gender-lex"
import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ request }) => {
    const body = await request.json()
    const text = body.text
    console.log("🚀 ~ constPOST:APIRoute= ~ text:", text)

    const res = await genderLex(text)

    // const toJson = new TransformStream({
    //     transform(chunk, controller) {
    //         controller.enqueue(JSON.stringify(chunk))
    //     },
    // })

    // const jsonStream = partialObjectStream.pipeThrough(toJson)

    return Response.json(res)
}
