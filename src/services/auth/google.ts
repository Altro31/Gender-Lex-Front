import { endpoints } from "@/lib/endpoints"
import { googleLoginEntitySchema } from "@/schemas/auth"
import axios from "axios"

export async function signIn(access_token: string) {
    const res = await axios.post(endpoints.auth.google.callback, undefined, {
        headers: { Authorization: "Bearer " + access_token },
    })
    return googleLoginEntitySchema.parse(res.data)
}
