import { atom } from "nanostores"

export const $analyzeText = atom("")
export const $analyzeFile = atom<string | undefined>()
