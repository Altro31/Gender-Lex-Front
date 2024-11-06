<script setup lang="ts">
    import { RefreshCwIcon } from "lucide-vue-next"
    import { Button } from "~ui/button"
</script>

<template>
    <Button
        size="sm"
        class="rounded-lg transition-opacity"
        disabled
        id="submit-button"
    >
        <div class="flex gap-1 group-data-[loading=false]:hidden">
            <span class="animate-spin">
                <RefreshCwIcon />
            </span>
            <span>Analizando</span>
        </div>
        <span data-loading="false" class="group-data-[loading=true]:hidden"
            >Enviar</span
        >
    </Button>
</template>
