import { google, groq } from "@/services/ai/providers"

export namespace models {
    export const Llama = groq("llama-3.2-90b-text-preview")
    export const Gemma = groq("gemma2-9b-it")
    export const Gemini = google("gemini-1.5-flash")
}
