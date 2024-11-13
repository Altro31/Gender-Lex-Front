import { getUser } from "@/lib/auth"
import { PrismaService } from "@/services/domain/prisma"
import { enhance } from "@zenstackhq/runtime"
import type { User } from "@zenstackhq/runtime/models"

export async function getPrisma(request: Request) {
    console.log("🚀 ~ getPrisma ~ request:", request)
    const user = await getUser<User>(request)
    console.log("🚀 ~ getPrisma ~ user:", user)
    const prisma = PrismaService.getInstance()
    if (!user) return enhance(prisma)
    return enhance(prisma, { user })
}
