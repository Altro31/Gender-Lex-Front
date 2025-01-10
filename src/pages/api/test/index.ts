import type { GenderLexType } from "@/schemas/gender-lex"
import { genderLex } from "@/services/domain/gender-lex"
import type { APIRoute } from "astro"
import fs from "fs"
import dataset from "test/dataset.json"

function saveFile(object: GenderLexType) {
    const jsonString = JSON.stringify(object, null, 2)
    fs.writeFileSync(
        `test/results/${object.originalText.slice(0, 20)}.json`,
        jsonString,
    )
}

export const GET: APIRoute = async () => {
    const res = []
    for (const data of dataset) {
        const { object } = await genderLex(data)
        res.push(object)
        console.log("Fulfilled")
    }

    return new Response(JSON.stringify(res))
}
