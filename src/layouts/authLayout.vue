<template>
    <div v-if="authStore.isLoggedIn" class="flex min-h-screen">
        <div class="flex flex-col flex-grow bg-[#f4f6f9]">
            <the-header />
            <div class="mb-auto flex">
                <the-sidebar />
                <div class="w-full mt-[60px] rounded-3xl">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import TheSidebar from '@/components/layouts/TheSidebar.vue'
import TheHeader from '@/components/layouts/TheHeader.vue'
import { authStore } from '@/stores/auth.store'
</script>
