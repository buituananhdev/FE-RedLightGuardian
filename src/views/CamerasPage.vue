<!-- <template>
    <div class="container-camera">
        <div class="container-camera__page table-primary">
            <table-view
                ref="tableview"
                :list-header="listHeader"
                :request-url="'/cameras'"
                :list-data="listData"
                class="container-camera__page__table"
                @click-button="showPopup"
            >
                <template #tbody>
                    <div
                        v-for="(item, index) in listData"
                        :key="item.id"
                        class="container-camera__page__table__row"
                        :class="!(index % 2) ? 'bold' : ''"
                        @click="getCameraById(item.id)"
                    >
                        <span class="container-camera__page__table__row__id">{{ index + 1 }}</span>
                        <span class="container-camera__page__table__row__name">{{ item.name }}</span>
                        <span class="container-camera__page__table__row__location">{{ item.location }}</span>
                        <span class="container-camera__page__table__row__coordinates">{{ item.coordinates }}</span>
                        <div class="container-camera__page__table__row__action">
                            <img src="@/assets/icons/edit-icon.svg" alt="edit" @click="showUpdate(item.id)" />
                            <img src="@/assets/icons/delete-icon.svg" alt="delete" @click="showDeleteVerifiedPopup()" />
                        </div>
                    </div>
                </template>
            </table-view>
            <panel-view
                v-if="isShowDetail"
                :title="title"
                :is-edit="isEdit"
                class="container-camera__page__panel"
                @close-panel="closePanelView"
                @update-object="updateCamera"
            >
                <template #pbody>
                    <div class="container-camera__page__panel__content">
                        <div class="label-input">
                            <span>Tên máy ảnh:</span>
                            <input v-model="currentCamera.name" type="text" :disabled="!isEdit" />
                        </div>
                        <div class="label-input">
                            <span>Địa điểm:</span>
                            <input v-model="currentCamera.location" type="text" :disabled="!isEdit" />
                        </div>
                        <div class="label-input">
                            <span>Tọa độ:</span>
                            <input v-model="currentCamera.coordinates" type="text" :disabled="!isEdit" />
                        </div>
                    </div>
                </template>
            </panel-view>
            <full-modal v-if="isShowPopup">
                <popup-view
                    title="Create Camera"
                    class="container-camera__page__popup"
                    @on-cancel="hiddenPopup"
                    @on-ok="createCamera"
                >
                    <template #popupbody>
                        <div class="container-camera__page__popup__content">
                            <div class="label-input">
                                <span>Camera Name:</span>
                                <input v-model="currentCamera.cameraName" type="text" :disabled="!isEdit" />
                            </div>
                            <div class="label-input">
                                <span>License Plate:</span>
                                <input v-model="currentCamera.licensePlate" type="text" :disabled="!isEdit" />
                            </div>
                            <div class="label-input">
                                <span>Owner ID:</span>
                                <input v-model="currentCamera.ownerID" type="text" :disabled="!isEdit" />
                            </div>
                            <div class="label-input">
                                <span>Camera Type:</span>
                                <input v-model="currentCamera.cameraType" type="text" :disabled="!isEdit" />
                            </div>
                            <div class="label-input">
                                <span>Engine Capacity:</span>
                                <input v-model="currentCamera.engineCapacity" type="text" :disabled="!isEdit" />
                            </div>
                        </div>
                    </template>
                </popup-view>
            </full-modal>
            <full-modal v-if="isShowDeleteVerifiedPopup">
                <popup-view
                    title="Xác nhận xóa phương tiện"
                    class="container-camera__page__popup"
                    @on-cancel="hiddenDeleteVerifiedPopup"
                    @on-ok="deleteCamera()"
                >
                    <template #popupbody>
                        <div class="container-camera__page__popup__content">
                            <span>Bạn xác nhận sẽ xóa phương tiện giao thông này?</span>
                        </div>
                    </template>
                </popup-view>
            </full-modal>
        </div>
    </div>
