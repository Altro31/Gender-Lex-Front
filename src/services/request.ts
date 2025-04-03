import { endpoints } from "@/lib/endpoints"
import { getSession } from "auth-astro/server"
import axios from "axios"

export async function getRequests(page: number, request: Request) {
    const session = await getSession(request)
    const res = await axios.get(endpoints.request.root, {
        headers: { Authorization: "Bearer " + (session as any)?.jwt },
        params: { page },
    })
    console.log((session as any)?.jwt)

    return res.data
}

export async function getRequest(id: string, request: Request) {
    const session = await getSession(request)
    const res = await axios.get(endpoints.request.details.replace(":id", id), {
        headers: { Authorization: "Bearer " + (session as any)?.jwt },
    })
    return res.data
}
