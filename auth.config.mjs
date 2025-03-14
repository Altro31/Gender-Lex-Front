// @ts-check
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
            if (!user.email) throw new Error("User email must be provided")
            const prisma = getPrisma(user)
            const existingUser = await prisma.user.findUnique({
                where: { email: user.email },
            })
            if (!existingUser)
                await prisma.user.create({
                    data: { email: user.email },
                })
        },
    },
})
