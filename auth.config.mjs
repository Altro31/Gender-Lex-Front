import { getPrisma } from "@/lib/prisma/prisma-instance"
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
    events: {
        async signIn({ user }) {
            getPrisma(user)
                .user.create({
                    data: {
                        email: user.email,
                    },
                })
                .catch(() => {})
        },
    },
})
