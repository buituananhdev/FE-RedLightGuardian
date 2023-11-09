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
                        <span class="container-owner__page__table__row__id">{{ index + 1 }}</span>
                        <span class="container-owner__page__table__row__idCitizen">{{
                            item.citizen_identification
                        }}</span>
                        <span class="container-owner__page__table__row__username">{{ item.name }}</span>
                        <span class="container-owner__page__table__row__address">{{ item.address }}</span>
                        <span class="container-owner__page__table__row__email">{{ item.email }}</span>
                        <div class="container-owner__page__table__row__action">
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
                class="container-owner__page__panel"
                @close-panel="closePanel"
                @update-object="updateOwner"
                @allow-update="isEdit = true"
                @cancel="isEdit = false"
            >
                <template #pbody>
                    <div class="container-owner__page__panel__content">
                        <div class="label-input">
                            <span>Citizen id:</span>
                            <input
                                id="name"
                                v-model="currentOwner.citizen_identification"
                                type="text"
                                name=""
                                :disabled="!isEdit"
                            />
                        </div>
                        <div class="label-input">
                            <span>Name:</span>
                            <input v-model="currentOwner.name" type="text" id="name" name="" :disabled="!isEdit" />
                        </div>
                        <div class="label-input">
                            <span>Address:</span>
                            <input
                                id="address"
                                v-model="currentOwner.address"
                                type="text"
                                name=""
                                :disabled="!isEdit"
                            />
                        </div>
                        <div class="label-input">
                            <span>Email:</span>
                            <input type="email" v-model="currentOwner.email" name="" id="" :disabled="!isEdit" />
                        </div>
                    </div>
                </template>
            </panel-view>
            <full-modal v-if="isShowPopup">
                <popup-view
                    title="Create Owner"
                    class="container-owner__page__popup"
                    @on-cancel="hiddenPopup"
                    @on-ok="createOwner"
                >
                    <template #popupbody>
                        <div class="label-input">
                            <span>Citizen id:</span>
                            <input type="text" v-model="currentOwner.citizen_identification" name="" id="name" />
                        </div>
                        <div class="label-input">
                            <span>Name:</span>
                            <input type="text" v-model="currentOwner.name" name="" id="name" />
                        </div>
                        <div class="label-input">
                            <span>Address:</span>
                            <input id="address" v-model="currentOwner.address" type="text" name="" />
                        </div>
                        <div class="label-input">
                            <span>Email:</span>
                            <input id="" v-model="currentOwner.email" type="email" name="" />
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
                    title: 'Tên',
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
            title: 'View Detail',
            isShowPopup: false,
            isShowDeleteVerifiedPopup: false,
            searchValue: '',
            timeOutId: null,
            meta: [],
            currentPage: 1,
            isHaveContent: false,
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
            const id = localStorage.getItem('idOwner')
            try {
                const res = await deleteOwner(id)
                if (res.data.status === 'success') {
                    this.isShowDeleteVerifiedPopup = false
                    this.listData = this.listData.filter((owner) => owner.id !== id)
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
                    this.fetchData()
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
            this.goToIndexPage(this.currentPage++)
        },
        goToPrevPage() {
            this.goToIndexPage(this.currentPage--)
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
                &.bold {
                    background: var(--neutral-300, #f4f7fe);
                }
                span {
                    padding: 16px 24px;
                    display: flex;
                    justify-content: center;
                    align-content: center;
                }
                &__email,
                &__idCitizen,
                &__id {
                    width: 15%;
                }
                &__username,
                &__address {
                    width: 20%;
                }
                &__action {
                    width: 15%;
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
