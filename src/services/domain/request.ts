import { getUser } from "@/lib/auth"
import { getPrisma } from "@/lib/prisma/prisma-instance"
import schemas from "@zenstackhq/runtime/zod/models"
import type { z } from "astro:content"

type RequestCreateInput = z.infer<typeof schemas.RequestCreateSchema>

export class RequestRepository {
    static async create(data: RequestCreateInput, request: Request) {
        const user = await getUser(request)
        if (!user) return
        const prisma = getPrisma(user)
        return prisma.request.create({ data })
    }
}
