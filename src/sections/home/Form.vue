<template>
    <div class="mb-8 flex justify-center">
        <Button variant="outline" size="sm" class="gap-2">
            <RefreshCwIcon class="h-4 w-4" />
            Refresh Prompts
        </Button>
    </div>

    <div class="relative">
        <Input
            class="rounded-xl pl-4 pr-24"
            placeholder="Analizar un texto..."
            type="text"
        />
        <div class="flex h-full items-center justify-end gap-2 pr-2">
            <Button variant="ghost" size="icon" class="h-8 w-8">
                <PaperclipIcon class="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" class="h-8 w-8">
                <ImageIcon class="h-4 w-4" />
            </Button>
            <Button size="sm" class="rounded-lg"> Send </Button>
        </div>
    </div>
</template>

<script setup>
    import { Button } from "@/components/ui/button"
    import { Input } from "@/components/ui/input"
    import {
        Image as ImageIcon,
        Paperclip as PaperclipIcon,
        RefreshCw as RefreshCwIcon,
    } from "lucide-vue-next"
</script>
