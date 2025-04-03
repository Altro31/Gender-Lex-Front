import { PrismaClient as PrismaClientOld } from "@prisma/client"
import type { PrismaClient } from "@zenstackhq/runtime"

export class PrismaService {
    private static instance: PrismaClient

    static getInstance() {
        if (!this.instance) {
            this.instance = new PrismaClientOld({
                transactionOptions: {
                    timeout: 120000,
                },
            }) as any
        }
        return this.instance
    }
}
