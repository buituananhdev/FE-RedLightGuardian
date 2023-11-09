<template>
    <div class="container-user">
        <div class="container-user__page table-primary">
            <table-view
                ref="tableview"
                class="container-user__page__table"
                :list-header="listHeader"
                :list-data="listData"
                :search-value-props="searchValue"
                :is-have-content="isHaveContent"
                :meta="meta"
                @click-button="showPopup"
                @on-search="onSearchInput"
                @go-to-next-page="goToNextPage"
                @go-to-prev-page="goToPrevPage"
            >
                <template #tbody>
                    <div
                        v-for="(item, index) in listData"
                        :key="item.id"
                        class="container-user__page__table__row"
                        :class="!(index % 2) ? 'bold' : ''"
                        @click="getSingleUser(item.id)"
                    >
                        <span class="container-user__page__table__row__id">{{ index + 1 }}</span>
                        <span class="container-user__page__table__row__username">
                            {{ item.username }}
                        </span>
                        <span class="container-user__page__table__row__email">
                            {{ item.email }}
                        </span>
                        <div class="container-user__page__table__row__action">
                            <img src="@/assets/icons/edit-icon.svg" alt="edit" @click="showUpdate(item.id)" />
                            <img
                                src="@/assets/icons/delete-icon.svg"
                                alt="delete"
                                @click.stop="showDeleteVerifiedPopup()"
                            />
                        </div>
                    </div>
                </template>
            </table-view>
            <panel-view
                v-if="isShowDetail"
                :title="title"
                :is-edit="isEdit"
                class="container-user__page__panel"
                @close-panel="closePanelView"
                @update-object="updateUser"
                @allow-update="isEdit = true"
                @cancel="isEdit = false"
            >
                <template #pbody>
                    <div class="container-user__page__panel__content">
                        <div class="label-input">
                            <span>Tên người dùng:</span>
                            <input v-model="currentUser.username" type="text" :disabled="!isEdit" />
                        </div>
                        <div class="label-input">
                            <span>Email:</span>
                            <input v-model="currentUser.email" type="email" :disabled="!isEdit" />
                        </div>
                    </div>
                </template>
            </panel-view>
            <full-modal v-if="isShowPopup">
                <popup-view
                    title="Create Người dùng"
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
            <full-modal v-if="isShowDeleteVerifiedPopup">
                <popup-view
                    title="Xác nhận xóa người dùng"
                    class="container-user__page__popup"
                    @on-cancel="hiddenDeleteVerifiedPopup"
                    @on-ok="deleteUser()"
                >
                    <template #popupbody>
                        <div class="container-user__page__popup__content">
                            <span>Bạn xác nhận sẽ xóa người dùng này?</span>
                        </div>
                    </template>
                </popup-view>
            </full-modal>
        </div>
    </div>
</template>

<script>
import { deleteUser, getAllUsers, updateUser, addUser, getSingleUser } from '@/services/user.service'
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
                    title: 'Hành động',
                    width: 20,
                },
            ],
            listData: [],
            currentUser: {},
            isEdit: false,
            title: 'View Detail',
            isShowDetail: false,
            isShowPopup: false,
            searchValue: '',
            timeOutId: null,
            meta: [],
            currentPage: 1,
            isHaveContent: false,
            isShowDeleteVerifiedPopup: false,
        }
    },
    computed: {
        pageParam() {
            return this.$route.query.page
        },
        pageSearch() {
            return this.$route.query.search
        },
    },
    watch: {
        pageParam: async function () {
            await this.refreshData()
        },
        listData: {
            deep: true,
            immediate: true,
            handler(newVal) {
                if (newVal.length > 0) {
                    this.isHaveContent = true
                } else {
                    this.isHaveContent = false
                }
            },
        },
    },
    created() {
        this.searchValue = this.pageSearch
        this.refreshData()
    },
    methods: {
        async refreshData() {
            if (this.searchValue) {
                await this.Search()
            } else {
                await this.fetchData()
            }
        },
        async fetchData() {
            try {
                const res = await getAllUsers(this.pageParam)
                this.meta = res.data.meta
                this.listData = res.data.data
            } catch (error) {
                console.error(error)
            }
        },
        async getSingleUser(id) {
            try {
                const res = await getSingleUser(id)
                this.currentUser = res.data.data
                localStorage.setItem('idUser', this.currentUser.id)
                this.isShowDetail = true
            } catch (error) {
                console.error(error)
            }
        },
        async deleteUser() {
            const id = localStorage.getItem('idUser')
            try {
                const res = await deleteUser(id)
                if (res.data.status === 'success') {
                    this.isShowDeleteVerifiedPopup = false
                    this.listData = this.listData.filter((user) => user.id !== id)
                    this.$notify({
                        type: 'success',
                        title: 'Xóa Người dùng',
                        text: 'Xóa người dùng thành công!',
                    })
                }
            } catch (error) {
                this.isShowDeleteVerifiedPopup = false
                this.$notify({
                    type: 'error',
                    title: 'Xóa Người dùng',
                    text: 'Xóa người dùng thất bại!',
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
                        title: 'Update Người dùng',
                        text: 'Update người dùng thành công!',
                    })
                }
            } catch (error) {
                console.error(error)
                this.$notify({
                    type: 'error',
                    title: 'Update Người dùng',
                    text: 'Update người dùng thất bại!',
                    duration: 1000,
                })
            }
        },
        showUpdate(id) {
            this.isEdit = true
            this.isShowDetail = true
            this.getSingleUser(id)
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
                        title: 'Add Người dùng',
                        text: 'Add người dùng thành công!',
                    })
                    this.listData.push(res.data.data)
                }
            } catch (error) {
                console.error(error)
                this.$notify({
                    type: 'error',
                    title: 'Add Người dùng',
                    text: 'Add người dùng thất bại!',
                    duration: 1000,
                })
            }
        },
        async Search() {
            try {
                const res = await getAllUsers(this.meta.currentPage, this.searchValue)
                this.meta = res.data.meta
                this.listData = res.data.data
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
            clearTimeout(this.timeoutId)
            this.timeoutId = setTimeout(() => {
                this.Search()
            }, 700)
        },
        goToIndexPage() {
            const query = {}
            query.page = this.currentPage
            if (this.searchValue) {
                query.search = this.searchValue
            }
            console.log('curr', this.currentPage)
            this.$router.push({
                query: query,
            })
        },
        goToNextPage() {
            this.goToIndexPage(this.currentPage++)
        },
        goToPrevPage() {
            this.goToIndexPage(this.currentPage--)
        },
        closePanelView() {
            this.isShowDetail = false
            this.isEdit = false
        },
        showDeleteVerifiedPopup() {
            this.isShowDeleteVerifiedPopup = true
        },
        hiddenDeleteVerifiedPopup() {
            this.isShowDeleteVerifiedPopup = false
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
                cursor: pointer;
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
                        cursor: pointer;
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
