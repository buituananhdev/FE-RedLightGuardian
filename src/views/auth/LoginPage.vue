<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div class="max-w-md w-full">
            <h2 class="text-center text-2xl font-bold text-gray-800 mb-6">Sign in to your dashboard</h2>

            <div class="flex items-center justify-center space-x-2 my-4">
                <span class="h-px w-full bg-gray-300"></span>
                <span class="px-2 text-gray-500">or</span>
                <span class="h-px w-full bg-gray-300"></span>
            </div>

            <form class="space-y-4" @submit.prevent="submit">
                <div class="relative text-gray-400">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                        </svg>
                    </span>
                    <input
                        id="user"
                        v-model="username"
                        name="user"
                        type="user"
                        autocomplete="user"
                        class="w-full py-4 text-sm text-gray-900 rounded-md pl-10 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                        placeholder="Username"
                        required=""
                    />
                </div>
            </form>
        </div>
        <!-- <div ref="googleLoginBtn" /> -->
    </div>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { initAuthStore } from '@/stores/auth.store'
import { loginApi, loginGGApi } from '@/services/auth.service'
import { useNotification } from '@kyvg/vue3-notification'
const notification = useNotification()
const router = useRouter()
const username = ref('')
const password = ref('')
// const googleLoginBtn = ref()
// onMounted(() => {
//   console.log('onBeforeMount')
//   const gClientId = '539910609167-67i01tcoja47s71qshaeodhcc69d5u99.apps.googleusercontent.com'
//   window.google.accounts.id.initialize({
//     client_id: gClientId,
//     scope: 'user profile openid',
//     callback: handleCredentialResponse,
//     auto_select: true,
//   })
//   window.google.accounts.id.renderButton(googleLoginBtn.value, { theme: 'outline', size: 'large', width: '400' })
//   window.google.accounts.id.prompt()
// })

const handleCredFentialResponse = async (res) => {
    try {
        await loginGGApi({ credential: res.credential }).then((res) => {
            const data = res.data
            console.log('data', res.data)
            localStorage.setItem('access_token', data.access_token)
            localStorage.setItem('refresh_token', data.refresh_token)
        })
        await initAuthStore()
        router.push('/')
    } catch (error) {
        notification.notify({
            type: 'error',
            title: 'Đăng nhập thất bại, vui lòng kiểm tra lại thông tin đăng nhập',
            text: error.response.data.message,
        })
    }
}

const submit = async () => {
    try {
        await loginApi({ username: username.value, password: password.value }).then((res) => {
            const data = res.data.data
            console.log('data', data)
            localStorage.setItem('access_token', data.access_token)
            localStorage.setItem('refresh_token', data.refresh_token)
        })
        // await initAuthStore()
        router.push('/')
    } catch (error) {
        notification.notify({
            type: 'error',
            title: 'Đăng nhập thất bại, vui lòng kiểm tra lại thông tin đăng nhập',
            text: error.response.data.message,
        })
        console.log(error)
    }
}
</script>
