import schemas from "@zenstackhq/runtime/zod/models"

export const genderLexSchema = schemas.RequestSchema.omit({
    id: true,
    createdAt: true,
    User: true,
    userEmail: true,
})
