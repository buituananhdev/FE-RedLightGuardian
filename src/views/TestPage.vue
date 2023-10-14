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
            listData: [],
        }
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            axios.get('https://65218eeca4199548356d5dd6.mockapi.io/api/test').then(res => {
                this.listData = res.data;
            }).catch(error => {
                console.log(error);
            })
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
        span {
            width: calc(100% / 4);
            display: flex;
            justify-content: center;
            align-content: center;
        }
    }
}
</style>