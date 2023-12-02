<template>
    <div class="container-violation">
        <div class="container-violation__page table-primary">
            <table-view
                ref="tableview"
                class="container-violation__page__table"
                :list-header="listHeader"
                :request-url="'/violations'"
                :list-data="listData"
                :label="'violations'"
                :is-have-content="isHaveContent"
                :meta="meta"
                @click-button="showPopup"
                @go-to-next-page="goToNextPage"
                @go-to-prev-page="goToPrevPage"
            >
                <template #fbody>
                    <div class="container-violation__page__table__filter">
                        <select-box
                            :type_select_box="'status-white'"
                            :label="'name'"
                            :selected-props="status"
                            :options="optionsStatus"
                            :placeholder="'Chọn trạng thái'"
                            @ChangeValueSelectBox="changeStatus"
                        />
                        <!-- <select-box
                            :type_select_box="'status-white'"
                            :label="'name'"
                            :selected-props="type"
                            :options="optionsType"
                            :placeholder="'Chọn loại vi phạm'"
                            @ChangeValueSelectBox="changeType"
                        /> -->
                        <vue-date-picker
                            v-model="startDate"
                            :enable-time-picker="false"
                            :format="format"
                            placeholder="Ngày bắt đầu"
                            @update:model-value="Search"
                        ></vue-date-picker>
                        <vue-date-picker
                            v-model="endDate"
                            placeholder="Ngày cuối cùng"
                            :enable-time-picker="false"
                            :format="format"
                            @update:model-value="Search"
                        ></vue-date-picker>
                    </div>
                </template>
                <template #tbody>
                    <div
                        v-for="(item, index) in listData"
                        :key="item.id"
                        class="container-violation__page__table__row"
                        :class="!(index % 2) ? 'bold' : ''"
                        @click="getSingleViolation(item.id)"
                    >
                        <div class="container-violation__page__table__row__cell id">
                            <span>{{ index + 1 }}</span>
                        </div>
                        <div class="container-violation__page__table__row__cell type">
                            <span>{{ item.type }}</span>
                        </div>
                        <div class="container-violation__page__table__row__cell deadline">
                            <span>{{ formatDateTime(item.deadline) }}</span>
                        </div>
                        <div class="container-violation__page__table__row__cell status">
                            <span>{{ item.status }}</span>
                        </div>
                    </div>
                </template>
            </table-view>
            <panel-view
                v-if="isShowDetail"
                :title="title"
                :label="'violations'"
                class="container-violation__page__panel"
                @close-panel="closePanelView"
            >
                <template #pbody>
                    <div class="container-violation__page__panel__content">
                        <div class="label-input">
                            <span>Loại vi phạm:</span>
                            <input
                                v-model="currentViolation.type"
                                type="text"
                                :disabled="!isEdit"
                                @blur="checkValidateInput(0, currentViolation.type, '')"
                                @focus="validateInput[0] = false"
                            />
                            <span class="error-message" v-if="validateInput[0]">Vui lòng nhập loại vi phạm.</span>
                        </div>
                        <div class="label-input">
                            <span>Thời hạn cuối cùng:</span>
                            <input
                                v-model="currentViolation.deadline"
                                type="text"
                                :disabled="!isEdit"
                                @blur="checkValidateInput(1, currentViolation.deadline, '')"
                                @focus="validateInput[1] = false"
                            />
                            <span class="error-message" v-if="validateInput[1]">Vui lòng nhập thời hạn cuối cùng.</span>
                        </div>
                        <div class="label-input">
                            <span>Trạng thái:</span>
                            <input
                                v-model="currentViolation.status"
                                type="text"
                                :disabled="!isEdit"
                                @blur="checkValidateInput(2, currentViolation.status, '')"
                                @focus="validateInput[2] = false"
                            />
                            <span class="error-message" v-if="validateInput[2]">Vui lòng nhập trạng thái.</span>
                        </div>
                        <div class="label-input">
                            <span v-if="isEdit">Đường dẫn hình ảnh vi phạm:</span>
                            <span v-if="!isEdit">Hình ảnh phương tiện vi phạm:</span>
                            <input v-if="isEdit" v-model="currentViolation.imageUrl" type="text" :disabled="!isEdit" />
                            <img
                                v-else
                                :src="currentViolation.imageUrl"
                                :alt="currentViolation.type"
                                :disabled="!isEdit"
                            />
                        </div>
                    </div>
                </template>
            </panel-view>
            <!-- <full-modal v-if="isShowPopup">
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
                                    <span>Loại vi phạm:</span>
                                    <input v-model="currentViolation.type" type="text" :disabled="!isEdit"  @blur="checkValidateInput(15, currentViolation.engineNumber, '')"
                                        @focus="validateInput[15] = false"
                                    />
                                    <span class="error-message" v-if="validateInput[15]"
                                        >Vui lòng nhập số động cơ.</span
                                    >
                                </div>
                                <div class="label-input">
                                    <span>Thời hạn cuối cùng:</span>
                                    <input v-model="currentViolation.deadline" type="text" :disabled="!isEdit"  @blur="checkValidateInput(15, currentViolation.engineNumber, '')"
                                        @focus="validateInput[15] = false"
                                    />
                                    <span class="error-message" v-if="validateInput[15]"
                                        >Vui lòng nhập số động cơ.</span
                                    >
                                </div>
                                <div class="label-input">
                                    <span>Trạng thái:</span>
                                    <input v-model="currentViolation.status" type="text" :disabled="!isEdit"  @blur="checkValidateInput(15, currentViolation.engineNumber, '')"
                                        @focus="validateInput[15] = false"
                                    />
                                    <span class="error-message" v-if="validateInput[15]"
                                        >Vui lòng nhập số động cơ.</span
                                    >
                                </div>
                                <div class="label-input">
                                    <span>Mã số xe vi phạm:</span>
                                    <input v-model="currentViolation.vehicleID" type="text" :disabled="!isEdit"  @blur="checkValidateInput(15, currentViolation.engineNumber, '')"
                                        @focus="validateInput[15] = false"
                                    />
                                    <span class="error-message" v-if="validateInput[15]"
                                        >Vui lòng nhập số động cơ.</span
                                    >
                                </div>
                            </div>
                            <div>
                                <div class="label-input">
                                    <span>Time:</span>
                                    <input v-model="currentViolation.time" type="text" :disabled="!isEdit"  @blur="checkValidateInput(15, currentViolation.engineNumber, '')"
                                        @focus="validateInput[15] = false"
                                    />
                                    <span class="error-message" v-if="validateInput[15]"
                                        >Vui lòng nhập số động cơ.</span
                                    >
                                </div>
                                <div class="label-input">
                                    <span>Camera ID:</span>
                                    <input v-model="currentViolation.cameraID" type="text" :disabled="!isEdit"  @blur="checkValidateInput(15, currentViolation.engineNumber, '')"
                                        @focus="validateInput[15] = false"
                                    />
                                    <span class="error-message" v-if="validateInput[15]"
                                        >Vui lòng nhập số động cơ.</span
                                    >
                                </div>
                                <div class="label-input">
                                    <span>Image URL:</span>
                                    <input v-model="currentViolation.imageUrl" type="text" :disabled="!isEdit"  @blur="checkValidateInput(15, currentViolation.engineNumber, '')"
                                        @focus="validateInput[15] = false"
                                    />
                                    <span class="error-message" v-if="validateInput[15]"
                                        >Vui lòng nhập số động cơ.</span
                                    >
                                </div>
                            </div>
                        </div>
                    </template>
                </popup-view>
            </full-modal> -->
            <!-- <full-modal v-if="isShowDeleteVerifiedPopup">
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
            </full-modal> -->
        </div>
    </div>
