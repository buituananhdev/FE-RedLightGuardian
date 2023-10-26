<template>
    <div class="page-vehicles">
        <table-view
            :listHeader="listHeader"
            :requestUrl="'/vehicles'"
            ref="tableview"
            :listData="listData"
            class="page-vehicles__table"
            @open-popup="showPopup()"
        >
            <template v-slot:tbody>
                <div
                    class="page-vehicles__table__row"
                    v-for="(item, index) in listData"
                    :key="item.id"
                    :class="!(index % 2) ? 'bold' : ' unbold'"
                    @click="getSingleVehicle(item.id)"
                >
                    <span class="page-vehicles__table__row__id">{{ item.id }}</span>
                    <span class="page-vehicles__table__row__name">{{ item.vehicleName }}</span>
                    <span class="page-vehicles__table__row__license">{{ item.licensePlate }}</span>
                    <span class="page-vehicles__table__row__ownerId">{{ item.ownerID }}</span>
                    <span class="page-vehicles__table__row__type">{{ item.vehicleType }}</span>
                    <span class="page-vehicles__table__row__engineCapacity">{{ item.engineCapacity }}</span>
                    <span class="page-vehicles__table__row__color">{{ item.color }}</span>
                    <span class="page-vehicles__table__row__frameNumber">{{ item.frameNumber }}</span>
                    <span class="page-vehicles__table__row__engineNumber">{{ item.engineNumber }}</span>
                    <span class="page-vehicles__table__row__brand">{{ item.brand }}</span>
                    <span class="page-vehicles__table__row__imageUrl">{{ item.imageUrl }}</span>
                    <div class="page-vehicles__table__row__action">
                        <img src="@/assets/icons/edit-icon.svg" alt="edit" @click="showUpdate(item.id)" />
                        <img src="@/assets/icons/delete-icon.svg" alt="delete" @click="deleteVehicle(item.id)" />
                    </div>
                </div>
            </template>
        </table-view>
        <panel-view
            :title="title"
            :isEdit="isEdit"
            class="page-vehicles__panel"
            v-if="isShowDetail"
            @close-panel="closePanelView"
            @update-object="updateVehicle"
        >
            <template v-slot:pbody>
                <div class="page-vehicles__panel__content">
                    <div class="label-input">
                        <span>Vehicle Name:</span>
                        <input type="text" v-model="currentVehicle.vehicleName" :disabled="!isEdit" />
                    </div>
                    <div class="label-input">
                        <span>License Plate:</span>
                        <input type="text" v-model="currentVehicle.licensePlate" :disabled="!isEdit" />
                    </div>
                    <div class="label-input">
                        <span>Owner ID:</span>
                        <input type="text" v-model="currentVehicle.ownerID" :disabled="!isEdit" />
                    </div>
                    <div class="label-input">
                        <span>Vehicle Type:</span>
                        <input type="text" v-model="currentVehicle.vehicleType" :disabled="!isEdit" />
                    </div>
                    <div class="label-input">
                        <span>Engine Capacity:</span>
                        <input type="text" v-model="currentVehicle.engineCapacity" :disabled="!isEdit" />
                    </div>
                    <div class="label-input">
                        <span>Color:</span>
                        <input type="text" v-model="currentVehicle.color" :disabled="!isEdit" />
                    </div>
                    <div class="label-input">
                        <span>Frame Number:</span>
                        <input type="text" v-model="currentVehicle.frameNumber" :disabled="!isEdit" />
                    </div>
                    <div class="label-input">
                        <span>Engine Number:</span>
                        <input type="text" v-model="currentVehicle.engineNumber" :disabled="!isEdit" />
                    </div>
                    <div class="label-input">
                        <span>Brand:</span>
                        <input type="text" v-model="currentVehicle.brand" :disabled="!isEdit" />
                    </div>
                    <div class="label-input">
                        <span>Image URL:</span>
                        <input type="text" v-model="currentVehicle.imageUrl" :disabled="!isEdit" />
                    </div>
                </div>
            </template>
        </panel-view>
        <div class="page-vehicles__overlay" v-if="isShowPopup"></div>
        <popup-view
            v-if="isShowPopup"
            title="Create Vehicle"
            class="page-vehicles__popup"
            @onCancel="hiddenPopup"
            @onOk="createVehicle"
        >
            <template v-slot:popupbody>
                <div class="page-vehicles__popup__content">
                    <div class="label-input">
                        <span>Vehicle Name:</span>
                        <input type="text" v-model="currentVehicle.vehicleName" :disabled="!isEdit" />
                    </div>
                    <div class="label-input">
                        <span>License Plate:</span>
                        <input type="text" v-model="currentVehicle.licensePlate" :disabled="!isEdit" />
                    </div>
                    <div class="label-input">
                        <span>Owner ID:</span>
                        <input type="text" v-model="currentVehicle.ownerID" :disabled="!isEdit" />
                    </div>
                    <div class="label-input">
                        <span>Vehicle Type:</span>
                        <input type="text" v-model="currentVehicle.vehicleType" :disabled="!isEdit" />
                    </div>
                    <div class="label-input">
                        <span>Engine Capacity:</span>
                        <input type="text" v-model="currentVehicle.engineCapacity" :disabled="!isEdit" />
                    </div>
                    <div class="label-input">
                        <span>Color:</span>
                        <input type="text" v-model="currentVehicle.color" :disabled="!isEdit" />
                    </div>
                    <div class="label-input">
                        <span>Frame Number:</span>
                        <input type="text" v-model="currentVehicle.frameNumber" :disabled="!isEdit" />
                    </div>
                    <div class="label-input">
                        <span>Engine Number:</span>
                        <input type="text" v-model="currentVehicle.engineNumber" :disabled="!isEdit" />
                    </div>
                    <div class="label-input">
                        <span>Brand:</span>
                        <input type="text" v-model="currentVehicle.brand" :disabled="!isEdit" />
                    </div>
                    <div class="label-input">
                        <span>Image URL:</span>
                        <input type="text" v-model="currentVehicle.imageUrl" :disabled="!isEdit" />
                    </div>
                </div>
            </template>
        </popup-view>
        <div></div>
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
                    width: 5,
                },
                {
                    title: 'Vehicle Name',
                    width: 9,
                },
                {
                    title: 'License Plate',
                    width: 9,
                },
                {
                    title: 'Owner ID',
                    width: 5,
                },
                {
                    title: 'Vehicle Type',
                    width: 9,
                },
                {
                    title: 'Engine Capacity',
                    width: 9,
                },
                {
                    title: 'Color',
                    width: 5,
                },
                {
                    title: 'Frame Number',
                    width: 9,
                },
                {
                    title: 'Engine Number',
                    width: 9,
                },
                {
                    title: 'Brand',
                    width: 9,
                },
                {
                    title: 'Image URL',
                    width: 17,
                },
                {
                    title: 'Action',
                    width: 5,
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
.page-vehicles {
    width: 100%;
    height: 100vh;
    display: flex;
    z-index: 1;
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
            &__ownerId,
            &__color {
                width: 5%;
            }
            &__type,
            &__brand,
            &__license,
            &__engineCapacity,
            &__frameNumber,
            &__engineNumber,
            &__name {
                width: 9%;
            }
            &__imageUrl {
                width: 17%;
            }

            &__action {
                width: 5%;
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 14px;
                img {
                    height: 20px;
                    width: 20px;
                    cursor: pointer;
                }
            }
        }
    }

    &__panel {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translate(0, -50%);
        z-index: 2;
        width: 30%;
        height: 100%;
        background-color: $neutral-200;
        overflow: auto;
        // padding: 20px;
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
    &__overlay {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 5;
        background-color: $slate-400;
        opacity: 0.7;
    }
    // &__popup {
    //     position: absolute;
    //     top: 50%; /* Đặt vị trí top ở giữa trang */
    //     left: 50%; /* Đặt vị trí left ở giữa trang */
    //     transform: translate(-50%, -50%);
    //     z-index: 6;
    // }
    &__popup {
        position: absolute;
        top: 50%; /* Đặt vị trí top ở giữa trang */
        left: 50%; /* Đặt vị trí left ở giữa trang */
        transform: translate(-50%, -50%);
        z-index: 6;
        width: 30%;
        height: 100%;
        overflow: auto;
        // background-color: $neutral-100;
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
}
</style>
