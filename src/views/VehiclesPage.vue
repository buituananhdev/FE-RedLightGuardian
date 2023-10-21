<template>
    <div class="page-vehicles">
        <table-view
            :listHeader="listHeader"
            :requestUrl="'/vehicles'"
            ref="tableview"
            :listData="listData"
            :class="{ 'page-vehicles__table': true, 'w-100': isShowDetail, 'w-70': !isShowDetail }"
        >
            <template v-slot:tbody>
                <div
                    class="page-vehicles__table__row"
                    v-for="(item, index) in listData"
                    :key="item.id"
                    :class="!(index % 2) ? 'bold' : ' unbold'"
                >
                    <span class="page-vehicles__table__row__id">{{ item.id }}</span>
                    <span class="page-vehicles__table__row__name">{{ item.vehicleName }}</span>
                    <span class="page-vehicles__table__row__license">{{ item.licensePlate }}</span>
                    <span class="page-vehicles__table__row__ownerId">{{ item.ownerID }}</span>
                    <span class="page-vehicles__table__row__type">{{ item.vehicleType }}</span>
                    <span class="page-vehicles__table__row__brand">{{ item.brand }}</span>
                    <div class="page-vehicles__table__row__action">
                        <img src="@/assets/icons/edit-icon.svg" alt="edit" width="20" height="20" />
                        <img
                            src="@/assets/icons/delete-icon.svg"
                            alt="delete"
                            width="20"
                            height="20"
                            @click="deleteVehicle(item.id)"
                        />
                    </div>
                </div>
            </template>
        </table-view>
    </div>
</template>

<script>
import { getAllVehicles, deleteVehicle } from '@/services/vehicle.service'
export default {
    data() {
        return {
            listHeader: [
                {
                    title: 'Id',
                    width: 10,
                },
                {
                    title: 'Vehicle Name',
                    width: 20,
                },
                {
                    title: 'License Plate',
                    width: 15,
                },
                {
                    title: 'Owner ID',
                    width: 10,
                },
                {
                    title: 'Vehicle Type',
                    width: 15,
                },
                {
                    title: 'Brand',
                    width: 15,
                },
                {
                    title: 'Action',
                    width: 15,
                },
            ],
            listData: [],
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
                $notify({
                    type: 'error',
                    title: 'Delete Vehicle',
                    text: 'Delete vehicle failed!',
                    duration: 1000,
                })
            }
        },
    },
}
</script>
<style lang="scss" scoped>
.page-vehicles {
    width: 100%;
    height: 100%;
    display: flex;
    &__table {
        &__row {
            display: flex;
            width: 100%;
            gap: 40px;
            background: $neutral-100;
            &.bold {
                background: $neutral-300;
            }

            span {
                padding: 16px 24px;
                display: flex;
                justify-content: center;
                align-content: center;
            }
            &__id {
                width: 10%;
            }
            &__name {
                width: 20%;
            }
            &__type,
            &__brand,
            &__license {
                width: 15%;
            }

            &__action {
                width: 15%;
                display: flex;
                justify-content: center;
                gap: 20px;
                img {
                    height: 20px;
                    width: 20px;
                }
            }
        }
    }
    .detail-infor {
        width: 30%;
        position: relative;
        h3 {
            font-weight: 600;
            padding: 10px 0;
        }
        .close-icon {
            position: absolute;
            top: 10px;
            right: 10px;
        }
    }
}
</style>
