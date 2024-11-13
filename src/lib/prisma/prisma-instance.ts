import type { Maybe } from "@/lib/types"
import { PrismaService } from "@/services/domain/prisma"
import { enhance } from "@zenstackhq/runtime"
import type { User } from "@zenstackhq/runtime/models"

export function getPrisma(user?: Maybe<Omit<User, "createdAt">>) {
    const prisma = PrismaService.getInstance()
    if (!user?.email) return enhance(prisma)
    return enhance(prisma, { user: { email: user.email } })
}
