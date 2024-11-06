<script setup lang="ts">
    import { signOut } from "@/utils/auth/sign-out"
    import { Avatar, AvatarImage, AvatarFallback } from "~ui/avatar"

    const props = defineProps<{
        name: string
        img: string
    }>()
</script>

<template>
    <Avatar @click="signOut()" class="cursor-pointer">
        <AvatarImage :src="img" />
        <AvatarFallback />
    </Avatar>
</template>
