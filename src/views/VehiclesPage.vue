<template>
    <div class="container-vehicle">
        <div class="container-vehicle__page table-primary">
            <table-view
                ref="tableview"
                :list-header="listHeader"
                :request-url="'/vehicles'"
                :list-data="listData"
                class="container-vehicle__page__table"
                @click-button="showPopup"
            >
                <template #tbody>
                    <div
                        v-for="(item, index) in listData"
                        :key="item.id"
                        class="container-vehicle__page__table__row"
                        :class="!(index % 2) ? 'bold' : ''"
                        @click="getSingleVehicle(item.id)"
                    >
                        <span class="container-vehicle__page__table__row__id">{{ item.id }}</span>
                        <span class="container-vehicle__page__table__row__name">{{ item.vehicleName }}</span>
                        <span class="container-vehicle__page__table__row__license">{{ item.licensePlate }}</span>
                        <span class="container-vehicle__page__table__row__ownerId">{{ item.ownerID }}</span>
                        <span class="container-vehicle__page__table__row__type">{{ item.vehicleType }}</span>
                        <!-- <span class="container-vehicle__page__table__row__engineCapacity">{{
                            item.engineCapacity
                        }}</span>
                        <span class="container-vehicle__page__table__row__color">{{ item.color }}</span>
                        <span class="container-vehicle__page__table__row__frameNumber">{{ item.frameNumber }}</span>
                        <span class="container-vehicle__page__table__row__engineNumber">{{ item.engineNumber }}</span>
                        <span class="container-vehicle__page__table__row__brand">{{ item.brand }}</span>
                        <span class="container-vehicle__page__table__row__imageUrl">{{ item.imageUrl }}</span> -->
                        <div class="container-vehicle__page__table__row__action">
                            <img src="@/assets/icons/edit-icon.svg" alt="edit" @click="showUpdate(item.id)" />
                            <img src="@/assets/icons/delete-icon.svg" alt="delete" @click="deleteVehicle(item.id)" />
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
            >
                <template #pbody>
                    <div class="container-vehicle__page__panel__content">
                        <div class="label-input">
                            <span>Vehicle Name:</span>
                            <input v-model="currentVehicle.vehicleName" type="text" :disabled="!isEdit" />
                        </div>
                        <div class="label-input">
                            <span>License Plate:</span>
                            <input v-model="currentVehicle.licensePlate" type="text" :disabled="!isEdit" />
                        </div>
                        <div class="label-input">
                            <span>Owner ID:</span>
                            <input v-model="currentVehicle.ownerID" type="text" :disabled="!isEdit" />
                        </div>
                        <div class="label-input">
                            <span>Vehicle Type:</span>
                            <input v-model="currentVehicle.vehicleType" type="text" :disabled="!isEdit" />
                        </div>
                        <div class="label-input">
                            <span>Engine Capacity:</span>
                            <input v-model="currentVehicle.engineCapacity" type="text" :disabled="!isEdit" />
                        </div>
                        <div class="label-input">
                            <span>Color:</span>
                            <input v-model="currentVehicle.color" type="text" :disabled="!isEdit" />
                        </div>
                        <div class="label-input">
                            <span>Frame Number:</span>
                            <input v-model="currentVehicle.frameNumber" type="text" :disabled="!isEdit" />
                        </div>
                        <div class="label-input">
                            <span>Engine Number:</span>
                            <input v-model="currentVehicle.engineNumber" type="text" :disabled="!isEdit" />
                        </div>
                        <div class="label-input">
                            <span>Brand:</span>
                            <input v-model="currentVehicle.brand" type="text" :disabled="!isEdit" />
                        </div>
                        <div class="label-input">
                            <span>Image URL:</span>
                            <input v-model="currentVehicle.imageUrl" type="text" :disabled="!isEdit" />
                        </div>
                    </div>
                </template>
            </panel-view>
            <full-modal v-if="isShowPopup">
                <popup-view
                    title="Create Vehicle"
                    class="container-vehicle__page__popup"
                    @on-cancel="hiddenPopup"
                    @on-ok="createVehicle"
                >
                    <template #popupbody>
                        <div class="container-vehicle__page__popup__content">
                            <div class="container-vehicle__page__popup__content__box1">
                                <div class="label-input">
                                    <span>Vehicle Name:</span>
                                    <input v-model="currentVehicle.vehicleName" type="text" :disabled="!isEdit" />
                                </div>
                                <div class="label-input">
                                    <span>License Plate:</span>
                                    <input v-model="currentVehicle.licensePlate" type="text" :disabled="!isEdit" />
                                </div>
                                <div class="label-input">
                                    <span>Owner ID:</span>
                                    <input v-model="currentVehicle.ownerID" type="text" :disabled="!isEdit" />
                                </div>
                                <div class="label-input">
                                    <span>Vehicle Type:</span>
                                    <input v-model="currentVehicle.vehicleType" type="text" :disabled="!isEdit" />
                                </div>
                                <div class="label-input">
                                    <span>Engine Capacity:</span>
                                    <input v-model="currentVehicle.engineCapacity" type="text" :disabled="!isEdit" />
                                </div>
                            </div>
                            <div>
                                <div class="label-input">
                                    <span>Color:</span>
                                    <input v-model="currentVehicle.color" type="text" :disabled="!isEdit" />
                                </div>
                                <div class="label-input">
                                    <span>Frame Number:</span>
                                    <input v-model="currentVehicle.frameNumber" type="text" :disabled="!isEdit" />
                                </div>
                                <div class="label-input">
                                    <span>Engine Number:</span>
                                    <input v-model="currentVehicle.engineNumber" type="text" :disabled="!isEdit" />
                                </div>
                                <div class="label-input">
                                    <span>Brand:</span>
                                    <input v-model="currentVehicle.brand" type="text" :disabled="!isEdit" />
                                </div>
                                <div class="label-input">
                                    <span>Image URL:</span>
                                    <input v-model="currentVehicle.imageUrl" type="text" :disabled="!isEdit" />
                                </div>
                            </div>
                        </div>
                    </template>
                </popup-view>
            </full-modal>
        </div>
    </div>
