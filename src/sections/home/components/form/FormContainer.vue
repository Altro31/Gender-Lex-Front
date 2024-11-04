<script setup lang="ts">
    import { useForm } from "vee-validate"
    import { Button } from "@/components/ui/button"
    import {
        Image as ImageIcon,
        Paperclip as PaperclipIcon,
    } from "lucide-vue-next"
    import SendButton from "@/sections/home/components/form/SendButton.vue"
    import { formSchema } from "@/sections/home/components/form/form-schema.ts"
    import FormBody from "@/sections/home/components/form/FormBody.vue"

    useForm({
        validationSchema: formSchema,
    })
</script>

<template>
    <FormBody />
    <div class="flex h-full items-center justify-end gap-2 pr-2">
        <Button variant="ghost" size="icon" class="h-8 w-8" disabled>
            <PaperclipIcon class="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" class="h-8 w-8" disabled>
            <ImageIcon class="h-4 w-4" />
        </Button>
        <SendButton />
    </div>
</template>
