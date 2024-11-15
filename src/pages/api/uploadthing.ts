import { fileRouter } from "@/services/uploadthing"
import { UPLOADTHING_TOKEN } from "astro:env/server"
import { createRouteHandler } from "uploadthing/server"

// Export routes for Next App Router
const handlers = createRouteHandler({
    router: fileRouter,
    config: {
        token: UPLOADTHING_TOKEN,
    },
})
export { handlers as GET, handlers as POST }
