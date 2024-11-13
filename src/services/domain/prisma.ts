import { PrismaClient } from "@prisma/client"

export class PrismaService {
    private static instance: PrismaClient

    static getInstance() {
        if (!this.instance) {
            this.instance = new PrismaClient()
        }
        return this.instance
    }
}
