// @ts-check
import { signIn } from "@/services/auth/google"
import Google from "@auth/core/providers/google"
import { AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET } from "astro:env/server"
import { defineConfig } from "auth-astro"

export default defineConfig({
    providers: [
        Google({
            clientId: AUTH_GOOGLE_ID,
            clientSecret: AUTH_GOOGLE_SECRET,
        }),
    ],
    callbacks: {
        async jwt({ token, account, user }) {
            let newToken = token
            if (account?.provider === "google" && account.access_token) {
                const data = await signIn(account.access_token)
                newToken = {
                    ...newToken,
                    ...data,
                }
            }
            return newToken
        },
        async session({ session, token }) {
            return {
                ...session,
                jwt: token.jwt,
                user: {
                    ...session.user,
                    ...(token.user as any),
                },
            }
        },
    },
})
