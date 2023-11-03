<template>
    <div class="fixed top-0 left-0 h-[72px] w-full bg-white z-50 flex justify-between items-center px-5">
        <div></div>
        <div v-if="authStore.isLoggedIn" class="flex items-center gap-5 relative">
            <img
                class="cursor-pointer w-[40px] h-[40px] rounded-full object-cover"
                src="https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-Facebook-cute-cho-con-gai.jpg?ssl=1"
                alt=""
                @click="togglePopup"
            />
            <div
                class="popup bg-white border border-gray-300 shadow-md absolute right-0 top-14 rounded-md w-[100px]"
                :class="{ block: isPopupVisible, hidden: !isPopupVisible }"
            >
                <a href="#" class="block px-4 py-2 hover:bg-gray-100" @click="logout">Log Out</a>
            </div>
        </div>
    </div>
    <PopupEditUsers v-if="isEditPopupVisible" :user="isEditPopupVisible" @close="exitPopupEdit" />
</template>
<script setup>
import { ref } from 'vue'
import { authStore } from '@/stores/auth.store'
import PopupEditUsers from '../Users/PopupEditUsers.vue'
const isPopupVisible = ref(false)
const isEditPopupVisible = ref(false)

const togglePopup = () => {
    console.log('togglePopup')
    console.log(isPopupVisible.value)
    isPopupVisible.value = !isPopupVisible.value
}

const exitPopupEdit = () => {
    isEditPopupVisible.value = false
}

const logout = () => {
    localStorage.clear()
    window.location.href = '/login'
}
</script>
