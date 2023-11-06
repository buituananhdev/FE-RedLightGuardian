<template>
    <div class="relative flex items-center w-full px-4">
        <button-vue :type-btn="'secondary'" :width="'100px'" class="tableview__header__button" @click="show = !show">
            Filter
        </button-vue>
        <div class="absolute top-12 right-0 z-10 w-48 p-3 bg-white rounded-lg shadow">
            <h6 class="mb-3 text-sm font-medium text-gray-900">Status</h6>
            <ul class="space-y-2 text-sm"></ul>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const show = ref(false)
</script>
