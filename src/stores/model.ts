import type { AvailableModelsType } from "@/services/ai/models"
import { signal } from "@preact/signals"

export const model = signal<AvailableModelsType | null>(null)
