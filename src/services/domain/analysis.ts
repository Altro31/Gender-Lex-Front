import type { ExpressionType } from "@/utils/schemas/gender-lex"
import type { User } from "@auth/core/types"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function registerAnalysis(
    user: User,
    text: string,
    expressions: ExpressionType[],
) {
    return prisma.analysis.create({
        data: {
            originalContent: text,
            Expressions: { createMany: { data: expressions } },
            User: {
                connectOrCreate: {
                    where: { email: user.email! },
                    create: { email: user.email!, name: user.name! },
                },
            },
        },
    })
}

export async function getCachedResponse(text: string) {
    const result = await prisma.analysis.findFirst({
        where: { originalContent: text },
        include: { Expressions: true },
    })

    return result?.Expressions
}
