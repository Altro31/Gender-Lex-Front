import type { ExpressionType } from "@/utils/schemas/gender-lex"
import type { User } from "@auth/core/types"
import { PrismaClient, type Expression } from "@prisma/client"

const prisma = new PrismaClient()

export async function initializeAnalysis(text: string, user: User) {
    const { id } = await prisma.analysis.create({
        data: {
            originalContent: text,
            User: {
                connectOrCreate: {
                    create: {
                        email: user.email!,
                        name: user.name!,
                    },
                    where: {
                        email: user.email!,
                    },
                },
            },
        },
        select: { id: true },
    })

    return id
}

export async function completeAnalysisCreating(
    analysisId: number,
    expressions: ExpressionType[],
) {
    console.log("🚀 ~ analysisId:", analysisId)
    console.log("🚀 ~ completeAnalysisCreating ~ expressions:", expressions)

    const analysis = await prisma.analysis.findUnique({
        where: { id: analysisId },
    })

    return prisma.expression.createMany({
        data: expressions.map((expression) => ({
            ...expression,
            analysis_id: analysisId,
        })),
    })
}

export async function getCachedResponse(text: string) {
    const result = await prisma.analysis.findFirst({
        where: { originalContent: text },
        include: { Expressions: true },
    })

    return result?.Expressions
}
