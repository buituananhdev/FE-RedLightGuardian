<template>
    <div class="page-main">
        <table-view :listHeader="listHeader" :requestUrl="'/test'" ref="tableview" :listData="listData">
            <template v-slot:tbody>
                <div class="row" v-for="item in listData" :key="item.id">
                    <span>{{ item.id }}</span>
                    <span>{{ item.Status }}</span>
                    <span>{{ item.Construction }}</span>
                    <span>{{ item.Created }}</span>
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
            listData: [
                {
                    Construction: 'Construction 1',
                    Status: 'Status 1',
                    Created: 'Created 1',
                    id: '1',
                },
                {
                    Construction: 'Construction 2',
                    Status: 'Status 2',
                    Created: 'Created 2',
                    id: '2',
                },
                {
                    Construction: 'Construction 3',
                    Status: 'Status 3',
                    Created: 'Created 3',
                    id: '3',
                },
                {
                    Construction: 'Construction 4',
                    Status: 'Status 4',
                    Created: 'Created 4',
                    id: '4',
                },
                {
                    Construction: 'Construction 5',
                    Status: 'Status 5',
                    Created: 'Created 5',
                    id: '5',
                },
                {
                    Construction: 'Construction 6',
                    Status: 'Status 6',
                    Created: 'Created 6',
                    id: '6',
                },
                {
                    Construction: 'Construction 7',
                    Status: 'Status 7',
                    Created: 'Created 7',
                    id: '7',
                },
                {
                    Construction: 'Construction 8',
                    Status: 'Status 8',
                    Created: 'Created 8',
                    id: '8',
                },
                {
                    Construction: 'Construction 9',
                    Status: 'Status 9',
                    Created: 'Created 9',
                    id: '9',
                },
                {
                    Construction: 'Construction 10',
                    Status: 'Status 10',
                    Created: 'Created 10',
                    id: '10',
                },
                {
                    Construction: 'Construction 11',
                    Status: 'Status 11',
                    Created: 'Created 11',
                    id: '11',
                },
                {
                    Construction: 'Construction 12',
                    Status: 'Status 12',
                    Created: 'Created 12',
                    id: '12',
                },
                {
                    Construction: 'Construction 13',
                    Status: 'Status 13',
                    Created: 'Created 13',
                    id: '13',
                },
                {
                    Construction: 'Construction 14',
                    Status: 'Status 14',
                    Created: 'Created 14',
                    id: '14',
                },
                {
                    Construction: 'Construction 15',
                    Status: 'Status 15',
                    Created: 'Created 15',
                    id: '15',
                },
                {
                    Construction: 'Construction 16',
                    Status: 'Status 16',
                    Created: 'Created 16',
                    id: '16',
                },
                {
                    Construction: 'Construction 17',
                    Status: 'Status 17',
                    Created: 'Created 17',
                    id: '17',
                },
                {
                    Construction: 'Construction 18',
                    Status: 'Status 18',
                    Created: 'Created 18',
                    id: '18',
                },
                {
                    Construction: 'Construction 19',
                    Status: 'Status 19',
                    Created: 'Created 19',
                    id: '19',
                },
                {
                    Construction: 'Construction 20',
                    Status: 'Status 20',
                    Created: 'Created 20',
                    id: '20',
                }
            ],
            listHeader: [
                {
                    title: 'Id',
                    width: 25,
                },
                {
                    title: 'Construction',
                    width: 25,
                },
                {
                    title: 'Status',
                    width: 25,
                },
                {
                    title: 'Created At',
                    width: 25,
                },
            ],
        }
    },
}
</script>
<style lang="scss" scoped>
.page-main {
    width: 100%;
    height: 100vh;
    .row {
        display: flex;
        span {
            width: calc(100% / 4);
            display: flex;
            justify-content: center;
            align-content: center;
        }
    }
}
</style>
