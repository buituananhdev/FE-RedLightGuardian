<template>
    <div class="container-violation">
        <div class="container-violation__page table-primary">
            <table-view
                ref="tableview"
                class="container-violation__page__table"
                :list-header="listHeader"
                :request-url="'/violations'"
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
                        class="container-violation__page__table__row"
                        :class="!(index % 2) ? 'bold' : ''"
                        @click="getSingleViolation(item.id)"
                    >
                        <span class="container-violation__page__table__row__violationId">{{ index + 1 }}</span>
                        <span class="container-violation__page__table__row__type">{{ item.type }}</span>
                        <span class="container-violation__page__table__row__deadline">{{ item.deadline }}</span>
                        <span class="container-violation__page__table__row__status">{{ item.status }}</span>
                        <span class="container-violation__page__table__row__vehicleId">{{ item.vehicleID }}</span>
                        <span class="container-violation__page__table__row__time">{{ item.time }}</span>
                        <span class="container-violation__page__table__row__cameraId">{{ item.cameraID }}</span>
                        <span class="container-violation__page__table__row__imageUrl">{{ item.imageUrl }}</span>
                        <div class="container-violation__page__table__row__action">
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
                class="container-violation__page__panel"
                @close-panel="closePanelView"
                @update-object="updateViolation"
                @allow-update="isEdit = true"
                @cancel="isEdit = false"
            >
                <template #pbody>
                    <div class="container-violation__page__panel__content">
                        <div class="label-input">
                            <span>Type:</span>
                            <input v-model="currentViolation.type" type="text" :disabled="!isEdit" />
                        </div>
                        <div class="label-input">
                            <span>Deadline:</span>
                            <input v-model="currentViolation.deadline" type="text" :disabled="!isEdit" />
                        </div>
                        <div class="label-input">
                            <span>Status:</span>
                            <input v-model="currentViolation.status" type="text" :disabled="!isEdit" />
                        </div>
                        <div class="label-input">
                            <span>Vehicle ID:</span>
                            <input v-model="currentViolation.vehicleID" type="text" :disabled="!isEdit" />
                        </div>
                        <div class="label-input">
                            <span>Time:</span>
                            <input v-model="currentViolation.time" type="text" :disabled="!isEdit" />
                        </div>
                        <div class="label-input">
                            <span>Camera ID:</span>
                            <input v-model="currentViolation.cameraID" type="text" :disabled="!isEdit" />
                        </div>
                        <div class="label-input">
                            <span>Image URL:</span>
                            <input v-model="currentViolation.imageUrl" type="text" :disabled="!isEdit" />
                        </div>
                    </div>
                </template>
            </panel-view>
            <full-modal v-if="isShowPopup">
                <popup-view
                    title="Create Violation"
                    class="container-violation__page__popup"
                    @on-cancel="hiddenPopup"
                    @on-ok="createViolation"
                >
                    <template #popupbody>
                        <div class="container-violation__page__popup__content">
                            <div class="container-violation__page__popup__content__box1">
                                <div class="label-input">
                                    <span>Type:</span>
                                    <input v-model="currentViolation.type" type="text" :disabled="!isEdit" />
                                </div>
                                <div class="label-input">
                                    <span>Deadline:</span>
                                    <input v-model="currentViolation.deadline" type="text" :disabled="!isEdit" />
                                </div>
                                <div class="label-input">
                                    <span>Status:</span>
                                    <input v-model="currentViolation.status" type="text" :disabled="!isEdit" />
                                </div>
                                <div class="label-input">
                                    <span>Vehicle ID:</span>
                                    <input v-model="currentViolation.vehicleID" type="text" :disabled="!isEdit" />
                                </div>
                            </div>
                            <div>
                                <div class="label-input">
                                    <span>Time:</span>
                                    <input v-model="currentViolation.time" type="text" :disabled="!isEdit" />
                                </div>
                                <div class="label-input">
                                    <span>Camera ID:</span>
                                    <input v-model="currentViolation.cameraID" type="text" :disabled="!isEdit" />
                                </div>
                                <div class="label-input">
                                    <span>Image URL:</span>
                                    <input v-model="currentViolation.imageUrl" type="text" :disabled="!isEdit" />
                                </div>
                            </div>
                        </div>
                    </template>
                </popup-view>
            </full-modal>
            <full-modal v-if="isShowDeleteVerifiedPopup">
                <popup-view
                    title="Xác nhận xóa vi phạm"
                    class="container-violation__page__popup"
                    @on-cancel="hiddenDeleteVerifiedPopup"
                    @on-ok="deleteViolation()"
                >
                    <template #popupbody>
                        <div class="container-violation__page__popup__content">
                            <span>Bạn xác nhận sẽ xóa vi phạm giao thông này?</span>
                        </div>
                    </template>
                </popup-view>
            </full-modal>
        </div>
    </div>
</template>

