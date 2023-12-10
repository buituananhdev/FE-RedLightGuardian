<template>
    <div class="container-owner">
        <div class="container-owner__page table-primary">
            <table-view
                ref="tableview"
                class="container-owner__page__table"
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
                        class="container-owner__page__table__row"
                        :class="!(index % 2) ? 'bold' : ''"
                        @click="getSingleOwner(item.id)"
                    >
                        <div class="container-owner__page__table__row__cell id">
                            <span>{{ index + 1 }}</span>
                        </div>
                        <div class="container-owner__page__table__row__cell idCitizen">
                            <span>{{ item.citizen_identification }}</span>
                        </div>
                        <div class="container-owner__page__table__row__cell username">
                            <span>{{ item.name }}</span>
                        </div>
                        <div class="container-owner__page__table__row__cell address">
                            <span>{{ item.address }}</span>
                        </div>
                        <div class="container-owner__page__table__row__cell email">
                            <span>{{ item.email }}</span>
                        </div>
                        <div class="container-owner__page__table__row__cell action">
                            <div class="container-owner__page__table__row__cell action__icon">
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
                class="container-owner__page__panel"
                @close-panel="closePanel"
                @update-object="updateOwner"
                @allow-update="isEdit = true"
                @cancel="isEdit = false"
            >
                <template #pbody>
                    <div class="container-owner__page__panel__content">
                        <div class="label-input">
                            <span>Mã số căn cước công dân:</span>
                            <input
                                id="name"
                                v-model="currentOwner.citizen_identification"
                                type="text"
                                name=""
                                :class="{ 'error-input': validateInput[0] }"
                                :disabled="!isEdit"
                                @blur="checkValidateInput(0, currentOwner.citizen_identification, '')"
                                @focus="validateInput[0] = false"
                            />
                            <span class="error-message" v-if="validateInput[0]">Vui lòng nhập số CCCD.</span>
                        </div>
                        <div class="label-input">
                            <span>Tên người dùng:</span>
                            <input
                                id="name"
                                v-model="currentOwner.name"
                                type="text"
                                name=""
                                :disabled="!isEdit"
                                :class="{ 'error-input': validateInput[1] }"
                                @blur="checkValidateInput(1, currentOwner.name, '')"
                                @focus="validateInput[1] = false"
                            />
                            <span class="error-message" v-if="validateInput[1]">Vui lòng nhập tên User.</span>
                        </div>
                        <div class="label-input">
                            <span>Địa chỉ:</span>
                            <input
                                id="address"
                                v-model="currentOwner.address"
                                type="text"
                                name=""
                                :disabled="!isEdit"
                                :class="{ 'error-input': validateInput[2] }"
                                @blur="checkValidateInput(2, currentOwner.address, '')"
                                @focus="validateInput[2] = false"
                            />
                            <span class="error-message" v-if="validateInput[2]">Vui lòng nhập địa chỉ.</span>
                        </div>
                        <div class="label-input">
                            <span>Email:</span>
                            <input
                                v-model="currentOwner.email"
                                type="email"
                                name=""
                                id=""
                                :disabled="!isEdit"
                                :class="{ 'error-input': validateInput[3] }"
                                @blur="checkValidateInput(3, currentOwner.email, 'email')"
                                @focus="validateInput[3] = false"
                            />
                            <span class="error-message" v-if="validateInput[3]"
                                >Vui lòng nhập email đúng định dạng.</span
                            >
                        </div>
                    </div>
                </template>
            </panel-view>
            <full-modal v-if="isShowPopup">
                <popup-view
                    title="Thêm chủ sở hữu"
                    class="container-owner__page__popup"
                    @on-cancel="hiddenPopup"
                    @on-ok="createOwner"
                >
                    <template #popupbody>
                        <div class="label-input">
                            <span>Mã số căn cước công dân:</span>
                            <input
                                type="text"
                                v-model="currentOwner.citizen_identification"
                                name=""
                                id="name"
                                :class="{ 'error-input': validateInput[4] }"
                                @blur="checkValidateInput(4, currentOwner.citizen_identification, '')"
                                @focus="validateInput[4] = false"
                            />
                            <span class="error-message" v-if="validateInput[4]">Vui lòng nhập số CCCD.</span>
                        </div>
                        <div class="label-input">
                            <span>Tên chủ sở hữu:</span>
                            <input
                                type="text"
                                v-model="currentOwner.name"
                                name=""
                                id="name"
                                :class="{ 'error-input': validateInput[5] }"
                                @blur="checkValidateInput(5, currentOwner.name, '')"
                                @focus="validateInput[5] = false"
                            />
                            <span class="error-message" v-if="validateInput[5]">Vui lòng nhập tên chủ sở hữu.</span>
                        </div>
                        <div class="label-input">
                            <span>Địa chỉ:</span>
                            <input
                                id="address"
                                v-model="currentOwner.address"
                                type="text"
                                name=""
                                :class="{ 'error-input': validateInput[6] }"
                                @blur="checkValidateInput(6, currentOwner.address, '')"
                                @focus="validateInput[6] = false"
                            />
                            <span class="error-message" v-if="validateInput[6]">Vui lòng nhập địa chỉ.</span>
                        </div>
                        <div class="label-input">
                            <span>Email:</span>
                            <input
                                id=""
                                v-model="currentOwner.email"
                                type="email"
                                name=""
                                :class="{ 'error-input': validateInput[7] }"
                                @blur="checkValidateInput(7, currentOwner.email, 'email')"
                                @focus="validateInput[7] = false"
                            />
                            <span class="error-message" v-if="validateInput[7]"
                                >Vui lòng nhập email đúng định dạng.</span
                            >
                        </div>
                    </template>
                </popup-view>
            </full-modal>
            <full-modal v-if="isShowDeleteVerifiedPopup">
                <popup-view
                    title="Xác nhận xóa chủ sở hữu xe"
                    class="container-owner__page__popup"
                    @on-cancel="hiddenDeleteVerifiedPopup"
                    @on-ok="deleteOwner()"
                >
                    <template #popupbody>
                        <div class="container-owner__page__popup__content">
                            <span>Bạn xác nhận sẽ xóa chủ sở hữu xe này?</span>
                        </div>
                    </template>
                </popup-view>
            </full-modal>
        </div>
    </div>
