import type { APIRoute } from "astro"
import { availableModelsName } from "@/services/ai/models.ts"

export const GET: APIRoute = () => {
    return Response.json(availableModelsName)
}
