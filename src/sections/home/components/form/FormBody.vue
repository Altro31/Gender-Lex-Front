<script setup lang="ts">
    import { Input } from "@/components/ui/input"
    import { FormControl, FormField, FormItem } from "@/components/ui/form"
</script>

<template>
    <FormField v-slot="{ componentField }" name="text">
        <FormItem>
            <FormControl>
                <Input
                    type="text"
                    class="rounded-xl pl-4 pr-24"
                    placeholder="Analizar un texto..."
                    v-bind="componentField"
                />
            </FormControl>
        </FormItem>
    </FormField>
</template>
