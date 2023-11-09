<template>
    <div class="">
        <div class="w-[280px]"></div>
        <div class="w-[280px] h-[100vh] bg-white fixed top-0 left-0 z-[50]">
            <div class="mt-[10px] py-5 px-5 flex flex-col gap-2">
                <p>HOME</p>
                <router-link
                    to="/"
                    class="hover:bg-slate-100 cursor-pointer py-3 px-5 rounded-[8px] flex items-center gap-3"
                    :class="{ 'bg-[#5d87ff] text-white hover:bg-[#5d87ff] hover:text-black': isDashboard }"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
                        <defs>
                            <path
                                id="solarHomeBoldDuotone0"
                                d="M10.75 9.5a1.25 1.25 0 1 1 2.5 0a1.25 1.25 0 0 1-2.5 0Z"
                            />
                        </defs>
                        <g fill="currentColor">
                            <path
                                fill-rule="evenodd"
                                d="m21.532 11.586l-.782-.626v10.29H22a.75.75 0 0 1 0 1.5H2a.75.75 0 1 1 0-1.5h1.25V10.96l-.781.626a.75.75 0 1 1-.937-1.172l8.125-6.5a3.75 3.75 0 0 1 4.686 0l8.125 6.5a.75.75 0 1 1-.936 1.172ZM12 6.75a2.75 2.75 0 1 0 0 5.5a2.75 2.75 0 0 0 0-5.5Zm1.746 6.562c-.459-.062-1.032-.062-1.697-.062h-.098c-.665 0-1.238 0-1.697.062c-.491.066-.963.215-1.345.597s-.531.854-.597 1.345c-.062.459-.062 1.032-.062 1.697v4.299h7.5v-4.423c0-.612-.004-1.143-.062-1.573c-.066-.491-.215-.963-.597-1.345s-.853-.531-1.345-.597Z"
                                clip-rule="evenodd"
                            />
                            <g fill-rule="evenodd" clip-rule="evenodd" opacity=".5">
                                <use href="#solarHomeBoldDuotone0" />
                                <use href="#solarHomeBoldDuotone0" />
                            </g>
                            <path
                                d="M12.05 13.25c.664 0 1.237 0 1.696.062c.492.066.963.215 1.345.597s.531.853.597 1.345c.058.43.062.96.062 1.573v4.423h-7.5v-4.3c0-.664 0-1.237.062-1.696c.066-.492.215-.963.597-1.345s.854-.531 1.345-.597c.459-.062 1.032-.062 1.697-.062h.098ZM16 3h2.5a.5.5 0 0 1 .5.5v4.14l-3.5-2.8V3.5A.5.5 0 0 1 16 3Z"
                                opacity=".5"
                            />
                        </g>
                    </svg>
                    Trang chủ
                </router-link>
                <router-link
                    class="hover:bg-slate-100 cursor-pointer py-3 px-5 rounded-[8px] flex items-center gap-3"
                    :class="{ 'bg-[#5d87ff] text-white hover:bg-[#5d87ff] hover:text-black': isDropdownOpen }"
                    to="/users"
                    @click="toggleDropdown"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M2 6V1h5v2H4v3H2Zm18 0V3h-3V1h5v5h-2ZM2 23v-5h2v3h3v2H2Zm15 0v-2h3v-3h2v5h-5ZM5 20V4h14v16H5Zm4-10h6V8H9v2Zm0 3h6v-2H9v2Zm0 3h6v-2H9v2Z"
                        />
                    </svg>
                    Quản lý thông tin
                    <img v-if="!isDropdownOpen" src="@/assets/icons/arrow-bottom-icon.svg" alt="" class="ml-4" />
                    <img v-if="isDropdownOpen" src="@/assets/icons/arrow-top-icon.svg" alt="" class="ml-4" />
                </router-link>
                <!-- Danh sách các trang -->
                <div v-if="isDropdownOpen">
                    <router-link
                        to="/users"
                        class="hover:bg-slate-100 cursor-pointer py-3 px-5 rounded-[8px] flex items-center gap-3"
                        :class="{ 'text-[#5d87ff]': isUser }"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 0.75 0.75"
                            data-name="Flat Color"
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon flat-color"
                        >
                            <path
                                d="M.656.625a.063.063 0 0 1-.063.063H.156A.063.063 0 0 1 .093.625.188.188 0 0 1 .281.437h.188a.188.188 0 0 1 .188.188ZM.375.375A.156.156 0 1 0 .219.219a.156.156 0 0 0 .156.156Z"
                                fill="currentColor"
                            />
                        </svg>
                        Người dùng
                    </router-link>
                    <router-link
                        to="/owners"
                        class="hover:bg-slate-100 cursor-pointer py-3 px-5 rounded-[8px] flex items-center gap-3"
                        :class="{ 'text-[#5d87ff]': isOwner }"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 0.75 0.75"
                            data-name="Flat Color"
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon flat-color"
                        >
                            <path
                                d="M.656.625a.063.063 0 0 1-.063.063H.156A.063.063 0 0 1 .093.625.188.188 0 0 1 .281.437h.188a.188.188 0 0 1 .188.188ZM.375.375A.156.156 0 1 0 .219.219a.156.156 0 0 0 .156.156Z"
                                fill="currentColor"
                            />
                        </svg>
                        Chủ sở hữu
                    </router-link>
                    <router-link
                        to="/vehicles"
                        class="hover:bg-slate-100 cursor-pointer py-3 px-5 rounded-[8px] flex items-center gap-3"
                        :class="{ 'text-[#5d87ff]': isVehicle }"
                    >
                        <svg width="20" height="20" viewBox="0 0 0.469 0.469" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fill="currentColor"
                                d="M.432.214.394.178.36.109A.033.033 0 0 0 .332.093H.138A.033.033 0 0 0 .11.109L.075.178.036.214a.016.016 0 0 0-.005.011v.134a.016.016 0 0 0 .016.016H.11C.116.375.126.369.126.362V.344h.219V.36c0 .006.006.016.013.016h.066A.016.016 0 0 0 .44.36V.226A.016.016 0 0 0 .435.215ZM.141.125h.188L.36.188H.11Zm.015.144C.156.275.147.282.14.282H.075C.069.282.062.273.062.266V.231C.065.222.071.215.081.218l.063.013C.15.231.157.24.157.247Zm.25-.003C.406.272.4.282.393.282H.327C.321.282.311.276.311.269V.247c0-.006.006-.016.013-.016L.387.218C.396.215.403.221.406.231Z"
                            />
                        </svg>
                        Phương tiện
                    </router-link>
                    <router-link
                        to="/violations"
                        class="hover:bg-slate-100 cursor-pointer py-3 px-5 rounded-[8px] flex items-center gap-3"
                        :class="{ 'text-[#5d87ff]': isViolation }"
                    >
                        <svg width="20" height="20" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fill="currentColor"
                                d="M4 .625A3.375 3.375 0 1 0 7.375 4 3.379 3.379 0 0 0 4 .625Zm0 6A2.625 2.625 0 1 1 6.625 4 2.628 2.628 0 0 1 4 6.625Zm1.265-3.36L4.53 4l.735.735a.375.375 0 0 1-.53.53L4 4.53l-.735.735a.375.375 0 0 1-.53-.53L3.47 4l-.735-.735a.375.375 0 0 1 .53-.53L4 3.47l.735-.735a.375.375 0 0 1 .53.53Z"
                            />
                        </svg>
                        Vi phạm
                    </router-link>
                    <router-link
                        to="/drawzone"
                        class="hover:bg-slate-100 cursor-pointer py-3 px-5 rounded-[8px] flex items-center gap-3"
                        :class="{ 'text-[#5d87ff]': isDraw }"
                    >
                        <svg width="20" height="20" viewBox="0 0 2.4 2.4" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fill="currentColor"
                                d="M1.95 1.5a.15.15 0 0 0-.15.15v.45H.3V.6h.45a.15.15 0 0 0 0-.3h-.6A.15.15 0 0 0 0 .45v1.8a.15.15 0 0 0 .15.15h1.8a.15.15 0 0 0 .15-.15v-.6a.15.15 0 0 0-.15-.15Z"
                            />
                            <path
                                fill="currentColor"
                                d="m2.356.344-.3-.3a.15.15 0 0 0-.212 0l-.9.9A.15.15 0 0 0 .9 1.05v.3a.15.15 0 0 0 .15.15h.3a.15.15 0 0 0 .106-.044l.9-.9a.15.15 0 0 0 0-.212ZM1.288 1.2H1.2v-.088l.75-.75.088.088Z"
                            />
                        </svg>
                        Vẽ
                    </router-link>
                    <!-- <router-link
                        to="/cameras"
                        class="hover:bg-slate-100 cursor-pointer py-3 px-5 rounded-[8px] flex items-center gap-3"
                        :class="{ 'text-[#5d87ff]': isCamera }"
                    >
                        <svg width="20" height="20" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fill="currentColor"
                                d="M4 .625A3.375 3.375 0 1 0 7.375 4 3.379 3.379 0 0 0 4 .625Zm0 6A2.625 2.625 0 1 1 6.625 4 2.628 2.628 0 0 1 4 6.625Zm1.265-3.36L4.53 4l.735.735a.375.375 0 0 1-.53.53L4 4.53l-.735.735a.375.375 0 0 1-.53-.53L3.47 4l-.735-.735a.375.375 0 0 1 .53-.53L4 3.47l.735-.735a.375.375 0 0 1 .53.53Z"
                            />
                        </svg>
                        Hình ảnh vi phạm
                    </router-link> -->
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
const isUser = computed(() => route.name === 'users')
const isOwner = computed(() => route.name === 'owners')
const isVehicle = computed(() => route.name === 'vehicles')
const isViolation = computed(() => route.name === 'violations')
// const isCamera = computed(() => route.name === 'cameras')
const isDraw = computed(() => route.name === 'drawzone')

const user = computed(() => authStore.value.user)
onBeforeMount(() => {
    console.log(user.value, route)
})
</script>

<script>
export default {
    data() {
        return {
            isDropdownOpen: false,
            isUser: false, // Đổi giá trị này tùy theo trạng thái người dùng
        }
    },
    methods: {
        toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen
        },
    },
}
</script>
<style>
:root {
    --gradient-default: linear-gradient(135deg, #868cff 0%, #4318ff 100%);
}
.gradient-color {
    color: var(--gradient-default);
}
</style>
