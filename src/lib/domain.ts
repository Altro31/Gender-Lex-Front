import type { AvailableModelsType } from "@/services/ai/models"
import type { AstroGlobal } from "astro"

export function getCurrentModel(Astro: AstroGlobal): AvailableModelsType {
    const model = Astro.cookies.get("MODEL")?.value as
        | AvailableModelsType
        | undefined
    return model ?? "Deepseek R1"
}
