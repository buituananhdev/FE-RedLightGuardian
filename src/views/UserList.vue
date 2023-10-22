<template>
    <div class="page-users">
        <button class="page-users" @click="showPopup">
            <img src="@/assets/icons/close-icon.svg" alt="">
        </button>
        <table-view
            :listHeader="listHeader"
            :requestUrl="'/test'"
            ref="tableview"
            :listData="listData"
            class="page-users__table"
        >
            <template v-slot:tbody>
                <div
                    class="page-users__table__row"
                    v-for="(item, index) in listData"
                    :key="item.id"
                    :class="!(index % 2) ? 'bold' : ' unbold'"
                >
                    <span class="page-users__table__row__id">{{ index + 1 }}</span>
                    <span class="page-users__table__row__username" @click="getSingleUser(item.id)">{{ item.username }}</span>
                    <div class="page-users__table__row__action">
                        <img src="@/assets/icons/edit-icon.svg" alt="edit" @click="showUpdate(item.id)" />
                        <img src="@/assets/icons/delete-icon.svg" alt="delete" @click="deleteUser(item.id)" /></div>
                </div>
            </template>
        </table-view>
        <panel-view
            :title="title"
            :isEdit="isEdit"
            class="page-users__panel"
            v-if="isShowDetail"
            @close-panel="isShowDetail = false"
            @update-object="updateUser"
        >
        <template v-slot:pbody>
            <div class="page-users__panel__content">
                <div class="label-input">
                    <span >Username:</span>
                    <input type="text" v-model="currentUser.username" name="" id="name" :disabled="!isEdit">
                </div>
                <div class="label-input">
                    <span>Password:</span>
                    <input type="password" v-model="currentUser.password" name="" id="address" :disabled="!isEdit">
                </div>
            </div>
        </template>
        </panel-view>
        <div class="page-users__overlay" v-if="isShowPopup"></div>
        <popup-view
            title="Create User"
            class="page-users__popup"
            v-if="isShowPopup"
            @onCancel="hiddenPopup"
            @onOk="createUser"
        >
            <template v-slot:popupbody>
                <div class="label-input">
                    <span >Username:</span>
                    <input type="text" v-model="currentUser.username" name="" id="name" >
                </div>
                <div class="label-input">
                    <span>Password:</span>
                    <input type="password" v-model="currentUser.password" name="" id="address" >
                </div>
            </template>
        </popup-view>
        <div>
    </div>
    </div>
</template>

<script>
import { deleteUser, getAllUsers, getSingleUser, updateUser, addUser } from '@/services/user.service'
import ModalReason from '@/components/modals/ModalReason.vue'
import ModalAlert from '@/components/modals/ModalAlert.vue'

export default {
  components: { ModalReason, ModalAlert },
    data() {
        return {
            listHeader: [
                {
                    title: 'Id Citizen',
                    width: 20,
                },
                {
                    title: 'User Name',
                    width: 50,
                },
                {
                    title: 'Action',
                    width: 30,
                },
            ],
            listData: [],
            currentUser: {},
            isEdit: false,
            isShowDetail: false,
            title: 'View Detail',
            isShowPopup: false,
        }
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        async fetchData() {
            try {
                const res = await getAllUsers();
                this.listData = res.data.data
            } catch (error) {
                console.error(error)
            }
        },
        async deleteUser(id) {
            try {
                const res = await deleteUser(id);
                if(res.data.status === "success") {
                    this.listData  = this.listData.filter( user => user.id !== id);
                    this.$notify({
                        type: 'success',
                        title: 'Delete User',
                        text: 'Delete user successfully!',
                    })
                }
            } catch (error) {
                $notify({
                        type: 'error',
                        title: 'Delete User',
                        text: 'Delete user failed!',
                        duration: 1000,
                    })
            }
            
        },
        async getSingleUser(id) {
            try {
                const res = await getSingleUser(id);
                this.currentUser = res.data.data;
                localStorage.setItem('idUser', this.currentUser.id);
                this.isShowDetail = true;   
            } catch (error) {
                console.error(error);
            }
        },
        async updateUser(){
            const id = localStorage.getItem('idUser');
            try {
                const res = await updateUser(id, this.currentUser);
                if(res.data.status === "success") {
                    this.isShowDetail = false;
                    this.isEdit = false;
                    this.$notify({
                        type: 'success',
                        title: 'Update User',
                        text: 'Update user successfully!',
                    })
                }
            } catch (error) {
                console.error(error);
                $notify({
                        type: 'error',
                        title: 'Update User',
                        text: 'Update user failed!',
                        duration: 1000,
                    })
            }
        },
        showUpdate(id) {
            this.isEdit = true;
            this.isShowDetail = true;
            this.getSingleUser(id);
        },
        showPopup() {
            this.currentUser = {};
            this.isShowPopup = true;
        },
        hiddenPopup(){
            this.isShowPopup = false;
        },
        async createUser(){
            console.log('this.currentUser',this.currentUser);
            try {
                const res = await addUser(this.currentUser);
                if(res.data.status === "success") {
                    this.isShowPopup = false;
                    this.$notify({
                        type: 'success',
                        title: 'Add User',
                        text: 'Add user successfully!',
                    })
                }
            } catch (error) {
                console.error(error);
                $notify({
                        type: 'error',
                        title: 'Add User',
                        text: 'Add user failed!',
                        duration: 1000,
                    })
            }

        }

    },
}
</script>
<style lang="scss" scoped>
.page-users {
    width: 100%;
    height: 100vh;
    display: flex;
    &__table {
        &__row {
            padding: 0 16px;
            padding-right: 20px ;
            display: flex;
            width: 100%;
            gap: 20px;
            background: var(--neutral-100, #fafcfe);
            &.bold {
                background: var(--neutral-300, #f4f7fe);
            }
            span {
                padding: 16px 24px;
                display: flex;
                justify-content: center;
                align-content: center;
            }
            &__id {
                width: 20%;
            }
            &__username {
                width: 50%;
            }
            &__action {
                width: 30%;
                display: flex;
                justify-content: center;
                gap: 10px;
                img {
                    height: 20px;
                    width: 25px;
                }
            }
        }
    }
    &__panel {
        &__content {
            display: flex;
            flex-direction: column;
            input {
                margin-bottom: 10px;
            }
            span {
                padding: 7px 0;
            }
        }
    }
    &__overlay {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 2;
        background-color: $slate-400;
        opacity: 0.7;
    }
    &__popup {
        position: absolute;
        top: 50%; /* Đặt vị trí top ở giữa trang */
        left: 50%; /* Đặt vị trí left ở giữa trang */
        transform: translate(-50%, -50%);
        z-index: 3 ;
    }
}
</style>
