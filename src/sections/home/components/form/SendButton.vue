<script setup lang="ts">
    import { Button } from "@/components/ui/button"
    import { useFieldValue } from "vee-validate"
    import { ref } from "vue"
    import { RefreshCw as RefreshCwIcon } from "lucide-vue-next"

    const text = useFieldValue("text")
    const loading = ref(false)

    function handleClick(e: Event) {
        const target = e.target as HTMLButtonElement
        target.click()
        loading.value = true
    }
</script>

<template>
    <div>
        <Button
            size="sm"
            class="rounded-lg transition-opacity"
            :disabled="!text || loading"
            type="submit"
            @click="handleClick"
        >
            <template v-if="loading">
                <span class="animate-spin">
                    <RefreshCwIcon />
                </span>
                Analizando
            </template>
            <template v-else> Enviar</template>
        </Button>
    </div>
</template>
