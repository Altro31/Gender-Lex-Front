import type { FileRouter } from "@/services/uploadthing"
import { generateReactHelpers } from "@uploadthing/react"

export const { useUploadThing } = generateReactHelpers<FileRouter>()
