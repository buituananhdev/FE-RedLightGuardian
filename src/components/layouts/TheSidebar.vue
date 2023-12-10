<template>
    <div class="">
        <div class="w-[240px]"></div>
        <div class="w-[240px] h-[100vh] bg-white fixed top-0 left-0 z-[50]">
            <div class="mt-[10px] py-5 px-5 flex flex-col gap-2 sidebar-box">
                <p>SIDEBAR</p>
                <div
                    class="hover:bg-slate-100 cursor-pointer py-3 px-5 rounded-[8px] flex items-center gap-3"
                    :class="{ 'text-[#5d87ff]': isUser }"
                    @click="goToPage('/users')"
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
                </div>
                <div
                    class="hover:bg-slate-100 cursor-pointer py-3 px-5 rounded-[8px] flex items-center gap-3"
                    :class="{ 'text-[#5d87ff]': isOwner }"
                    @click="goToPage('/owners')"
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
                </div>
                <div
                    class="hover:bg-slate-100 cursor-pointer py-3 px-5 rounded-[8px] flex items-center gap-3"
                    :class="{ 'text-[#5d87ff]': isVehicle }"
                    @click="goToPage('/vehicles')"
                >
                    <svg width="20" height="20" viewBox="0 0 0.469 0.469" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fill="currentColor"
                            d="M.432.214.394.178.36.109A.033.033 0 0 0 .332.093H.138A.033.033 0 0 0 .11.109L.075.178.036.214a.016.016 0 0 0-.005.011v.134a.016.016 0 0 0 .016.016H.11C.116.375.126.369.126.362V.344h.219V.36c0 .006.006.016.013.016h.066A.016.016 0 0 0 .44.36V.226A.016.016 0 0 0 .435.215ZM.141.125h.188L.36.188H.11Zm.015.144C.156.275.147.282.14.282H.075C.069.282.062.273.062.266V.231C.065.222.071.215.081.218l.063.013C.15.231.157.24.157.247Zm.25-.003C.406.272.4.282.393.282H.327C.321.282.311.276.311.269V.247c0-.006.006-.016.013-.016L.387.218C.396.215.403.221.406.231Z"
                        />
                    </svg>
                    Phương tiện
                </div>
                <div
                    class="hover:bg-slate-100 cursor-pointer py-3 px-5 rounded-[8px] flex items-center gap-3"
                    :class="{ 'text-[#5d87ff]': isViolation }"
                    @click="goToPage('/violations')"
                >
                    <svg width="20" height="20" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fill="currentColor"
                            d="M4 .625A3.375 3.375 0 1 0 7.375 4 3.379 3.379 0 0 0 4 .625Zm0 6A2.625 2.625 0 1 1 6.625 4 2.628 2.628 0 0 1 4 6.625Zm1.265-3.36L4.53 4l.735.735a.375.375 0 0 1-.53.53L4 4.53l-.735.735a.375.375 0 0 1-.53-.53L3.47 4l-.735-.735a.375.375 0 0 1 .53-.53L4 3.47l.735-.735a.375.375 0 0 1 .53.53Z"
                        />
                    </svg>
                    Vi phạm
                </div>
                <div
                    class="hover:bg-slate-100 cursor-pointer py-3 px-5 rounded-[8px] flex items-center gap-3"
                    :class="{ 'text-[#5d87ff]': isDraw }"
                    @click="goToPage('/drawzone')"
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
                </div>
            </div>
        </div>
    </div>
    <!-- </div> -->
</template>

<script setup>
import { computed, onBeforeMount } from 'vue'
import { authStore } from '@/stores/auth.store'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const isUser = computed(() => route.name === 'users')
const isOwner = computed(() => route.name === 'owners')
const isVehicle = computed(() => route.name === 'vehicles')
const isViolation = computed(() => route.name === 'violations')
const isDraw = computed(() => route.name === 'drawzone')

const user = computed(() => authStore.value.user)
onBeforeMount(() => {
    console.log('sider router', user.value, route)
})

const goToPage = (link) => {
    router.push(`${link}`)
}
</script>
<style>
:root {
    --gradient-default: linear-gradient(135deg, #868cff 0%, #4318ff 100%);
}
.gradient-color {
    color: var(--gradient-default);
}
.sidebar-box {
    margin-top: 42px;
}
</style>
