<template>
    <div class="container-user">
        <input-validation-vue />
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
                        <div class="container-user__page__table__row__cell id">
                            <span>{{ index + 1 }}</span>
                        </div>
                        <div class="container-user__page__table__row__cell username">
                            <span>
                                {{ item.username }}
                            </span>
                        </div>
                        <div class="container-user__page__table__row__cell email">
                            <span>
                                {{ item.email }}
                            </span>
                        </div>
                        <div class="container-user__page__table__row__cell action">
                            <div class="container-user__page__table__row__cell action__icon">
                                <img src="@/assets/icons/edit-icon.svg" alt="edit" @click="showUpdate(item.id)" />
                                <img
                                    src="@/assets/icons/delete-icon.svg"
                                    alt="delete"
                                    @click.stop="showDeleteVerifiedPopup(item.id)"
                                />
                            </div>
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
                            <input
                                v-model="currentUser.username"
                                type="text"
                                :disabled="!isEdit"
                                @blur="checkValidateInput(0, currentUser.username, '')"
                                @focus="validateInput[0] = false"
                            />
                            <span class="error-message" v-if="validateInput[0]">Vui lòng nhập username.</span>
                        </div>
                        <div class="label-input">
                            <span>Email:</span>
                            <input
                                v-model="currentUser.email"
                                type="email"
                                :disabled="!isEdit"
                                @blur="checkValidateInput(1, currentUser.email, 'email')"
                                @focus="validateInput[1] = false"
                            />
                            <span class="error-message" v-if="validateInput[1]"
                                >Vui lòng nhập email đúng định dạng.</span
                            >
                        </div>
                        <button class="btn button--primary" @click="showPopupChangePassword">Đổi mật khẩu</button>
                    </div>
                </template>
            </panel-view>
            <full-modal v-if="isShowPopup">
                <popup-view
                    title="Thêm người dùng"
                    class="container-user__page__popup"
                    @on-cancel="hiddenPopup"
                    @on-ok="createUser"
                >
                    <template #popupbody>
                        <div class="label-input">
                            <span>Tên người dùng:</span>
                            <input
                                v-model="currentUser.username"
                                id="name"
                                type="text"
                                name=""
                                @blur="checkValidateInput(2, currentUser.username, '')"
                                @focus="validateInput[2] = false"
                            />
                            <span class="error-message" v-if="validateInput[2]">Vui lòng nhập username.</span>
                        </div>
                        <div class="label-input">
                            <span>Email:</span>
                            <input
                                type="email"
                                v-model="currentUser.email"
                                name=""
                                id="email"
                                @blur="checkValidateInput(4, currentUser.email, '')"
                                @focus="validateInput[4] = false"
                            />
                            <span class="error-message" v-if="validateInput[4]"
                                >Vui lòng nhập email đúng định dạng.</span
                            >
                        </div>
                        <div class="label-input">
                            <span>Mật khẩu:</span>
                            <input
                                type="password"
                                v-model="currentUser.password"
                                name=""
                                id="address"
                                @blur="checkValidateInput(3, currentUser.password, '')"
                                @focus="validateInput[3] = false"
                            />
                            <span class="error-message" v-if="validateInput[3]">Vui lòng nhập mật khẩu.</span>
                        </div>
                        <div class="label-input">
                            <span>Xác nhận mật khẩu:</span>
                            <input
                                v-model="currentUser.confirm"
                                type="password"
                                @blur="checkValidateInput(8, currentUser.confirm, '')"
                                @focus="validateInput[8] = false"
                            />
                            <span class="error-message" v-if="validateInput[8]">Vui lòng xác nhập lại mật khẩu.</span>
                            <span class="error-message" v-if="isDifferent">Mật khẩu không khớp.</span>
                        </div>
                    </template>
                </popup-view>
            </full-modal>
            <full-modal v-if="isShowDeleteVerifiedPopup">
                <popup-view
                    title="Xác nhận xóa người dùng"
                    class="container-user__page__popup"
                    @on-cancel="hiddenDeleteVerifiedPopup"
                    @on-ok="deleteUser"
                >
                    <template #popupbody>
                        <div class="container-user__page__popup__content">
                            <span>Bạn xác nhận sẽ xóa người dùng này?</span>
                        </div>
                    </template>
                </popup-view>
            </full-modal>
            <full-modal v-if="isChangePassword">
                <popup-view
                    title="Thay đổi mật khẩu"
                    class="container-user__page__popup"
                    @on-cancel="isChangePassword = false"
                    @on-ok="changePassword"
                >
                    <template #popupbody>
                        <div class="container-user__page__popup__content">
                            <div class="label-input">
                                <span>Mật khẩu cũ:</span>
                                <input
                                    v-model="password.old"
                                    type="password"
                                    @blur="checkValidateInput(5, password.old, '')"
                                    @focus="validateInput[5] = false"
                                />
                                <span class="error-message" v-if="validateInput[5]"
                                    >Vui lòng nhập mật khẩu cũ hoặc mật khẩu cũ không đúng.</span
                                >
                            </div>
                            <div class="label-input">
                                <span>Mật khẩu mới:</span>
                                <input
                                    v-model="currentUser.new"
                                    type="password"
                                    @blur="checkValidateInput(6, currentUser.new, '')"
                                    @focus="validateInput[6] = false"
                                />
                                <span class="error-message" v-if="validateInput[6]">Vui lòng nhập mật khẩu mới.</span>
                            </div>
                            <div class="label-input">
                                <span>Xác nhận mật khẩu:</span>
                                <input
                                    v-model="currentUser.confirm"
                                    type="password"
                                    @blur="checkValidateInput(7, currentUser.confirm, '')"
                                    @focus="validateInput[7] = false"
                                />
                                <span class="error-message" v-if="validateInput[7]"
                                    >Vui lòng xác nhận lại mật khẩu hoặc mật khẩu không khớp.</span
                                >
                            </div>
                            <!-- <button class="btn button--primary">Đổi mật khẩu</button> -->
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
            title: 'Chi tiết',
            isShowDetail: false,
            isShowPopup: false,
            searchValue: '',
            timeOutId: null,
            meta: [],
            currentPage: 1,
            isHaveContent: false,
            isShowDeleteVerifiedPopup: false,
            isChangePassword: false,
            password: {},
            validateInput: [],
            isDifferent: false,
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
            const id = localStorage.getItem('idDelete')
            try {
                const res = await deleteUser(id)
                this.isShowDeleteVerifiedPopup = false
                if (res.data.status === 'success') {
                    this.Search()
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
                    this.isShowDetail = false
                    this.$notify({
                        type: 'success',
                        title: 'Cập nhật Người dùng',
                        text: 'Cập nhật người dùng thành công!',
                    })
                }
                this.Search()
            } catch (error) {
                console.error(error)
                this.$notify({
                    type: 'error',
                    title: 'Cập nhật Người dùng',
                    text: 'Cập nhật người dùng thất bại!',
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
            // this.validateInput = false
        },
        async createUser() {
            try {
                if (this.currentUser.password !== this.currentUser.confirm) {
                    this.isDifferent = true
                    return
                } else {
                    this.isDifferent = false
                    this.isShowPopup = false
                    const res = await addUser(this.currentUser)
                    if (res.data.status === 'success') {
                        this.isShowPopup = false
                        this.$notify({
                            type: 'success',
                            title: 'Thêm Người dùng',
                            text: 'Thêm người dùng thành công!',
                        })
                        this.listData.push(res.data.data)
                    }
                }
            } catch (error) {
                console.error(error)
                this.$notify({
                    type: 'error',
                    title: 'Thêm Người dùng',
                    text: 'Thêm người dùng thất bại!',
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
                this.$router.push({ path: `/`, query })
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
            this.$router.push({
                query: query,
            })
        },
        goToNextPage() {
            if (this.currentPage < this.meta.totalPages) {
                this.goToIndexPage(this.currentPage++)
            }
        },
        goToPrevPage() {
            if (this.currentPage > 1) {
                this.goToIndexPage(this.currentPage--)
            }
        },
        closePanelView() {
            this.isShowDetail = false
            this.isEdit = false
        },
        showDeleteVerifiedPopup(id) {
            localStorage.setItem('idDelete', id)
            this.isShowDeleteVerifiedPopup = true
        },
        hiddenDeleteVerifiedPopup() {
            this.isShowDeleteVerifiedPopup = false
        },
        showPopupChangePassword() {
            this.isChangePassword = true
            this.isShowDetail = false
        },
        async changePassword() {
            try {
                console.log('tam thoi chua co api')
                this.isChangePassword = false
            } catch (error) {
                console.error(error)
            }
        },
        checkValidateInput(index, value, type) {
            if (!value) {
                this.validateInput[index] = true
            } else {
                this.validateInput[index] = false
            }
            if (type === 'email' && this.validateInput[index] === false) {
                const reg = /^\S+@\S+\.\S+$/
                if (!reg.test(value)) {
                    this.validateInput[index] = true
                } else {
                    this.validateInput[index] = false
                }
            }
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
                &:hover {
                    opacity: 0.7;
                }
                &.bold {
                    background: var(--neutral-300, #f4f7fe);
                }
                &__cell {
                    position: relative;
                    padding: 7.5px 24px;
                    text-align: center;
                    display: flex;
                    align-items: center;
                    span {
                        width: 100%;
                        @include truncate(1);
                        @include text-style(14px, 150%, 400, $text-light-secondary-1, 0);
                    }
                    &.id {
                        width: 15%;
                    }
                    &.username {
                        width: 35%;
                    }
                    &.email {
                        width: 30%;
                    }
                    &.action {
                        width: 20%;
                        &__icon {
                            width: 100%;
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
            }
        }
        &__panel {
            &__content {
                display: flex;
                flex-direction: column;
                span {
                    padding: 17px 0 7px 0;
                }
                .btn {
                    display: flex;
                    width: 320px;
                    height: 36px;
                    padding: 6px 10px;
                    margin-top: 15px;
                    justify-content: center;
                    align-items: center;
                    gap: 4px;
                    border-radius: 8px;
                    font-size: 12px;
                    &.button--primary {
                        background: $gradient-default;
                        text-align: center;
                        @include text-style(14px, 150%, 600, $neutral-100, 0);
                        &:hover {
                            background: $gradient-hover;
                        }
                    }
                }
            }
        }
        &__popup {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 3;
            &__content {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                width: 100%;
            }
        }
    }
}
</style>
