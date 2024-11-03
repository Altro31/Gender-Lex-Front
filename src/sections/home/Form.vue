<script setup lang="ts">
    import { Button } from "@/components/ui/button"
    import { Input } from "@/components/ui/input"
    import {
        Image as ImageIcon,
        Paperclip as PaperclipIcon,
        RefreshCw as RefreshCwIcon,
    } from "lucide-vue-next"
    import { actions } from "astro:actions"
    import { ref } from "vue"

    interface Expression {
        content: string
        biasRate: number
        justification: string
        fixedExample: string
    }

    const text = ref("")
    const result = ref<Expression[]>([])

    async function handleSubmit() {
        const { data } = await actions.ai.ollama.basicCall({
            prompt: text.value,
        })
        result.value = data?.expressions ?? []
    }

    function getBiasColor(biasRate: number): string {
        if (biasRate < 0.3) return "bg-green-500"
        if (biasRate < 0.7) return "bg-yellow-500"
        return "bg-red-500"
    }
</script>

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
            v-model="text"
        />
        <div class="flex h-full items-center justify-end gap-2 pr-2">
            <Button variant="ghost" size="icon" class="h-8 w-8">
                <PaperclipIcon class="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" class="h-8 w-8">
                <ImageIcon class="h-4 w-4" />
            </Button>
            <Button size="sm" class="rounded-lg" @click.prevent="handleSubmit">
                Send</Button
            >
        </div>
    </div>
    <div v-if="result.length" class="container mx-auto space-y-6 p-4">
        <h1 class="mb-6 text-3xl font-bold">
            Resultados del Análisis de Expresiones
        </h1>

        <div
            v-for="(expression, index) in result"
            :key="expression.content"
            class="overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-800"
        >
            <div class="p-6">
                <h2 class="mb-2 text-xl font-semibold">
                    Expresión {{ index + 1 }}
                </h2>
                <p class="mb-4 text-gray-600 dark:text-gray-400">
                    Contenido original: {{ expression.content }}
                </p>
                <div class="space-y-4">
                    <div>
                        <h3 class="mb-2 font-semibold">Tasa de Sesgo</h3>
                        <div class="flex items-center space-x-2">
                            <div
                                class="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700"
                            >
                                <div
                                    :class="`h-2.5 rounded-full ${getBiasColor(expression.biasRate)}`"
                                    :style="`width: ${expression.biasRate * 100}%`"
                                ></div>
                            </div>
                            <span class="text-sm font-medium"
                                >{{
                                    (expression.biasRate * 100).toFixed(0)
                                }}%</span
                            >
                        </div>
                    </div>
                    <div>
                        <h3 class="mb-2 font-semibold">Justificación</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400">
                            {{ expression.justification }}
                        </p>
                    </div>
                    <div>
                        <h3 class="mb-2 font-semibold">Ejemplo Corregido</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400">
                            {{ expression.fixedExample }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