</template>
<script>
import { getAllCameras, deleteCamera, getCameraById, updateCamera, addCamera } from '@/services/camera.service'
export default {
    data() {
        return {
            listHeader: [
                {
                    title: 'STT',
                    width: 5,
                },
                {
                    title: 'Tên máy ảnh',
                    width: 10,
                },
                {
                    title: 'Địa điểm',
                    width: 25,
                },
                {
                    title: 'Tọa độ',
                    width: 40,
                },
                {
                    title: 'Thao tác',
                    width: 20,
                },
            ],
            listData: [],
            currentCamera: {},
            isEdit: false,
            isShowDetail: false,
            title: 'View Detail',
            isShowPopup: false,
            isShowDeleteVerifiedPopup: false,
        }
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        async fetchData() {
            try {
                const res = await getAllCameras()
                this.listData = res.data.data
            } catch (error) {
                console.error(error)
            }
        },
        async deleteCamera() {
            const id = localStorage.getItem('idCamera')
            try {
                const res = await deleteCamera(id)
                if (res.data.status === 'success') {
                    this.isShowDeleteVerifiedPopup = false
                    this.listData = this.listData.filter((camera) => camera.id !== id)
                    this.$notify({
                        type: 'success',
                        title: 'Delete Camera',
                        text: 'Delete camera successfully!',
                    })
                }
            } catch (error) {
                this.$notify({
                    type: 'error',
                    title: 'Delete Camera',
                    text: 'Delete camera failed!',
                    duration: 1000,
                })
            }
        },
        async getCameraById(id) {
            try {
                const res = await getCameraById(id)
                this.currentCamera = res.data.data
                localStorage.setItem('idCamera', this.currentCamera.id)
                this.isShowDetail = true
            } catch (error) {
                console.error(error)
            }
        },
        async updateCamera() {
            const id = localStorage.getItem('idCamera')
            try {
                const res = await updateCamera(id, this.currentCamera)
                if (res.data.status === 'success') {
                    this.isShowDetail = false
                    this.isEdit = false
                    this.$notify({
                        type: 'success',
                        title: 'Update Camera',
                        text: 'Update camera successfully!',
                    })
                    this.fetchData()
                }
            } catch (error) {
                console.error(error)
                this.$notify({
                    type: 'error',
                    title: 'Update Camera',
                    text: 'Update camera failed!',
                    duration: 1000,
                })
            }
        },
        async createCamera() {
            try {
                const res = await addCamera(this.currentCamera)
                if (res.data.status === 'success') {
                    this.isShowPopup = false
                    this.isEdit = false
                    this.$notify({
                        type: 'success',
                        title: 'Add Camera',
                        text: 'Add camera successfully!',
                    })
                    this.listData.push(res.data.data)
                }
            } catch (error) {
                console.error(error)
                this.$notify({
                    type: 'error',
                    title: 'Add Camera',
                    text: 'Add camera failed!',
                    duration: 1000,
                })
            }
        },
        showUpdate(id) {
            this.isEdit = true
            this.isShowDetail = true
            this.getCameraById(id)
        },
        closePanelView() {
            this.isShowDetail = false
            this.isEdit = false
        },
        showPopup() {
            this.currentCamera = {}
            this.isEdit = true
            this.isShowPopup = true
        },
        hiddenPopup() {
            this.isShowPopup = false
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
.container-camera {
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
                cursor: pointer;
                background: $neutral-100;
                &:hover {
                    opacity: 0.7;
                }
                &.bold {
                    background: $neutral-300;
                }
                span {
                    padding: 15px 24px;
                    display: flex;
                    justify-content: center;
                    align-content: center;
                }
                &__coordinates {
                    width: 40%;
                }
                &__location {
                    width: 25%;
                }
                &__id {
                    width: 5%;
                }
                &__name {
                    width: 10%;
                }
                &__action {
                    width: 20%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 20px;
                    img {
                        height: 20px;
                        width: 25px;
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
            &__content {
                display: flex;
                flex-direction: column;
                input {
                    min-width: 400px;
                    margin-bottom: 10px;
                }
            }
        }
    }
}
</style> -->
