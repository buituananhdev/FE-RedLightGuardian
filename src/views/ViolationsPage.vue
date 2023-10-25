<template>
    <div class="page-violations">
        <table-view
            :listHeader="listHeader"
            :requestUrl="'/violations'"
            ref="tableview"
            :listData="listData"
            class="page-violations__table"
        >
            <template v-slot:tbody>
                <div
                    class="page-violations__table__row"
                    v-for="(item, index) in listData"
                    :key="item.id"
                    :class="{ bold: !(index % 2) }"
                    @click="getSingleViolation(item.id)"
                >
                    <span class="page-violations__table__row__id">{{ item.id }}</span>
                    <span class="page-violations__table__row__type">{{ item.type }}</span>
                    <span class="page-violations__table__row__deadline">{{ item.deadline }}</span>
                    <span class="page-violations__table__row__status">{{ item.status }}</span>
                    <span class="page-violations__table__row__id">{{ item.vehicleID }}</span>
                    <span class="page-violations__table__row__time">{{ item.time }}</span>
                    <span class="page-violations__table__row__id">{{ item.cameraID }}</span>
                    <span class="page-violations__table__row__imageUrl">{{ item.imageUrl }}</span>
                    <div class="page-violations__table__row__action">
                        <img src="@/assets/icons/edit-icon.svg" alt="edit" @click="showUpdate(item.id)" />
                        <img src="@/assets/icons/delete-icon.svg" alt="delete" @click="deleteViolation(item.id)" />
                    </div>
                </div>
            </template>
        </table-view>
        <panel-view
            :title="title"
            :isEdit="isEdit"
            class="page-violations__panel"
            v-if="isShowDetail"
            @close-panel="closePanelView"
            @update-object="updateViolation"
        >
            <template v-slot:pbody>
                <div class="page-violations__panel__content">
                    <span>Type:</span>
                    <input type="text" v-model="currentViolation.type" :disabled="!isEdit" />
                    <span>Deadline:</span>
                    <input type="text" v-model="currentViolation.deadline" :disabled="!isEdit" />
                    <span>Status:</span>
                    <input type="text" v-model="currentViolation.status" :disabled="!isEdit" />
                    <span>Vehicle ID:</span>
                    <input type="text" v-model="currentViolation.vehicleID" :disabled="!isEdit" />
                    <span>Time:</span>
                    <input type="text" v-model="currentViolation.time" :disabled="!isEdit" />
                    <span>Camera ID:</span>
                    <input type="text" v-model="currentViolation.cameraID" :disabled="!isEdit" />
                    <span>Image URL:</span>
                    <input type="text" v-model="currentViolation.imageUrl" :disabled="!isEdit" />
                </div>
            </template>
        </panel-view>
    </div>
</template>

<script>
import { getAllViolations, deleteViolation, getSingleViolation, updateViolation } from '@/services/violation.service'
export default {
    data() {
        return {
            listHeader: [
                {
                    title: 'Id',
                    width: 5,
                },
                {
                    title: 'Type',
                    width: 15,
                },
                {
                    title: 'Deadline',
                    width: 15,
                },
                {
                    title: 'Status',
                    width: 10,
                },
                {
                    title: 'Vehicle ID',
                    width: 5,
                },
                {
                    title: 'Time',
                    width: 15,
                },
                {
                    title: 'Camera ID',
                    width: 5,
                },
                {
                    title: 'Image Url',
                    width: 20,
                },
                {
                    title: 'Action',
                    width: 10,
                },
            ],
            listData: [],
            currentViolation: {},
            isEdit: false,
            isShowDetail: false,
            title: 'View Detail',
        }
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        async fetchData() {
            try {
                const res = await getAllViolations()
                this.listData = res.data.data
            } catch (error) {
                console.error(error)
            }
        },
        async deleteViolation(id) {
            try {
                const res = await deleteViolation(id)
                if (res.data.status === 'success') {
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
        showUpdate(id) {
            this.isEdit = true
            this.isShowDetail = true
            this.getSingleViolation(id)
        },
        closePanelView() {
            this.isShowDetail = false
            this.isEdit = false
        },
    },
}
</script>
<style lang="scss" scoped>
.page-violations {
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
            &__id {
                width: 5%;
            }
            &__time,
            &__type,
            &__deadline {
                width: 15%;
            }
            &__status {
                width: 10%;
            }
            &__imageUrl {
                width: 20%;
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
        position: absolute;
        right: 0;
        top: 50%;
        transform: translate(0, -50%);
        z-index: 2;
        width: 30%;
        height: 100%;
        background-color: $neutral-200;
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
    &__popup {
        position: absolute;
        top: 50%; /* Đặt vị trí top ở giữa trang */
        left: 50%; /* Đặt vị trí left ở giữa trang */
        transform: translate(-50%, -50%);
        z-index: 6;
    }
}
</style>
