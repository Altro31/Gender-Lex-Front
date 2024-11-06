import { navigate } from "astro:transitions/client"

export async function signOut() {
    const callbackUrl = window.location.href
    const prefix = "/api/auth"

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
