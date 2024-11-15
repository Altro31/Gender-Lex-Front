import { pdfServices } from "@/services/pdf/instance"
import {
    ExtractElementType,
    ExtractPDFJob,
    ExtractPDFParams,
    ExtractPDFResult,
    MimeType,
} from "@adobe/pdfservices-node-sdk"
import AdmZip from "adm-zip"
import fs from "node:fs"
import { Readable, Writable } from "node:stream"

export async function extractPDFText(fileURL: string) {
    const fileResponse = await fetch(fileURL)

    const readStream = Readable.fromWeb(fileResponse.body as any)

    const inputAsset = await pdfServices.upload({
        readStream: readStream,
        mimeType: MimeType.PDF,
    })

    const params = new ExtractPDFParams({
        elementsToExtract: [ExtractElementType.TEXT],
    })

    const job = new ExtractPDFJob({ inputAsset, params })

    const pollingURL = await pdfServices.submit({ job })
    const pdfServicesResponse = await pdfServices.getJobResult({
        pollingURL,
        resultType: ExtractPDFResult,
    })

    // Get content from the resulting asset(s)
    const resultAsset = pdfServicesResponse.result?.resource

    if (!resultAsset) return ""

    const streamAsset = await pdfServices.getContent({ asset: resultAsset })

    const { promise, resolve } = Promise.withResolvers<string>()

    let buffer = Buffer.alloc(0) // Inicializar buffer vacío
    // Crear un WritableStream que escriba en el buffer
    const writableStream = new Writable({
        write(chunk, encoding, callback) {
            buffer = Buffer.concat([buffer, chunk])
            callback()
        },
    }) // Leer el stream y escribirlo en el buffer
    streamAsset.readStream.pipe(writableStream).on("finish", () => {
        // Una vez que se complete la escritura en el buffer, crear el zip en memoria
        const zip = new AdmZip(buffer) // Ahora puedes trabajar con el zip en memoria
        console.log("Zip creado en memoria") // Por ejemplo, podrías extraer los archivos aquí
        let jsondata = zip.readAsText("structuredData.json")
        let data = JSON.parse(jsondata)
        const text = data.elements.reduce(
            (acc: string, curr: any) =>
                curr.Text ? acc + "\n" + curr.Text : acc,
            "",
        )
        resolve(text)
    })

    return promise
}
