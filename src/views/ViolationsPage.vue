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
                    >
                        <div
                            class="container-violation__page__table__row__cell id"
                            @click="getSingleViolation(item.id)"
                        >
                            <span>{{ index + 1 }}</span>
                        </div>
                        <div
                            class="container-violation__page__table__row__cell license"
                            @click="getSingleViolation(item.id)"
                        >
                            <span>{{ item.licensePlate }}</span>
                        </div>
                        <div
                            class="container-violation__page__table__row__cell location"
                            @click="getSingleViolation(item.id)"
                        >
                            <span>{{ item.location }}</span>
                        </div>
                        <div
                            class="container-violation__page__table__row__cell time"
                            @click="getSingleViolation(item.id)"
                        >
                            <span>{{ formatDateTime(item.createdAt) }}</span>
                        </div>
                        <div
                            class="container-violation__page__table__row__cell deadline"
                            @click="getSingleViolation(item.id)"
                        >
                            <span>{{ formatDateTime(item.deadline) }}</span>
                        </div>
                        <div class="container-violation__page__table__row__cell status">
                            <!-- <span>{{ item.status }}</span> -->
                            <select-box
                                :type_select_box="'status-color'"
                                :label="'status'"
                                :selectedProps="item.status"
                                :options="optionsStatusColor"
                                @ChangeStatus="updateStatus"
                                @click="currentViolationID = item.id"
                            ></select-box>
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
                            <span>Biển số xe vi phạm:</span>
                            <input v-model="currentViolation.licensePlate" type="text" :disabled="!isEdit" />
                        </div>
                        <div class="label-input">
                            <span>Vị trí vi phạm:</span>
                            <input v-model="currentViolation.location" type="text" :disabled="!isEdit" />
                        </div>
                        <div class="label-input">
                            <span>Loại vi phạm:</span>
                            <input v-model="currentViolation.type" type="text" :disabled="!isEdit" />
                        </div>
                        <div class="label-input">
                            <span>Thời gian vi phạm:</span>
                            <input v-model="currentViolation.createdAt" type="text" :disabled="!isEdit" />
                        </div>
                        <div class="label-input">
                            <span>Thời hạn cuối cùng:</span>
                            <input v-model="currentViolation.deadline" type="text" :disabled="!isEdit" />
                        </div>
                        <div class="label-input">
                            <span>Trạng thái:</span>
                            <input v-model="currentViolation.status" type="text" :disabled="!isEdit" />
                        </div>
                        <div class="label-input">
                            <span>Hình ảnh phương tiện vi phạm:</span>
                            <img :src="currentViolation.imageUrl" :alt="currentViolation.type" :disabled="!isEdit" />
                        </div>
                    </div>
                </template>
            </panel-view>
            <full-modal v-if="alert.isShowModal" @close-modal="resetAlert">
                <popup-view
                    :title="alert.title"
                    :content="alert.content"
                    :typeModal="alert.typeModal"
                    :isButtonCancel="alert.isButtonCancel"
                    :isButtonOk="alert.isButtonOk"
                    :buttonOkContent="alert.buttonOkContent"
                    :buttonCancelContent="alert.buttonCancelContent"
                    @onOk="alert.currentFunctionOk"
                    @onCancel="alert.currentFunctionCancel"
                />
            </full-modal>

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
import { getAllViolations, getSingleViolation, updateStatusViolation } from '@/services/violation.service'
import SelectBox from '@/components/commons/SelectBox.vue'
export default {
    components: { SelectBox },
    data() {
        return {
            listHeader: [
                {
                    title: 'STT',
                    width: 5,
                },
                {
                    title: 'Biển số',
                    width: 10,
                },
                {
                    title: 'Vị trí vi phạm',
                    width: 15,
                },
                {
                    title: 'Thời gian vi phạm',
                    width: 25,
                },
                {
                    title: 'Hạn xử lý',
                    width: 25,
                },
                {
                    title: 'Trạng thái',
                    width: 20,
                },
            ],
            currentViolationID: '',
            listData: [],
            currentViolation: {},
            isEdit: false,
            isShowDetail: false,
            title: 'Chi tiết',
            isShowPopup: false,
            isShowDeleteVerifiedPopup: false,
            isShowChangeStatusVerified: false,
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
            selectedStatus: {},
            oldStatus: '',
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
            optionsStatusColor: [
                {
                    key: 'paid fine',
                    status: 'Đã nộp',
                },
                {
                    key: 'unpaid fine',
                    status: 'Chưa nộp',
                },
                {
                    key: 'overdue',
                    status: 'Quá hạn',
                },
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
            alert: {
                isShowModal: false,
                title: '',
                content: '',
                typeModal: 'confirm',
                buttonOkContent: 'Đóng',
                isButtonOk: true,
                isButtonCancel: true,
                currentFunctionOk: null,
                currentFunctionCancel: null,
                options: null,
            },
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
                console.log('dataaaaaa', res.data.data)
                res.data.data.forEach((item) => {
                    // Chuyển đổi giá trị status từ chuỗi thành đối tượng
                    item.status = this.convertStatusToObject(item.status)
                    console.log('status', item.status)
                })
                this.listData = res.data.data
                this.meta = res.data.meta
            } catch (error) {
                console.error(error)
            }
        },
        convertStatusToObject(status) {
            // Xử lý để chuyển đổi chuỗi status thành đối tượng
            switch (status) {
                case 'paid fine':
                    return { key: 'paid fine', status: 'Đã nộp' }
                case 'unpaid fine':
                    return { key: 'unpaid fine', status: 'Chưa nộp' }
                case 'overdue':
                    return { key: 'overdue', status: 'Quá hạn' }
                case 'cancel':
                    return { key: 'cancel', status: 'Hủy bỏ' }
                // Xử lý trạng thái khác nếu cần
                default:
                    return { key: status, status: status }
            }
        },
        convertStatusToObjectVie(status) {
            // Xử lý để chuyển đổi chuỗi status thành đối tượng
            switch (status) {
                case 'Đã nộp':
                    return { key: 'paid fine', status: 'Đã nộp' }
                case 'Chưa nộp':
                    return { key: 'unpaid fine', status: 'Chưa nộp' }
                case 'Quá hạn':
                    return { key: 'overdue', status: 'Quá hạn' }
                case 'Hủy bỏ':
                    return { key: 'cancel', status: 'Hủy bỏ' }
                // Xử lý trạng thái khác nếu cần
                default:
                    return { key: status, status: status }
            }
        },
        // async deleteViolation() {
        //     const id = localStorage.getItem('idViolation')
        //     try {
        //         const res = await deleteViolation(id)
        //         if (res.data.status === 'success') {
        //             this.isShowDeleteVerifiedPopup = false
        //             this.Search()
        //             this.$notify({
        //                 type: 'success',
        //                 title: 'Delete Violation',
        //                 text: 'Delete violation successfully!',
        //             })
        //         }
        //     } catch (error) {
        //         console.error(error)
        //         this.$notify({
        //             type: 'error',
        //             title: 'Delete Violation',
        //             text: 'Delete violation failed!',
        //             duration: 1000,
        //         })
        //     }
        // },
        async getSingleViolation(id) {
            try {
                const res = await getSingleViolation(id)
                this.currentViolation = res.data.data
                this.currentViolation.deadline = this.formatDateTime(this.currentViolation.deadline)
                this.currentViolation.createdAt = this.formatDateTime(this.currentViolation.createdAt)
                localStorage.setItem('idViolation', this.currentViolation.id)
                this.isShowDetail = true
            } catch (error) {
                console.error(error)
            }
        },
        async getSingleViolationId(id) {
            try {
                const res = await getSingleViolation(id)
                this.currentViolation.id = res.data.data.id
                localStorage.setItem('idViolation', this.currentViolation.id)
            } catch (error) {
                console.error(error)
            }
        },
        // async createViolation() {
        //     try {
        //         const res = await addViolation(this.currentViolation)
        //         if (res.data.status === 'success') {
        //             this.isShowPopup = false
        //             this.$notify({
        //                 type: 'success',
        //                 title: 'Add Violation',
        //                 text: 'Add violation successfully!',
        //             })
        //         }
        //     } catch (error) {
        //         console.error(error)
        //         this.$notify({
        //             type: 'error',
        //             title: 'Add Violation',
        //             text: 'Add violation failed!',
        //             duration: 1000,
        //         })
        //     }
        // },
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
        hiddenChangeStatusVerifiedPopup() {
            this.isShowChangeStatusVerified = false
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
                console.log(res.data.data[1])
                res.data.data.forEach((item) => {
                    // Chuyển đổi giá trị status từ chuỗi thành đối tượng
                    item.status = this.convertStatusToObject(item.status)
                    console.log('status', item.status)
                })
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
        changeStatus(now, after) {
            // now -> after

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
        updateStatus(selected, option) {
            const oldStatus = selected.status
            const newStatus = this.convertStatusToObject(option)

            console.log('now', selected)
            console.log('after', newStatus)
            this.onChangeStatus(oldStatus, newStatus)
        },
        onChangeStatus(oldStatus, selected) {
            if (!selected.status) {
                return
            }
            console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaa', selected)
            const update = async () => {
                try {
                    const res = await updateStatusViolation(this.currentViolationID, selected.key)
                    if (res.data.status === 'success') {
                        this.$notify({
                            type: 'success',
                            title: 'Update Violation',
                            text: 'Update violation successfully!',
                        })
                        let index = this.listData.findIndex((x) => (x.id = this.currentViolationID))
                        if (index !== -1) {
                            this.listData[index].status = selected
                        }
                    }
                } catch (err) {
                    console.error(err)
                    this.$notify({
                        type: 'error',
                        title: 'Update Violation',
                        text: 'Update violation failed!',
                        duration: 1000,
                    })
                }
                this.alert.isShowModal = false
            }

            this.alert = {
                ...this.alert,
                ...{
                    isShowModal: true,
                    isShowLogo: false,
                    title: 'Notification',
                    content: `Đổi từ trạng thái ${oldStatus} thành ${selected.status} ?`,
                    buttonOkContent: 'Ok',
                    currentFunctionOk: update,
                    currentFunctionCancel: this.resetAlert,
                    options: {
                        currentTask: selected,
                        statusAfterChange: selected.status,
                    },
                },
            }
        },

        resetAlert() {
            this.alert = {
                isShowModal: false,
                title: '',
                content: '',
                typeModal: 'confirm',
                isButtonOk: true,
                isButtonCancel: true,
                currentFunctionOk: null,
                currentFunctionCancel: null,
                options: null,
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
                overflow: visible;
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

                    &.id {
                        width: 5%;
                    }
                    &.location {
                        width: 15%;
                    }
                    &.deadline,
                    &.time {
                        width: 25%;
                    }
                    &.status {
                        overflow: auto;
                        width: 20%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        overflow: visible;
                        &.status-color {
                            position: relative;
                            z-index: 99999;
                        }
                    }
                    &.license {
                        width: 10%;
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
