<template>
    <div class="page-main">
        <table-view :listHeader="listHeader" :requestUrl="'/vehicle'" ref="tableview" :listData="listData">
            <template v-slot:tbody>
                <div
                    class="row"
                    v-for="(item, index) in listData"
                    :key="item.id"
                    :class="!(index % 2) ? 'bold' : ' unbold'"
                >
                    <span class="width-10">{{ item.id }}</span>
                    <span class="width-20">{{ item.vehicleName }}</span>
                    <span class="width-20">{{ item.licensePlate }}</span>
                    <span class="width-10">{{ item.ownerID }}</span>
                    <span class="width-20">{{ item.vehicleType }}</span>
                    <span class="width-10">{{ item.brand }}</span>
                    <div class="user-action width-10">
                        <img src="@/assets/icons/edit-icon.svg" alt="" width="20" height="20" />
                        <img src="@/assets/icons/delete-icon.svg" alt="" width="20" height="20" />
                    </div>
                </div>
            </template>
        </table-view>
    </div>
</template>

<script>
import axios from 'axios'
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
                {
                    title: 'Brand',
                    width: 10,
                },
                {
                    title: 'Action',
                    width: 10,
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
            axios
                .get('https://65240f70ea560a22a4e955b5.mockapi.io/vehicle')
                .then((res) => {
                    this.listData = res.data
                })
                .catch((error) => {
                    console.log(error)
                })
        },
    },
}
</script>
<style lang="scss" scoped>
.page-main {
    width: 100%;
    height: 100vh;
    .row {
        display: flex;
        width: 100%;
        gap: 20px;
        span {
            padding: 16px 24px;
            display: flex;
            justify-content: center;
            align-content: center;
        }
        .width-10 {
            width: 10%;
        }
        .width-20 {
            width: 20%;
        }
        .user-action {
            display: flex;
            gap: 40;
            justify-content: center;
        }
    }
    .bold {
        background: var(--neutral-300, #f4f7fe);
    }
    .unbold {
        background: var(--neutral-100, #fafcfe);
    }
}
</style>
