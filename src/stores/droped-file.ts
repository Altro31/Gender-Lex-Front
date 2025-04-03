import { signal } from "@preact/signals"

export const droppedFileStore = signal<File | null>(null)
