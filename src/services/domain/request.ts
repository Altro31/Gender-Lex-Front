import { getUser } from "@/lib/auth"
import { getPrisma } from "@/lib/prisma/prisma-instance"
import schemas from "@zenstackhq/runtime/zod/models"
import type { z } from "astro:content"

type RequestCreateInput = z.infer<typeof schemas.RequestCreateSchema>

interface FindAllArgs {
    page?: number
    limit?: number
}

export class RequestRepository {
    static async create(data: RequestCreateInput, request: Request) {
        const user = await getUser(request)
        if (!user) return
        const prisma = getPrisma(user)
        return prisma.request.create({ data })
    }

    static async findOne(id: string, request: Request) {
        const user = await getUser(request)
        if (!user) return
        const prisma = getPrisma(user)

        return prisma.request.findUnique({ where: { id } })
    }

    static async findAll(
        { limit = 5, page = 1 }: FindAllArgs,
        request: Request,
    ) {
        const user = await getUser(request)
        if (!user) return
        const prisma = getPrisma(user)

        const requestsPromise = prisma.request.findMany({
            skip: limit * (page - 1),
            take: limit,
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                createdAt: true,
                originalText: true,
                Analysis: true,
            },
        })
        const totalPagesPromise = prisma.request.count()

        const [requests, totalPages] = await Promise.all([
            requestsPromise,
            totalPagesPromise,
        ])

        return {
            requests,
            totalPages: Math.ceil(totalPages / limit),
        }
    }
}
