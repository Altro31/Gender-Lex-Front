import { z } from "astro:schema"
import { availableModelsName } from "@/services/ai/models.ts"

export const modelSchema = z.enum(availableModelsName)
