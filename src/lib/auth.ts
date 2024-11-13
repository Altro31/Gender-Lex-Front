import type { User } from "@auth/core/types"
import { getSession } from "auth-astro/server"

export async function getUser<T = User>(request: Request) {
    const session = await getSession(request)
    return session?.user as T | undefined
}
