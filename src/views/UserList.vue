<template>
    <div class="container-user">
        <div class="container-user__page table-primary">
            <table-view
                ref="tableview"
                class="container-user__page__table"
                :list-header="listHeader"
                :request-url="'/test'"
                :list-data="listData"
                :search-value-props="searchValue"
                @click-button="showPopup"
                @on-search="onSearchInput"
            >
                <template #tbody>
                    <div
                        v-for="(item, index) in listData"
                        :key="item.id"
                        class="container-user__page__table__row"
                        :class="!(index % 2) ? 'bold' : ' unbold'"
                    >
                        <span class="container-user__page__table__row__id">{{ index + 1 }}</span>
                        <span class="container-user__page__table__row__username">
                            {{ item.username }}
                        </span>
                        <span class="container-user__page__table__row__email">
                            {{ item.email }}
                        </span>
                        <div class="container-user__page__table__row__action">
                            <img src="@/assets/icons/delete-icon.svg" alt="delete" @click="deleteUser(item.id)" />
                        </div>
                    </div>
                </template>
            </table-view>
            <full-modal v-if="isShowPopup">
                <popup-view
                    title="Create User"
                    class="container-user__page__popup"
                    @onCancel="hiddenPopup"
                    @onOk="createUser"
                >
                    <template v-slot:popupbody>
                        <div class="label-input">
                            <span>Username:</span>
                            <input type="text" v-model="currentUser.username" name="" id="name" />
                        </div>
                        <div class="label-input">
                            <span>Password:</span>
                            <input type="password" v-model="currentUser.password" name="" id="address" />
                        </div>
                        <div class="label-input">
                            <span>Email:</span>
                            <input type="email" v-model="currentUser.email" name="" id="email" />
                        </div>
                    </template>
                </popup-view>
            </full-modal>
        </div>
    </div>
</template>

<script>
import { deleteUser, getAllUsers, updateUser, addUser } from '@/services/user.service'
export default {
    data() {
        return {
            listHeader: [
                {
                    title: 'STT',
                    width: 15,
                },
                {
                    title: 'Tên người dùng',
                    width: 35,
                },
                {
                    title: 'Email',
                    width: 30,
                },
                {
                    title: 'Action',
                    width: 20,
                },
            ],
            listData: [],
            currentUser: {},
            isEdit: false,
            title: 'View Detail',
            isShowPopup: false,
            searchValue: '',
            timeOutId: null,
        }
    },
    computed: {
        pageSearch() {
            return this.$route.query.search
        },
    },
    watch: {
        pageParam: async function () {
            this.refreshData()
        },
    },
    created() {
        // this.fetchData()
        console.log('this.pageSearch', this.pageSearch)
        this.searchValue = this.pageSearch
        this.refreshData()
    },
    methods: {
        refreshData() {
            if (this.searchValue !== '') {
                this.Search()
            } else {
                this.fetchData()
            }
        },
        async fetchData() {
            try {
                const res = await getAllUsers()
                this.listData = res.data.data
            } catch (error) {
                console.error(error)
            }
        },
        async deleteUser(id) {
            try {
                const res = await deleteUser(id)
                if (res.data.status === 'success') {
                    this.listData = this.listData.filter((user) => user.id !== id)
                    this.$notify({
                        type: 'success',
                        title: 'Delete User',
                        text: 'Delete user successfully!',
                    })
                }
            } catch (error) {
                this.$notify({
                    type: 'error',
                    title: 'Delete User',
                    text: 'Delete user failed!',
                    duration: 1000,
                })
            }
        },
        async updateUser() {
            const id = localStorage.getItem('idUser')
            try {
                const res = await updateUser(id, this.currentUser)
                if (res.data.status === 'success') {
                    this.isEdit = false
                    this.$notify({
                        type: 'success',
                        title: 'Update User',
                        text: 'Update user successfully!',
                    })
                }
            } catch (error) {
                console.error(error)
                this.$notify({
                    type: 'error',
                    title: 'Update User',
                    text: 'Update user failed!',
                    duration: 1000,
                })
            }
        },
        showPopup() {
            this.currentUser = {}
            this.isShowPopup = true
        },
        hiddenPopup() {
            this.isShowPopup = false
        },
        async createUser() {
            try {
                this.isShowPopup = false
                const res = await addUser(this.currentUser)
                if (res.data.status === 'success') {
                    this.isShowPopup = false
                    this.$notify({
                        type: 'success',
                        title: 'Add User',
                        text: 'Add user successfully!',
                    })
                    this.listData.push(res.data.data)
                }
            } catch (error) {
                console.error(error)
                this.$notify({
                    type: 'error',
                    title: 'Add User',
                    text: 'Add user failed!',
                    duration: 1000,
                })
            }
        },
        async Search() {
            try {
                // const { searchValue } = this
                // let url = `/assets&pageSize=10`
                // if (searchValue) {
                //     url += `&searchQuery=${searchValue}`
                // }
                const res = await getAllUsers(this.searchValue)
                this.listData = res.data.data
                // Lưu trạng thái của selectedOption và searchValue vào URL của trang web
                const query = {}
                if (this.searchValue) {
                    query.search = this.searchValue
                }
                this.$router.push({ path: `/users`, query })
            } catch (error) {
                console.error(error)
            }
        },
        onSearchInput(searchValue) {
            this.searchValue = searchValue
            clearTimeout(this.timeoutId) // xóa bỏ setTimeout() trước đó (nếu có)
            this.timeoutId = setTimeout(() => {
                this.Search()
            }, 700) // tạo mới setTimeout() với thời gian chờ là 700ms
        },
    },
}
</script>
<style lang="scss" scoped>
.container-user {
    background-color: #ffff;
    padding: 20px;
    border-radius: 8px;
    &__page {
        width: 100%;
        height: 100vh;
        display: flex;
        &__table {
            &__row {
                padding: 0 16px;
                padding-right: 20px;
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
                    align-items: center;
                }
                &__id {
                    width: 15%;
                }
                &__username {
                    width: 35%;
                }
                &__email {
                    width: 30%;
                }
                &__action {
                    width: 20%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
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
        &__popup {
            position: absolute;
            top: 50%; /* Đặt vị trí top ở giữa trang */
            left: 50%; /* Đặt vị trí left ở giữa trang */
            transform: translate(-50%, -50%);
            z-index: 3;
        }
    }
}
</style>
