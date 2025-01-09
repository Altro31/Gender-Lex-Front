import type { GenderLexType } from "@/schemas/gender-lex"
import { genderLex } from "@/services/domain/gender-lex"
import type { APIRoute } from "astro"
import fs from "fs"

function saveFile(object: GenderLexType) {
    const jsonString = JSON.stringify(object, null, 2)
    fs.writeFileSync(`${object.originalText.slice(0, 20)}.json`, jsonString)
}

export const GET: APIRoute = async () => {
    const result = await genderLex("Todas son iguales")
    saveFile(result.object)
    return new Response("Hola")
}
