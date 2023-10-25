<template>
    <div class="page-owners">
        <!-- <button class="page-owners" @click="showPopup">
            <img src="@/assets/icons/close-icon.svg" alt="">
        </button> -->
        <table-view
            :listHeader="listHeader"
            :requestUrl="'/test'"
            ref="tableview"
            :listData="listData"
            class="page-owners__table"
        >
            <template v-slot:tbody>
                <div
                    class="page-owners__table__row"
                    v-for="(item, index) in listData"
                    :key="item.id"
                    :class="!(index % 2) ? 'bold' : ' unbold'"
                >
                    <span class="page-owners__table__row__id">{{ index + 1 }}</span>
                    <span class="page-owners__table__row__idCitizen">{{ item.citizen_identification }}</span>
                    <span class="page-owners__table__row__username" @click="getSingleOwner(item.id)">{{
                        item.name
                    }}</span>
                    <span class="page-owners__table__row__address">{{ item.address }}</span>
                    <span class="page-owners__table__row__email">{{ item.email }}</span>
                    <div class="page-owners__table__row__action">
                        <img src="@/assets/icons/edit-icon.svg" alt="edit" @click="showUpdate(item.id)" />
                        <img src="@/assets/icons/delete-icon.svg" alt="delete" @click="deleteOwner(item.id)" />
                    </div>
                </div>
            </template>
        </table-view>
        <panel-view
            :title="title"
            :isEdit="isEdit"
            class="page-owners__panel"
            v-if="isShowDetail"
            @close-panel="isShowDetail = false"
            @update-object="updateOwner"
        >
            <template v-slot:pbody>
                <div class="page-owners__panel__content">
                    <div class="label-input">
                        <span>Citizen id:</span>
                        <input
                            type="text"
                            v-model="currentOwner.citizen_identification"
                            name=""
                            id="name"
                            :disabled="!isEdit"
                        />
                    </div>
                    <div class="label-input">
                        <span>Name:</span>
                        <input type="text" v-model="currentOwner.name" name="" id="name" :disabled="!isEdit" />
                    </div>
                    <div class="label-input">
                        <span>Address:</span>
                        <input type="text" v-model="currentOwner.address" name="" id="address" :disabled="!isEdit" />
                    </div>
                    <div class="label-input">
                        <span>Email:</span>
                        <input type="email" v-model="currentOwner.email" name="" id="" :disabled="!isEdit" />
                    </div>
                </div>
            </template>
        </panel-view>
        <div class="page-owners__overlay" v-if="isShowPopup"></div>
        <popup-view
            title="Create Owner"
            class="page-owners__popup"
            v-if="isShowPopup"
            @onCancel="hiddenPopup"
            @onOk="createOwner"
        >
            <template v-slot:popupbody>
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
                    <input type="text" v-model="currentOwner.address" name="" id="address" />
                </div>
                <div class="label-input">
                    <span>Email:</span>
                    <input type="email" v-model="currentOwner.email" name="" id="" />
                </div>
            </template>
        </popup-view>
        <div></div>
    </div>
</template>

<script>
import { deleteOwner, getAllOwners, getSingleOwner, updateOwner, addOwner } from '@/services/owner.service'

export default {
    data() {
        return {
            listHeader: [
                {
                    title: 'Id',
                    width: 15,
                },
                {
                    title: 'Citizen id',
                    width: 15,
                },
                {
                    title: 'Name',
                    width: 20,
                },
                {
                    title: 'Address',
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
        }
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        async fetchData() {
            try {
                const res = await getAllOwners()
                this.listData = res.data.data
            } catch (error) {
                console.error(error)
            }
        },
        async deleteOwner(id) {
            try {
                const res = await deleteOwner(id)
                if (res.data.status === 'success') {
                    this.listData = this.listData.filter((owner) => owner.id !== id)
                    this.$notify({
                        type: 'success',
                        title: 'Delete Owner',
                        text: 'Delete owner successfully!',
                    })
                }
            } catch (error) {
                this.$notify({
                    type: 'error',
                    title: 'Delete Owner',
                    text: 'Delete owner failed!',
                    duration: 1000,
                })
            }
        },
        async getSingleOwnerF(id) {
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
        },
        hiddenPopup() {
            this.isShowPopup = false
        },
        async createOwner() {
            try {
                const res = await addOwner(this.currentOwner)
                if (res.data.status === 'success') {
                    this.isShowPopup = false
                    this.$notify({
                        type: 'success',
                        title: 'Add Owner',
                        text: 'Add owner successfully!',
                    })
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
    },
}
</script>
<style lang="scss" scoped>
.page-owners {
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
            &__username,
            &__idCitizen,
            &__id {
                width: 15%;
            }
            &__address {
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
    &__overlay {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 2;
        background-color: $slate-400;
        opacity: 0.7;
    }
    &__popup {
        position: absolute;
        top: 50%; /* Đặt vị trí top ở giữa trang */
        left: 50%; /* Đặt vị trí left ở giữa trang */
        transform: translate(-50%, -50%);
        z-index: 3;
    }
}
</style>
