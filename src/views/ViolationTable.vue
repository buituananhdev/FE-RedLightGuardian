<template>
    <div class="page-main">
        <table-view :listHeader="listHeader" :requestUrl="'/violation'" ref="tableview" :listData="listData">
            <template v-slot:tbody>
                <div class="row" v-for="item in listData" :key="item.id">
                    <span>{{ item.id }}</span>
                    <span>{{ item.name }}</span>
                    <span>{{ item.vehicleID }}</span>
                    <span>{{ item.time }}</span>
                    <span>{{ item.imageUrl }}</span>
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
                    width: 26,
                },
                {
                    title: 'Violation Name',
                    width: 23,
                },
                {
                    title: 'Vehicle ID',
                    width: 25,
                },
                {
                    title: 'Time',
                    width: 25,
                },
                {
                    title: 'Image Url',
                    width: 25,
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
                const response = await axios.get('https://65240f70ea560a22a4e955b5.mockapi.io/violation')
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
            width: calc(100% / 4);
            display: flex;
            justify-content: center;
            align-content: center;
            white-space: nowrap; // Ngăn các nội dung quá dài bị cắt
            flex: 1;
            padding: 4px; // Thêm khoảng cách nếu cần

            // Tùy chỉnh khoảng cách giữa các span nếu cần
            &:not(:last-child) {
                margin-right: 46px;
            }
            &:first-child {
                margin-left: 18px;
            }
        } 
    }   
}
</style>
