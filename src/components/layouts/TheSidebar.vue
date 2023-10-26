<template>
    <div class="">
        <div class="w-[280px]"></div>
        <div class="w-[280px] h-[100vh] bg-white fixed top-0 left-0 z-[50]">
            <div class="flex justify-between">
                <img
                    class="w-[180px] object-contain mt-5 ml-4"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/2560px-Amazon_Web_Services_Logo.svg.png"
                    alt=""
                />
                <div
                    class="mt-5 cursor-pointer w-10 h-10 flex justify-center items-center hover:bg-slate-100 rounded-full"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                        <path
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-width="1.5"
                            d="M4 7h3m13 0h-9m9 10h-3M4 17h9m-9-5h16"
                        />
                    </svg>
                </div>
            </div>
            <div class="mt-[10px] py-5 px-5 flex flex-col gap-2">
                <p>HOME</p>
                <router-link
                    to="/"
                    class="hover:bg-slate-100 cursor-pointer py-3 px-5 rounded-[8px] flex items-center gap-3"
                    :class="{ 'bg-[#5d87ff] text-white hover:bg-[#5d87ff]': isDashboard }"
                >
                    <img src="@/assets/icons/home-icon.svg" alt="" />
                    Trang chủ
                </router-link>
                <div class="hover:bg-slate-100 cursor-pointer py-3 px-5 rounded-[8px] flex items-center gap-3">
                    <img src="@/assets/icons/note-icon.svg" alt="" />
                    Thông tin đã gửi
                </div>
                <div class="hover:bg-slate-100 cursor-pointer py-3 px-5 rounded-[8px] flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M2 6V1h5v2H4v3H2Zm18 0V3h-3V1h5v5h-2ZM2 23v-5h2v3h3v2H2Zm15 0v-2h3v-3h2v5h-5ZM5 20V4h14v16H5Zm4-10h6V8H9v2Zm0 3h6v-2H9v2Zm0 3h6v-2H9v2Z"
                        />
                    </svg>
                    Quản lý thông tin
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed, onBeforeMount } from 'vue'
import { authStore } from '@/stores/auth.store'
import { useRoute } from 'vue-router'
const route = useRoute()
const isDashboard = computed(() => route.name === 'dashboard')
const user = computed(() => authStore.value.user)
onBeforeMount(() => {
    console.log(user.value, route)
})
</script>
