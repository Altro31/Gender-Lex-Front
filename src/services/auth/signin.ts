import type {
    BuiltInProviderType,
    RedirectableProviderType,
} from "@auth/core/providers"
import { navigate } from "astro/virtual-modules/transitions-router.js"
import type {
    LiteralUnion,
    SignInAuthorizationParams,
    SignInOptions,
} from "next-auth/react"

interface AstroSignInOptions extends SignInOptions {
    /** The base path for authentication (default: /api/auth) */
    prefix?: string
}

export async function signIn<
    P extends RedirectableProviderType | undefined = undefined,
>(
    providerId?: LiteralUnion<
        P extends RedirectableProviderType
            ? P | BuiltInProviderType
            : BuiltInProviderType
    >,
    options?: AstroSignInOptions,
    authorizationParams?: SignInAuthorizationParams,
) {
    const { callbackUrl = window.location.href, redirect = true } =
        options ?? {}
    const { prefix = "/api/auth", ...opts } = options ?? {}

    // TODO: Support custom providers
    const isCredentials = providerId === "credentials"
    const isEmail = providerId === "email"
    const isSupportingReturn = isCredentials || isEmail

    // TODO: Handle custom base path
    const signInUrl = `${prefix}/${isCredentials ? "callback" : "signin"}/${providerId}`

    const _signInUrl = `${signInUrl}?${new URLSearchParams(authorizationParams)}`

    // TODO: Handle custom base path
    const csrfTokenResponse = await fetch(`${prefix}/csrf`)
    const { csrfToken } = await csrfTokenResponse.json()

    const res = await fetch(_signInUrl, {
        method: "post",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Auth-Return-Redirect": "1",
        },
        body: new URLSearchParams({
            ...opts,
            csrfToken,
            callbackUrl,
        }),
    })

    const data = await res.clone().json()
    const error = new URL(data.url).searchParams.get("error")

    if (redirect || !isSupportingReturn || !error) {
        // TODO: Do not redirect for Credentials and Email providers by default in next major
        navigate(data.url ?? callbackUrl)
        navigate("")
        // If url contains a hash, the browser does not reload the page. We reload manually
        if (data.url.includes("#")) navigate("")
        return
    }

    return res
}
