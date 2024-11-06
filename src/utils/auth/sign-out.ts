import { navigate } from "astro:transitions/client"
import type { SignOutParams } from "next-auth/react"

interface AstroSignOutParams extends SignOutParams {
    /** The base path for authentication (default: /api/auth) */
    prefix?: string
}

export async function signOut(options?: AstroSignOutParams) {
    const { callbackUrl = window.location.href, prefix = "/api/auth" } =
        options ?? {}
    // TODO: Custom base path
    const csrfTokenResponse = await fetch(`${prefix}/csrf`)
    const { csrfToken } = await csrfTokenResponse.json()
    const res = await fetch(`${prefix}/signout`, {
        method: "post",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Auth-Return-Redirect": "1",
        },
        body: new URLSearchParams({
            csrfToken,
            callbackUrl,
        }),
    })
    const data = await res.json()

    const url = data.url ?? callbackUrl
    await navigate(url)
}
