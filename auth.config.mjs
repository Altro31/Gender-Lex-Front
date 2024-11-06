import Google from "@auth/core/providers/google"
import Microsoft from "@auth/core/providers/microsoft-entra-id"
import { defineConfig } from "auth-astro"

export default defineConfig({
    providers: [Google({}), Microsoft({})],
})