<script>
import {
    getAllViolations,
    deleteViolation,
    getSingleViolation,
    updateViolation,
    addViolation,
} from '@/services/violation.service'
// import ModalReason from '@/components/modals/ModalReason.vue'
// import ModalAlert from '@/components/modals/ModalAlert.vue'
export default {
    // components: { ModalReason, ModalAlert },
    data() {
        return {
            listHeader: [
                {
                    title: 'STT',
                    width: 5,
                },
                {
                    title: 'Loại vi phạm',
                    width: 15,
                },
                {
                    title: 'Hạn xử lý',
                    width: 10,
                },
                {
                    title: 'Trạng thái',
                    width: 15,
                },
                {
                    title: 'Mã xe',
                    width: 5,
                },
                {
                    title: 'Thời gian vi phạm',
                    width: 10,
                },
                {
                    title: 'Mã máy ảnh',
                    width: 5,
                },
                {
                    title: 'Hình ảnh vi phạm',
                    width: 25,
                },
                {
                    title: 'Thao tác',
                    width: 10,
                },
            ],
            listData: [],
            currentViolation: {},
            isEdit: false,
            isShowDetail: false,
            title: 'View Detail',
            isShowPopup: false,
            isShowDeleteVerifiedPopup: false,
            meta: [],
            currentPage: 1,
            isHaveContent: false,
            searchValue: '',
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
            this.refreshData()
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
    mounted() {
        this.searchValue = this.pageSearch
        this.refreshData()
    },
    methods: {
        refreshData() {
            if (this.searchValue) {
                this.Search()
            } else {
                this.fetchData()
            }
        },
        async fetchData() {
            console.log(this.pageParam)
            try {
                const res = await getAllViolations('', this.pageParam)
                this.listData = res.data.data
                this.meta = res.data.meta
            } catch (error) {
                console.error(error)
            }
        },
        async deleteViolation() {
            const id = localStorage.getItem('idViolation')
            try {
                const res = await deleteViolation(id)
                if (res.data.status === 'success') {
                    this.isShowDeleteVerifiedPopup = false
                    this.listData = this.listData.filter((violation) => violation.id !== id)
                    this.$notify({
                        type: 'success',
                        title: 'Delete Violation',
                        text: 'Delete violation successfully!',
                    })
                }
            } catch (error) {
                console.error(error)
                this.$notify({
                    type: 'error',
                    title: 'Delete Violation',
                    text: 'Delete violation failed!',
                    duration: 1000,
                })
            }
        },
        async getSingleViolation(id) {
            try {
                const res = await getSingleViolation(id)
                this.currentViolation = res.data.data
                localStorage.setItem('idViolation', this.currentViolation.id)
                this.isShowDetail = true
            } catch (error) {
                console.error(error)
            }
        },
        async updateViolation() {
            const id = localStorage.getItem('idViolation')
            try {
                const res = await updateViolation(id, this.currentViolation)
                if (res.data.status === 'success') {
                    this.isShowDetail = false
                    this.isEdit = false
                    this.$notify({
                        type: 'success',
                        title: 'Update Violation',
                        text: 'Update violation successfully!',
                    })
                    this.fetchData()
                }
            } catch (error) {
                console.error(error)
                this.$notify({
                    type: 'error',
                    title: 'Update Violation',
                    text: 'Update violation failed!',
                    duration: 1000,
                })
            }
        },
        async createViolation() {
            try {
                const res = await addViolation(this.currentViolation)
                if (res.data.status === 'success') {
                    this.isShowPopup = false
                    this.$notify({
                        type: 'success',
                        title: 'Add Violation',
                        text: 'Add violation successfully!',
                    })
                }
            } catch (error) {
                console.error(error)
                this.$notify({
                    type: 'error',
                    title: 'Add Violation',
                    text: 'Add violation failed!',
                    duration: 1000,
                })
            }
        },
        showUpdate(id) {
            this.isEdit = true
            this.isShowDetail = true
            this.getSingleViolation(id)
        },
        closePanelView() {
            this.isShowDetail = false
            this.isEdit = false
        },
        showPopup() {
            this.currentViolation = {}
            this.isEdit = true
            this.isShowPopup = true
        },
        hiddenPopup() {
            this.isEdit = false
            this.isShowPopup = false
        },
        showDeleteVerifiedPopup() {
            this.isShowDeleteVerifiedPopup = true
        },
        hiddenDeleteVerifiedPopup() {
            this.isShowDeleteVerifiedPopup = false
        },
        async Search() {
            try {
                const res = await getAllViolations(this.searchValue, this.p)
                this.listData = res.data.data
                this.meta = res.data.meta
                const query = {}
                if (this.searchValue) {
                    query.search = this.searchValue
                }
                this.$router.push({ path: `/violations`, query })
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
            this.goToIndexPage(this.currentPage++)
        },
        goToPrevPage() {
            this.goToIndexPage(this.currentPage--)
        },
    },
}
</script>
<style lang="scss" scoped>
.container-violation {
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
                background: $neutral-100;
                overflow: auto;
                &:hover {
                    opacity: 0.7;
                }
                &.bold {
                    background: $neutral-300;
                }
                span {
                    padding: 16px 20px;
                    display: flex;
                    justify-content: center;
                    align-content: center;
                    overflow: hidden;
                }
                &__cameraId,
                &__violationId,
                &__vehicleId {
                    width: 5%;
                }
                &__time,
                &__deadline {
                    width: 10%;
                }
                &__type,
                &__status {
                    width: 15%;
                }
                &__imageUrl {
                    width: 25%;
                }
                &__action {
                    width: 10%;
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
            overflow: auto;
            @include custom-scrollbar();
            &::-webkit-scrollbar {
                width: 6px;
            }
            &__content {
                display: flex;
                flex-direction: column;
                input {
                    margin-bottom: 8px;
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
            width: auto;
            height: auto;
            overflow: auto;
            &__content {
                display: flex;
                &__box1 {
                    margin-right: 50px;
                }
                input {
                    min-width: 300px;
                }
            }
        }
    }
}
</style>