</template>

<script>
import { deleteOwner, getAllOwners, getSingleOwner, updateOwner, addOwner } from '@/services/owner.service'

export default {
    data() {
        return {
            listHeader: [
                {
                    title: 'STT',
                    width: 15,
                },
                {
                    title: 'CCCD',
                    width: 15,
                },
                {
                    title: 'Tên chủ sở hữu',
                    width: 20,
                },
                {
                    title: 'Địa chỉ',
                    width: 20,
                },
                {
                    title: 'Email',
                    width: 15,
                },
                {
                    title: 'Action',
                    width: 15,
                },
            ],
            listData: [],
            currentOwner: {},
            isEdit: false,
            isShowDetail: false,
            title: 'Chi tiết',
            isShowPopup: false,
            isShowDeleteVerifiedPopup: false,
            searchValue: '',
            timeOutId: null,
            meta: [],
            currentPage: 1,
            isHaveContent: false,
            validateInput: [],
        }
    },
    computed: {
        pageSearch() {
            return this.$route.query.search
        },
        pageParam() {
            return this.$route.query.page
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
                const res = await getAllOwners(this.pageParam)
                this.listData = res.data.data
                this.meta = res.data.meta
            } catch (error) {
                console.error(error)
            }
        },
        async deleteOwner() {
            const id = localStorage.getItem('idDelete')
            try {
                const res = await deleteOwner(id)
                if (res.data.status === 'success') {
                    this.isShowDeleteVerifiedPopup = false
                    this.Search()
                    this.$notify({
                        type: 'success',
                        title: 'Delete Owner',
                        text: 'Delete owner successfully!',
                    })
                }
            } catch (error) {
                this.isShowDeleteVerifiedPopup = false
                this.$notify({
                    type: 'error',
                    title: 'Delete Owner',
                    text: 'Delete owner failed!',
                    duration: 1000,
                })
            }
        },
        async getSingleOwner(id) {
            try {
                const res = await getSingleOwner(id)
                this.currentOwner = res.data.data
                localStorage.setItem('idOwner', this.currentOwner.id)
                this.isShowDetail = true
            } catch (error) {
                console.error(error)
            }
        },
        async updateOwner() {
            const id = localStorage.getItem('idOwner')
            try {
                const res = await updateOwner(id, this.currentOwner)
                if (res.data.status === 'success') {
                    this.isShowDetail = false
                    this.isEdit = false
                    this.Search()
                    this.$notify({
                        type: 'success',
                        title: 'Update Owner',
                        text: 'Update owner successfully!',
                    })
                }
            } catch (error) {
                console.error(error)
                this.$notify({
                    type: 'error',
                    title: 'Update Owner',
                    text: 'Update owner failed!',
                    duration: 1000,
                })
            }
        },
        showUpdate(id) {
            this.isEdit = true
            this.isShowDetail = true
            this.getSingleOwner(id)
        },
        showPopup() {
            this.currentOwner = {}
            this.isShowPopup = true
            this.isShowDetail = false
        },
        hiddenPopup() {
            this.isShowPopup = false
        },
        async createOwner() {
            try {
                this.isShowPopup = false
                const res = await addOwner(this.currentOwner)
                if (res.data.status === 'success') {
                    this.isShowPopup = false
                    this.$notify({
                        type: 'success',
                        title: 'Add Owner',
                        text: 'Add owner successfully!',
                    })
                    this.listData.push(res.data.data)
                }
            } catch (error) {
                console.error(error)
                this.$notify({
                    type: 'error',
                    title: 'Add Owner',
                    text: 'Add owner failed!',
                    duration: 1000,
                })
            }
        },
        async Search() {
            try {
                const res = await getAllOwners(this.pageParam, this.searchValue)
                this.listData = res.data.data
                this.meta = res.data.meta
                const query = {}
                if (this.searchValue) {
                    query.search = this.searchValue
                }
                this.$router.push({ path: `/owners`, query })
            } catch (error) {
                console.error(error)
            }
        },
        closePanel() {
            this.isShowDetail = false
            this.isEdit = false
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
        showDeleteVerifiedPopup(id) {
            localStorage.setItem('idDelete', id)
            this.isShowDeleteVerifiedPopup = true
        },
        hiddenDeleteVerifiedPopup() {
            this.isShowDeleteVerifiedPopup = false
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
.container-owner {
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
                cursor: pointer;
                background: var(--neutral-100, #fafcfe);
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
                    &.email,
                    &.idCitizen,
                    &.id {
                        width: 15%;
                    }
                    &.username,
                    &.address {
                        width: 20%;
                    }
                    &.action {
                        width: 15%;
                        &__icon {
                            width: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            gap: 20px;
                            img {
                                height: 20px;
                                width: 20px;
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
            }
        }
        &__popup {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 3;
        }
    }
}
</style>
