<template>
  <div class="fixed top-0 left-0 h-[72px] w-full bg-white z-50 flex justify-between items-center px-5 ">
    <div></div>
    <div v-if="authStore.user" class="flex items-center gap-5 relative">
      <p>Số dư: {{ authStore.user.balance }}</p>
      <p>Hello, {{ authStore.user.name }}</p>
      <img
        v-if="!authStore.user.avatar"
        class="cursor-pointer w-[40px] h-[40px] rounded-full object-cover"
        src="https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-Facebook-cute-cho-con-gai.jpg?ssl=1"
        alt=""
      />
      <img
        v-if="authStore.user.avatar"
        class="cursor-pointer w-[40px] h-[40px] rounded-full object-cover"
        :src="authStore.user.avatar"
        alt=""
        @click="togglePopup"
      />
      <div
        class="popup bg-white border border-gray-300 shadow-md absolute right-0 top-14 rounded-md"
        :class="{ block: isPopupVisible, hidden: !isPopupVisible }"
      >
        <div class="flex flex-col">
          <div class="px-4 text-sm font-medium pt-2">Xin chào ,{{ authStore.user.name }}!</div>
          <div class="px-4 pb-2 text-xs font-normal text-gray-500">{{ authStore.user.email }}</div>
        </div>
        <div class="border-b-2"></div>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100" @click="editProfile">Edit Profile</a>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100" @click="logout">Log Out</a>
      </div>
      </div>
    </div>
    <PopupEditUsers v-if="isEditPopupVisible" :user="isEditPopupVisible" @close="exitPopupEdit" />

</template>
<script setup>
import { ref, onBeforeMount } from 'vue'
import { authStore } from '@/stores/auth.store'
import PopupEditUsers from '../Users/PopupEditUsers.vue'
const isPopupVisible = ref(false)
const isEditPopupVisible = ref(false)
const emits = defineEmits(['close'])

const togglePopup = () => {
  console.log('togglePopup')
  console.log(isPopupVisible.value)
  isPopupVisible.value = !isPopupVisible.value
}

const editProfile = () => {
  isPopupVisible.value = false 
  isEditPopupVisible.value = true 
}
const exitPopupEdit = () => {
  isEditPopupVisible.value = false
}

const logout = () => {
  localStorage.clear()
  window.location.href = '/login'
}
</script>
