import { google, groq } from "@/services/ai/providers"

export namespace models {
    export const Llama = groq("llama-3.3-70b-versatile")
    export const Gemma = groq("gemma2-9b-it")
    export const Gemini = google("gemini-1.5-flash")
}
