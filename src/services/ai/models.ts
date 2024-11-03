import { provider } from "@/services/ai/provider.ts"

export namespace models {
    export const Llama3_8b = provider("llama3-8b-8192")
    export const Gemma2_9b_it = provider("gemma2-9b-it")
}
