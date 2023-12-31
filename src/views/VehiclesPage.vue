<template>
    <div class="container-vehicle">
        <div class="container-vehicle__page table-primary">
            <table-view
                ref="tableview"
                class="container-vehicle__page__table"
                :list-header="listHeader"
                :request-url="'/vehicles'"
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
                        class="container-vehicle__page__table__row"
                        :class="!(index % 2) ? 'bold' : ''"
                        @click="getSingleVehicle(item.id)"
                    >
                        <div class="container-vehicle__page__table__row__cell id">
                            <span>{{ index + 1 }}</span>
                        </div>
                        <div class="container-vehicle__page__table__row__cell name">
                            <span>{{ item.vehicleName }}</span>
                        </div>
                        <div class="container-vehicle__page__table__row__cell license">
                            <span>{{ item.licensePlate }}</span>
                        </div>
                        <div class="container-vehicle__page__table__row__cell ownerId">
                            <span>{{ item.owner.name }}</span>
                        </div>
                        <div class="container-vehicle__page__table__row__cell type">
                            <span>{{ convertVehicleTypeToVie(item.vehicleType) }}</span>
                        </div>
                        <div class="container-vehicle__page__table__row__cell action">
                            <div class="container-vehicle__page__table__row__cell action__icon">
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
                class="container-vehicle__page__panel"
                @close-panel="closePanelView"
                @update-object="updateVehicle"
                @allow-update="isEdit = true"
                @cancel="isEdit = false"
            >
                <template #pbody>
                    <div class="container-vehicle__page__panel__content">
                        <div class="label-input">
                            <span>Tên phương tiện:</span>
                            <input
                                v-model="currentVehicle.vehicleName"
                                type="text"
                                :disabled="!isEdit"
                                @blur="checkValidateInput(0, currentVehicle.vehicleName, '')"
                                @focus="validateInput[0] = false"
                            />
                            <span class="error-message" v-if="validateInput[0]">Vui lòng nhập tên phương tiện.</span>
                        </div>
                        <div class="label-input">
                            <span>Biển số:</span>
                            <input
                                v-model="currentVehicle.licensePlate"
                                type="text"
                                :disabled="!isEdit"
                                @blur="checkValidateInput(1, currentVehicle.licensePlate, '')"
                                @focus="validateInput[1] = false"
                            />
                            <span class="error-message" v-if="validateInput[1]">Vui lòng nhập biển số.</span>
                        </div>
                        <div class="label-input">
                            <span>Loại phương tiện:</span>
                            <select-box
                                v-model="currentVehicle.vehicleType"
                                :type_select_box="'status-white'"
                                :label="'name'"
                                :selected-props="type"
                                :options="optionsType"
                                :placeholder="convertVehicleTypeToVie(currentVehicle.vehicleType)"
                                :is-select="isEdit"
                                class="select-box"
                                @change-value-select-box="changeType"
                                @blur="checkValidateInput(2, currentVehicle.vehicleType, '')"
                                @focus="validateInput[2] = false"
                            />
                            <span class="error-message" v-if="validateInput[2]">Vui lòng nhập phương tiện.</span>
                        </div>
                        <div class="label-input">
                            <span>Công suất động cơ:</span>
                            <input
                                v-model="currentVehicle.engineCapacity"
                                type="text"
                                :disabled="!isEdit"
                                @blur="checkValidateInput(3, currentVehicle.engineCapacity, 'number')"
                                @focus="validateInput[3] = false"
                            />
                            <span class="error-message" v-if="validateInput[3]">Vui lòng nhập công suất động cơ.</span>
                        </div>
                        <div class="label-input">
                            <span>Màu sắc:</span>
                            <input
                                v-model="currentVehicle.color"
                                type="text"
                                :disabled="!isEdit"
                                @blur="checkValidateInput(4, currentVehicle.color, '')"
                                @focus="validateInput[4] = false"
                            />
                            <span class="error-message" v-if="validateInput[4]"
                                >Vui lòng nhập màu sắc của phương tiện.</span
                            >
                        </div>
                        <div class="label-input">
                            <span>Số khung:</span>
                            <input
                                v-model="currentVehicle.frameNumber"
                                type="text"
                                :disabled="!isEdit"
                                @blur="checkValidateInput(5, currentVehicle.frameNumber, '')"
                                @focus="validateInput[5] = false"
                            />
                            <span class="error-message" v-if="validateInput[5]">Vui lòng nhập số khung.</span>
                        </div>
                        <div class="label-input">
                            <span>Số động cơ:</span>
                            <input
                                v-model="currentVehicle.engineNumber"
                                type="text"
                                :disabled="!isEdit"
                                @blur="checkValidateInput(6, currentVehicle.engineNumber, '')"
                                @focus="validateInput[6] = false"
                            />
                            <span class="error-message" v-if="validateInput[6]">Vui lòng nhập số động cơ.</span>
                        </div>
                        <div class="label-input">
                            <span>Thương hiệu:</span>
                            <input
                                v-model="currentVehicle.brand"
                                type="text"
                                :disabled="!isEdit"
                                @blur="checkValidateInput(7, currentVehicle.brand, '')"
                                @focus="validateInput[7] = false"
                            />
                            <span class="error-message" v-if="validateInput[7]">Vui lòng nhập số thương hiệu.</span>
                        </div>
                        <div v-if="!isEdit" class="label-input">
                            <span>Hình ảnh phương tiện:</span>
                            <img :src="currentVehicle.imageUrl" :alt="currentVehicle.vehicleName" :disabled="!isEdit" />
                        </div>
                        <div v-if="isEdit" class="container-vehicle__page__popup__content__file">
                            <input
                                type="file"
                                id="fileInput"
                                class="file-input"
                                accept="image/*"
                                @change="handleFileChange"
                            />
                            <label for="fileInput" class="file-label">Chọn ảnh</label>
                            <img
                                v-if="!previewUrl"
                                :src="currentVehicle.imageUrl"
                                :alt="currentVehicle.vehicleName"
                                :disabled="!isEdit"
                            />
                            <img v-if="previewUrl" :src="previewUrl" class="preview-image" alt="Preview Image" />
                        </div>
                    </div>
                </template>
            </panel-view>
            <full-modal v-if="isShowPopup">
                <popup-view
                    title="Tạo mới phương tiện giao thông"
                    class="container-vehicle__page__popup"
                    @on-cancel="hiddenPopup"
                    @on-ok="createVehicle"
                >
                    <template #popupbody>
                        <div class="container-vehicle__page__popup__content">
                            <div class="container-vehicle__page__popup__content__text">
                                <div class="container-vehicle__page__popup__content__text__box1">
                                    <div class="label-input">
                                        <span>Tên phương tiện:</span>
                                        <input
                                            v-model="currentVehicle.vehicleName"
                                            type="text"
                                            :disabled="!isEdit"
                                            @blur="checkValidateInput(8, currentVehicle.vehicleName, '')"
                                            @focus="validateInput[8] = false"
                                        />
                                        <span class="error-message" v-if="validateInput[8]"
                                            >Vui lòng nhập tên phương tiện.</span
                                        >
                                    </div>
                                    <div class="label-input">
                                        <span>Biển số:</span>
                                        <input
                                            v-model="currentVehicle.licensePlate"
                                            type="text"
                                            :disabled="!isEdit"
                                            @blur="checkValidateInput(9, currentVehicle.licensePlate, '')"
                                            @focus="validateInput[9] = false"
                                        />
                                        <span class="error-message" v-if="validateInput[9]"
                                            >Vui lòng nhập biển số xe.</span
                                        >
                                    </div>
                                    <div class="label-input">
                                        <span>Mã số căn cước công dân:</span>
                                        <input
                                            v-model="currentVehicle.citizenIdentification"
                                            type="text"
                                            :disabled="!isEdit"
                                            @blur="checkValidateInput(10, currentVehicle.citizenIdentification, '')"
                                            @focus="validateInput[10] = false"
                                        />
                                        <span class="error-message" v-if="validateInput[10]"
                                            >Vui lòng nhập mã căn cước công dân.</span
                                        >
                                    </div>
                                    <div class="label-input">
                                        <span>Loại xe:</span>
                                        <select-box
                                            v-model="type"
                                            :type_select_box="'status-white'"
                                            :label="'name'"
                                            :selected-props="type"
                                            :options="optionsType"
                                            :placeholder="'Chọn loại xe'"
                                            @change-value-select-box="changeType"
                                            class="select-box"
                                        />
                                        <span class="error-message" v-if="validateInput[11]"
                                            >Vui lòng chọn loại xe.</span
                                        >
                                    </div>
                                    <div class="label-input">
                                        <span>Công suất động cơ:</span>
                                        <input
                                            v-model="currentVehicle.engineCapacity"
                                            type="text"
                                            :disabled="!isEdit"
                                            @blur="checkValidateInput(12, currentVehicle.engineCapacity, '')"
                                            @focus="validateInput[12] = false"
                                        />
                                        <span class="error-message" v-if="validateInput[12]"
                                            >Vui lòng nhập công suất động cơ.</span
                                        >
                                    </div>
                                </div>
                                <div>
                                    <div class="label-input">
                                        <span>Màu sắc:</span>
                                        <input
                                            v-model="currentVehicle.color"
                                            type="text"
                                            :disabled="!isEdit"
                                            @blur="checkValidateInput(13, currentVehicle.color, '')"
                                            @focus="validateInput[13] = false"
                                        />
                                        <span class="error-message" v-if="validateInput[13]"
                                            >Vui lòng nhập màu sác phương tiện.</span
                                        >
                                    </div>
                                    <div class="label-input">
                                        <span>Số khung:</span>
                                        <input
                                            v-model="currentVehicle.frameNumber"
                                            type="text"
                                            :disabled="!isEdit"
                                            @blur="checkValidateInput(14, currentVehicle.frameNumber, '')"
                                            @focus="validateInput[14] = false"
                                        />
                                        <span class="error-message" v-if="validateInput[14]"
                                            >Vui lòng nhập số khung.</span
                                        >
                                    </div>
                                    <div class="label-input">
                                        <span>Số động cơ:</span>
                                        <input
                                            v-model="currentVehicle.engineNumber"
                                            type="text"
                                            :disabled="!isEdit"
                                            @blur="checkValidateInput(15, currentVehicle.engineNumber, '')"
                                            @focus="validateInput[15] = false"
                                        />
                                        <span class="error-message" v-if="validateInput[15]"
                                            >Vui lòng nhập số động cơ.</span
                                        >
                                    </div>
                                    <div class="label-input">
                                        <span>Thương hiệu:</span>
                                        <input
                                            v-model="currentVehicle.brand"
                                            type="text"
                                            :disabled="!isEdit"
                                            @blur="checkValidateInput(16, currentVehicle.brand, '')"
                                            @focus="validateInput[16] = false"
                                        />
                                        <span class="error-message" v-if="validateInput[16]"
                                            >Vui lòng nhập thương hiệu phương tiện.</span
                                        >
                                    </div>
                                </div>
                            </div>
                            <div class="container-vehicle__page__popup__content__file">
                                <input
                                    type="file"
                                    id="fileInput"
                                    class="file-input"
                                    accept="image/*"
                                    @change="handleFileChange"
                                />
                                <label for="fileInput" class="file-label">Chọn ảnh</label>
                                <img :src="previewUrl" v-if="previewUrl" class="preview-image" alt="Preview Image" />
                            </div>
                        </div>
                    </template>
                </popup-view>
            </full-modal>
            <full-modal v-if="isShowDeleteVerifiedPopup">
                <popup-view
                    title="Xác nhận xóa phương tiện"
                    class="container-vehicle__page__modal"
                    @on-cancel="hiddenDeleteVerifiedPopup"
                    @on-ok="deleteVehicle()"
                >
                    <template #popupbody>
                        <div class="container-vehicle__page__modal__delete">
                            <span>Bạn xác nhận sẽ xóa phương tiện giao thông này?</span>
                        </div>
                    </template>
                </popup-view>
            </full-modal>
        </div>
    </div>