</template>

<script>
import { getAllVehicles, deleteVehicle, getSingleVehicle, updateVehicle, addVehicle } from '@/services/vehicle.service'
// import ModalReason from '@/components/modals/ModalReason.vue'
// import ModalAlert from '@/components/modals/ModalAlert.vue'
export default {
    // components: { ModalReason, ModalAlert },
    data() {
        return {
            listHeader: [
                {
                    title: 'ID',
                    width: 10,
                },
                {
                    title: 'Vehicle Name',
                    width: 20,
                },
                {
                    title: 'License Plate',
                    width: 20,
                },
                {
                    title: 'Owner ID',
                    width: 10,
                },
                {
                    title: 'Vehicle Type',
                    width: 20,
                },
                // {
                //     title: 'Engine Capacity',
                //     width: 9,
                // },
                // {
                //     title: 'Color',
                //     width: 5,
                // },
                // {
                //     title: 'Frame Number',
                //     width: 9,
                // },
                // {
                //     title: 'Engine Number',
                //     width: 9,
                // },
                // {
                //     title: 'Brand',
                //     width: 9,
                // },
                // {
                //     title: 'Image URL',
                //     width: 17,
                // },
                {
                    title: 'Action',
                    width: 20,
                },
            ],
            listData: [],
            currentVehicle: {},
            isEdit: false,
            isShowDetail: false,
            title: 'View Detail',
            isShowPopup: false,
        }
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        async fetchData() {
            try {
                const res = await getAllVehicles()
                this.listData = res.data.data
            } catch (error) {
                console.error(error)
            }
        },
        async deleteVehicle(id) {
            try {
                const res = await deleteVehicle(id)
                if (res.data.status === 'success') {
                    this.listData = this.listData.filter((vehicle) => vehicle.id !== id)
                    this.$notify({
                        type: 'success',
                        title: 'Delete Vehicle',
                        text: 'Delete vehicle successfully!',
                    })
                }
            } catch (error) {
                this.$notify({
                    type: 'error',
                    title: 'Delete Vehicle',
                    text: 'Delete vehicle failed!',
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
                    this.$notify({
                        type: 'success',
                        title: 'Update Vehicle',
                        text: 'Update vehicle successfully!',
                    })
                    this.fetchData()
                }
            } catch (error) {
                console.error(error)
                this.$notify({
                    type: 'error',
                    title: 'Update Vehicle',
                    text: 'Update vehicle failed!',
                    duration: 1000,
                })
            }
        },
        async createVehicle() {
            try {
                const res = await addVehicle(this.currentVehicle)
                if (res.data.status === 'success') {
                    this.isShowPopup = false
                    this.isEdit = false
                    this.$notify({
                        type: 'success',
                        title: 'Add Vehicle',
                        text: 'Add vehicle successfully!',
                    })
                }
            } catch (error) {
                console.error(error)
                this.$notify({
                    type: 'error',
                    title: 'Add Vehicle',
                    text: 'Add vehicle failed!',
                    duration: 1000,
                })
            }
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
    },
}
</script>
<style lang="scss" scoped>
.container-vehicle {
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
                    padding: 16px 20px;
                    display: flex;
                    justify-content: center;
                    align-content: center;
                    overflow: hidden;
                }
                &__id,
                &__ownerId {
                    width: 10%;
                }
                &__type,
                &__license,
                &__name {
                    width: 20%;
                }

                &__action {
                    width: 20%;
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
            // position: absolute;
            // right: 0;
            // top: 50%;
            // transform: translate(0, -50%);
            // z-index: 2;
            // width: 30%;
            // height: 100%;
            // background-color: $neutral-200;
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
            width: auto;
            height: auto;
            overflow: auto;
            &__content {
                display: flex;
                &__box1 {
                    margin-right: 50px;
                }
            }
        }
    }
}
</style>
