import { endpoints } from "@/lib/endpoints"
import type { Request as RequestType } from "@zenstackhq/runtime/models"
import { getSession } from "auth-astro/server"
import axios from "axios"

export async function analice(text: string, model: string, request: Request) {
    const session = await getSession(request)
    const res = await fetch(endpoints.ai.analice, {
        method: "POST",
        body: JSON.stringify({
            text,
            model,
        }),
        headers: {
            Authorization: "Bearer " + (session as any)?.jwt,
            "content-type": "application/json",
        },
    })
    return (await res.json()) as RequestType
}

export async function analiceFile(file: File, model: string, request: Request) {
    const session = await getSession(request)
    const formData = new FormData()
    formData.append("file", file)
    formData.append("model", model)
    const res = await fetch(endpoints.ai.analiceFile, {
        method: "POST",
        body: formData,
        headers: {
            Authorization: "Bearer " + (session as any)?.jwt,
        },
    })
    return (await res.json()) as RequestType
}
