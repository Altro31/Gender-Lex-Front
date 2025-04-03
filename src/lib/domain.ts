import type { AvailableModelsType, Model } from "@/services/ai/models"
import type { AstroGlobal } from "astro"

export function getCurrentModel(Astro: AstroGlobal): Model {
    const model = Astro.cookies.get("MODEL")?.value as Model | undefined
    return model ?? "deepseek"
}
