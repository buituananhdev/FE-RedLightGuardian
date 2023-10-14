<template>
    <div class="page-main">
        <table-view :listHeader="listHeader" :requestUrl="'/vehicle'" ref="tableview" :listData="listData">
            <template v-slot:tbody>
                <div class="row" v-for="item in listData" :key="item.id">
                    <span>{{ item.id }}</span>
                    <span>{{ item.vehicleName }}</span>
                    <span>{{ item.licensePlate }}</span>
                    <span>{{ item.ownerID }}</span>
                    <span>{{ item.vehicleType }}</span>
                    <span>{{ item.brand }}</span>
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
                    width: 28,
                },
                {
                    title: 'Vehicle Name',
                    width: 23,
                },
                {
                    title: 'License Plate',
                    width: 25,
                },
                {
                    title: 'Owner ID',
                    width: 25,
                },
                {
                    title: 'Vehicle Type',
                    width: 25,
                },
                {
                    title: 'Brand',
                    width: 29,
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
                const response = await axios.get('https://65240f70ea560a22a4e955b5.mockapi.io/vehicle')
                this.listData = response.data
                console.log('res', this.listData)
            } catch (error) {
                console.error(error)
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.page-main {
    width: 100%;
    height: 100vh;
    .row {
        display: flex;
        padding: 12px 0;
        // Đặt màu nền cho các hàng lẻ
        &:nth-child(odd) {
            background-color: $neutral-100;
        }
        // Đặt màu nền cho các hàng chẵn
        &:nth-child(even) {
            background-color: $neutral-400;
        }
        span {
            width: calc(100% / 6);
            display: flex;
            justify-content: center;
            align-content: center;
            white-space: nowrap;
            flex: 1;
        } 
    }   
}
</style>
