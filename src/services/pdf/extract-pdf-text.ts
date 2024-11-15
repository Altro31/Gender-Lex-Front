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
import { Readable } from "node:stream"

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

    const outputFilePath = "./ExtractTextInfoFromPDF.zip"
    console.log(`Saving asset at ${process.cwd()}/${outputFilePath}`)

    const writeStream = fs.createWriteStream(outputFilePath)
    streamAsset.readStream.pipe(writeStream)

    let zip = new AdmZip(outputFilePath)
    let jsondata = zip.readAsText("structuredData.json")
    let data = JSON.parse(jsondata)

    const text = data.elements.reduce(
        (acc: string, curr: any) => (curr.Text ? acc + "\n" + curr.Text : acc),
        "",
    )

    return text as string
}
