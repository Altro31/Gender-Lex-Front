<script setup lang="ts">
    import { Avatar, AvatarImage, AvatarFallback } from "~ui/avatar"
</script>

<template>
    <Avatar>
        <AvatarImage
            src="https://astro.build/_astro/fail-houston.ZVrSplAD.webp"
        />
        <AvatarFallback>A</AvatarFallback>
    </Avatar>
</template>
