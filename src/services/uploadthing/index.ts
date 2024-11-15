import { getSession } from "auth-astro/server"
import {
    createUploadthing,
    type FileRouter as FileRouterType,
} from "uploadthing/server"

const f = createUploadthing()

export const fileRouter = {
    fileUploader: f({
        pdf: { maxFileCount: 1, maxFileSize: "4MB" },
        text: { maxFileCount: 1, maxFileSize: "4MB" },
    })
        .middleware(async ({ req }) => {
            const session = await getSession(req)
            if (!session) throw new Error("Unauthorized")
            return {}
        })
        .onUploadComplete(({ metadata, file }) => {
            return {}
        }),
} satisfies FileRouterType

export type FileRouter = typeof fileRouter
