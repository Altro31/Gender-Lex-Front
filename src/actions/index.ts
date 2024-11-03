import { defineAction } from "astro:actions"
import { z } from "astro:schema"
import * as ai from "@/actions/ai"

export const server = {
    ai,
}
