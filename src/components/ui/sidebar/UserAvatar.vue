<script setup lang="ts">
    import { Avatar, AvatarImage, AvatarFallback } from "~ui/avatar"
    import { signIn } from "auth-astro/client"
</script>

<template>
    <Avatar @click="signIn('google')">
        <AvatarImage
            src="https://astro.build/_astro/fail-houston.ZVrSplAD.webp"
        />
        <AvatarFallback>A</AvatarFallback>
    </Avatar>
</template>
