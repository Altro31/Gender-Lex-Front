import { google, groq } from "@/services/ai/providers"

export namespace models {
    export const Llama3_8b = groq("llama3-8b-8192")
    export const Gemma2_9b_it = groq("gemma2-9b-it")
    export const Gemini_1_5_pro = google("gemini-1.5-pro-latest")
    export const Gemini_1_5_flash = google("gemini-1.5-flash-latest")
}
