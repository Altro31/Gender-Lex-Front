import { PDFServices } from "@adobe/pdfservices-node-sdk"

import { ServicePrincipalCredentials } from "@adobe/pdfservices-node-sdk"
import {
    PDF_SERVICES_CLIENT_ID,
    PDF_SERVICES_CLIENT_SECRET,
} from "astro:env/server"

const credentials = new ServicePrincipalCredentials({
    clientId: PDF_SERVICES_CLIENT_ID,
    clientSecret: PDF_SERVICES_CLIENT_SECRET,
})

export const pdfServices = new PDFServices({ credentials })
