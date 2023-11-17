<template>
    <div class="fixed top-0 left-0 h-[60px] w-full bg-white z-50 flex justify-between items-center px-5">
        <div></div>
        <div v-if="authStore.isLoggedIn" class="logout-container">
            <img
                class="logout-container__avatar"
                src="https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-Facebook-cute-cho-con-gai.jpg?ssl=1"
                alt=""
                @click="togglePopup"
            />
            <div class="logout-container__dropdown" :class="{ hidden: !isPopupVisible }">
                <div class="logout-container__dropdown__info">
                    <img
                        src="https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-Facebook-cute-cho-con-gai.jpg?ssl=1"
                        alt=""
                    />
                    <span>Admin</span>
                </div>
                <hr />
                <div class="logout-container__dropdown__logout">
                    <img src="@/assets/icons/logout-icon.svg" alt="" />
                    <a href="" @click="logout">Logout</a>
                </div>
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
<style lang="scss" scoped>
.logout-container {
    display: flex;
    gap: 5px;
    padding-right: 6px;
    &__avatar {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        cursor: pointer;
        position: relative;
    }
    &__dropdown {
        position: absolute;
        top: 64px;
        right: 16px;
        width: 200px;
        background-color: $neutral-100;
        border-radius: 8px;
        border: 1px solid $gray-400;
        &__info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: auto;
            img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                margin: 12px;
            }
        }
        &__logout {
            display: flex;
            padding: 12px;
            gap: 4px;
            cursor: pointer;
            &:hover {
                background-color: $gray-300;
            }
        }
    }
}
</style>