</template>

<script>
import { getAllVehicles, deleteVehicle, getSingleVehicle, updateVehicle, addVehicle } from '@/services/vehicle.service'
import { getAllOwners } from '@/services/owner.service'
import { uploadFile } from '@/services/storage.service'
export default {
    data() {
        return {
            listHeader: [
                {
                    title: 'STT',
                    width: 10,
                },
                {
                    title: 'Tên xe',
                    width: 20,
                },
                {
                    title: 'Biển số',
                    width: 15,
                },
                {
                    title: 'Tên chủ xe',
                    width: 20,
                },
                {
                    title: 'Loại xe',
                    width: 15,
                },
                {
                    title: 'Thao tác',
                    width: 20,
                },
            ],
            listData: [],
            listOwners: [],
            currentVehicle: {},
            isEdit: false,
            isShowDetail: false,
            currentPage: 1,
            title: 'Chi tiết',
            isShowPopup: false,
            isShowDeleteVerifiedPopup: false,
            searchValue: '',
            timeOutId: null,
            meta: [],
            isHaveContent: false,
            currentSelected: { name: '' },
            previousSelected: {},
            lastQuery: {},
            validateInput: [],
            type: { name: '' },
            optionsType: [
                {
                    key: 'car',
                    name: 'Xe ô tô',
                },
                {
                    key: 'motorcycle',
                    name: 'Xe máy',
                },
            ],
            selectedFile: null,
            previewUrl: null,
        }
    },
    computed: {
        pageSearch() {
            return this.$route.query.search
        },
        pageParam() {
            return this.$route.query.page
        },
        pageOwner() {
            return this.$route.query.ownerID
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
        this.ownerID = this.pageOwner
        this.fetchListOwner()
        this.refreshData()
    },
    methods: {
        async refreshData() {
            if (this.searchValue || this.currentSelected.name) {
                await this.Search()
            } else {
                await this.fetchData()
            }
        },
        async fetchData() {
            try {
                const res = await getAllVehicles(this.pageParam)
                this.listData = res.data.data
                this.meta = res.data.meta
            } catch (error) {
                console.error(error)
            }
        },
        async deleteVehicle() {
            const id = localStorage.getItem('idDelete')
            try {
                const res = await deleteVehicle(id)
                if (res.data.status === 'success') {
                    this.isShowDeleteVerifiedPopup = false
                    this.Search()
                    this.$notify({
                        type: 'success',
                        title: 'Xóa phương tiện',
                        text: 'Xóa phương tiện thành công!',
                    })
                }
            } catch (error) {
                this.isShowDeleteVerifiedPopup = false
                this.$notify({
                    type: 'error',
                    title: 'Xóa phương tiện',
                    text: 'Xóa phương tiện thất bại!',
                    duration: 1000,
                })
            }
        },
        async getSingleVehicle(id) {
            try {
                const res = await getSingleVehicle(id)
                this.currentVehicle = res.data.data
                localStorage.setItem('idVehicle', this.currentVehicle.id)
                this.isShowDetail = true
            } catch (error) {
                console.error(error)
            }
        },
        async updateVehicle() {
            const id = localStorage.getItem('idVehicle')
            try {
                const res = await updateVehicle(id, this.currentVehicle)
                if (res.data.status === 'success') {
                    this.isShowDetail = false
                    this.isEdit = false
                    this.fetchData()
                    this.$notify({
                        type: 'success',
                        title: 'Cập nhật phương tiện',
                        text: 'Cập nhật phương tiện thành công!',
                    })
                }
            } catch (error) {
                console.error(error)
                this.$notify({
                    type: 'error',
                    title: 'Cập nhật phương tiện',
                    text: 'Cập nhật phương tiện thất bại!',
                    duration: 1000,
                })
            }
        },
        async createVehicle() {
            try {
                const imageData = await this.uploadImage()
                console.log('image data', imageData.data)
                this.currentVehicle.imageUrl = imageData.url
                const res = await addVehicle(this.currentVehicle)
                if (res.data.status === 'success') {
                    this.isShowPopup = false
                    this.isEdit = false
                    this.type = null
                    this.previewUrl = null
                    this.$notify({
                        type: 'success',
                        title: 'Thêm phương tiện',
                        text: 'Thêm phương tiện thành công!',
                    })
                    this.listData.push(res.data.data)
                }
            } catch (error) {
                this.isShowPopup = false
                this.isEdit = false
                console.error(error)
                this.$notify({
                    type: 'error',
                    title: 'Thêm phương tiện',
                    text: 'Thêm phương tiện thất bại!',
                    duration: 1000,
                })
            }
        },
        async Search() {
            try {
                const res = await getAllVehicles(this.pageParam, this.searchValue)
                this.listData = res.data.data
                this.meta = res.data.meta
                const query = {}
                query.page = this.currentPage
                if (this.searchValue) {
                    query.search = this.searchValue
                }
                this.$router.push({
                    path: `/vehicles`,
                    query,
                })
            } catch (error) {
                console.error(error)
                this.$notify({
                    type: 'error',
                    title: 'Tìm kiếm phương tiện',
                    text: 'Tìm kiếm phương tiện thất bại!',
                    duration: 1000,
                })
            }
        },
        async fetchListOwner() {
            try {
                const res = await getAllOwners(1, '', 1000)
                this.listOwners = res.data.data
            } catch (error) {
                console.log(error)
                this.notiAction = 'Tải'
                this.notiObject = 'dữ liệu'
                this.notiType = 'thất bại'
                this.showNotification = true
                setTimeout(() => {
                    this.showNotification = false
                }, 3000)
            }
        },
        convertVehicleTypeToVie(type) {
            // Xử lý để chuyển đổi chuỗi status thành đối tượng
            switch (type) {
                case 'car':
                    return 'Xe ô tô'
                case 'motorcycle':
                    return 'Xe máy'
                // Xử lý trạng thái khác nếu cần
                default:
                    return ''
            }
        },
        onSearchInput(searchValue) {
            this.searchValue = searchValue
            clearTimeout(this.timeOutId) // xóa bỏ setTimeout() trước đó (nếu có)
            this.timeOutId = setTimeout(() => {
                this.Search()
            }, 700) // tạo mới setTimeout() với thời gian chờ là 700ms
        },
        showUpdate(id) {
            this.isEdit = true
            this.isShowDetail = true
            this.getSingleVehicle(id)
        },
        closePanelView() {
            this.isShowDetail = false
            this.isEdit = false
        },
        showPopup() {
            this.currentVehicle = {}
            this.isEdit = true
            this.isShowPopup = true
        },
        hiddenPopup() {
            this.isShowPopup = false
            this.isEdit = false
        },
        showDeleteVerifiedPopup(id) {
            localStorage.setItem('idDelete', id)
            this.isShowDeleteVerifiedPopup = true
        },
        hiddenDeleteVerifiedPopup() {
            this.isShowDeleteVerifiedPopup = false
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
        changeType(option) {
            this.type = option
            console.log(option)
            this.currentVehicle.vehicleType = option.key
        },
        handleFileChange(event) {
            this.selectedFile = event.target.files[0]
            if (this.selectedFile) {
                const reader = new FileReader()
                reader.onload = (e) => {
                    this.previewUrl = e.target.result
                }
                reader.readAsDataURL(this.selectedFile)
            }
        },
        async uploadImage() {
            if (this.selectedFile) {
                const formData = new FormData()
                formData.append('file', this.selectedFile)

                const res = await uploadFile(formData)
                return res.data.data
            } else {
                console.log('Vui lòng chọn một file.')
            }
        },
    },
}
</script>
<style lang="scss" scoped>
.container-vehicle {
    background-color: #ffff;
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
                width: 160px;
            }
            &__row {
                padding: 0 16px;
                padding-right: 20px;
                display: flex;
                width: 100%;
                gap: 20px;
                cursor: pointer;
                background: $neutral-100;
                &:hover {
                    opacity: 0.7;
                }
                &.bold {
                    background: $neutral-300;
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
                        width: 10%;
                    }
                    &.type,
                    &.license {
                        width: 15%;
                    }
                    &.name,
                    &.ownerId {
                        width: 20%;
                    }

                    &.action {
                        width: 20%;
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
            z-index: 3;
            width: auto;
            height: auto;
            &__content {
                display: flex;
                flex-direction: column;
                height: 400px;
                overflow: auto;
                @include custom-scrollbar();
                &::-webkit-scrollbar {
                    width: 6px;
                }
                &__text {
                    display: flex;
                    &__box1 {
                        margin-right: 70px;
                    }
                    input {
                        min-width: 300px;
                        // margin-bottom: 10px;
                    }
                    span {
                        padding-top: 10px;
                    }
                }
                &__file {
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-top: 24px;
                    background-color: $neutral-300;
                    height: 240px;
                    min-height: 240px;
                    input {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        opacity: 0;
                        cursor: pointer;
                    }
                    img {
                        max-width: 400px;
                        max-height: 200px;
                    }
                    label {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        padding: 8px 16px;
                        background-color: #eee;
                        border: 1px solid #ccc;
                        border-radius: 4px;
                        cursor: pointer;
                        background-color: rgba($color: #ffffff, $alpha: 0.7);
                        z-index: 1; /* Đảm bảo label ở trên cùng */
                    }
                }
            }
        }
        &__modal {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 3;
        }
    }
}
</style>