</template>

<script>
import { getAllViolations, deleteViolation, getSingleViolation, addViolation } from '@/services/violation.service'
export default {
    data() {
        return {
            listHeader: [
                {
                    title: 'STT',
                    width: 20,
                },
                {
                    title: 'Loại vi phạm',
                    width: 20,
                },
                {
                    title: 'Hạn xử lý',
                    width: 40,
                },
                {
                    title: 'Trạng thái',
                    width: 20,
                },
            ],
            listData: [],
            currentViolation: {},
            isEdit: false,
            isShowDetail: false,
            title: 'Chi tiết',
            isShowPopup: false,
            isShowDeleteVerifiedPopup: false,
            meta: [],
            currentPage: 1,
            isHaveContent: false,
            startDate: '',
            endDate: '',
            status: {},
            type: {
                key: 'violatedate',
                name: 'Ngày vi phạm',
            },
            optionsStatus: [
                {
                    key: 'paid fine',
                    name: 'Đã nộp',
                },
                {
                    key: 'unpaid fine',
                    name: 'Chưa nộp',
                },
                {
                    key: 'overdue',
                    name: 'Quá hạn',
                },
                // {
                //     name: 'Hủy bỏ',
                // },
            ],
            optionsType: [
                {
                    key: 'deadline',
                    name: 'Hạn cuối nộp phạt',
                },
                {
                    key: 'violatedate',
                    name: 'Ngày vi phạm',
                },
            ],
            validateInput: [],
        }
    },
    computed: {
        pageParam() {
            return this.$route.query.page
        },
        statusParam() {
            return this.$route.query.status
        },
        typeParam() {
            return this.$route.query.type
        },
        startDateParam() {
            return this.$route.query.startDate
        },
        endDateParam() {
            return this.$route.query.endDate
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
        this.startDate = this.startDateParam
        this.endDate = this.endDateParam
        if (this.statusParam) {
            this.status = this.findName(this.optionsStatus, this.statusParam)
        }
        if (this.typeParam) {
            this.type = this.findName(this.optionsType, this.typeParam)
        }
        this.refreshData()
    },
    methods: {
        refreshData() {
            if (this.startDate || this.endDate || this.status.name || this.type.name) {
                this.Search()
            } else {
                this.fetchData()
            }
        },
        async fetchData() {
            try {
                const res = await getAllViolations(this.pageParam)
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
                this.currentViolation.deadline = this.formatDateTime(this.currentViolation.deadline)
                localStorage.setItem('idViolation', this.currentViolation.id)
                this.isShowDetail = true
            } catch (error) {
                console.error(error)
            }
        },
        // async updateViolation() {
        //     const id = localStorage.getItem('idViolation')
        //     try {
        //         const res = await updateViolation(id, this.currentViolation)
        //         if (res.data.status === 'success') {
        //             this.isShowDetail = false
        //             this.isEdit = false
        //             this.fetchData()
        //             this.$notify({
        //                 type: 'success',
        //                 title: 'Update Violation',
        //                 text: 'Update violation successfully!',
        //             })
        //         }
        //     } catch (error) {
        //         console.error(error)
        //         this.$notify({
        //             type: 'error',
        //             title: 'Update Violation',
        //             text: 'Update violation failed!',
        //             duration: 1000,
        //         })
        //     }
        // },
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
        formatDateTime(timestamp) {
            // Chuyển timestamp thành đối tượng Date
            const date = new Date(timestamp)

            // Định dạng ngày/tháng/năm và giờ:phút:giây
            const formattedDate = `${date.getDate()}/${
                date.getMonth() + 1
            }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

            return formattedDate
        },
        async Search() {
            try {
                const res = await getAllViolations(
                    this.pageParam,
                    this.status.key,
                    this.type.key,
                    this.startDateParam,
                    this.endDateParam
                )
                this.listData = res.data.data
                this.meta = res.data.meta
                const query = {}
                query.page = this.currentPage
                if (this.startDate) {
                    query.startDate = this.convertUnitime(this.startDate)
                }
                if (this.endDate) {
                    query.endDate = this.convertUnitime(this.endDate)
                }
                if (this.type) {
                    query.type = this.type.key
                }
                if (this.status) {
                    query.status = this.status.key
                }
                this.$router.push({ path: `/violations`, query })
            } catch (error) {
                console.error(error)
            }
        },
        goToIndexPage() {
            const query = {}
            query.page = this.currentPage
            if (this.startDate) {
                query.startDate = this.startDate
            }
            if (this.endDate) {
                query.endDate = this.endDate
            }
            if (this.type) {
                query.type = this.type.name
            }
            if (this.status) {
                query.status = this.status.name
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
        format(date) {
            const day = date.getDate()
            const month = date.getMonth() + 1
            const year = date.getFullYear()
            return `${year}-${month}-${day}`
        },
        changeStatus(option) {
            this.status = option
            this.Search()
        },
        changeType(option) {
            this.type = option
            this.Search()
        },
        findName(option, key) {
            return option.find((item) => item.key === key)
        },
        convertUnitime(date) {
            return new Date(date).getTime() / 1000
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
.container-violation {
    padding: 20px;
    border-radius: 8px;
    &__page {
        width: 100%;
        height: 100vh;
        display: flex;
        &__table {
            &__filter {
                position: relative;
                display: flex;
                gap: 10px;
            }
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
                &__cell {
                    position: relative;
                    padding: 15px 24px;
                    text-align: center;
                    display: flex;
                    align-items: center;
                    span {
                        width: 100%;
                        @include truncate(1);
                        @include text-style(14px, 150%, 400, $text-light-secondary-1, 0);
                    }

                    &.type,
                    &.status,
                    &.id {
                        width: 20%;
                    }
                    &.deadline {
                        width: 40%;
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
                margin-bottom: 100px;
                span {
                    padding: 17px 0 7px 0;
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
