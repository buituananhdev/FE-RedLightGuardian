<template>
    <div class="page-main">
        <table-view :listHeader="listHeader" :requestUrl="'/test'" ref="tableview" :listData="listData">
            <template v-slot:tbody>
                <div
                    class="row"
                    v-for="(item, index) in listData"
                    :key="item.id"
                    :class="!(index % 2) ? 'bold' : ' unbold'"
                >
                    <span class="width-10">{{ item.id }}</span>
                    <span class="width-20">{{ item.name }}</span>
                    <span class="width-10">{{ item.vehicleID }}</span>
                    <span class="width-20">{{ item.time }}</span>
                    <span class="width-20">{{ item.imageUrl }}</span>
                    <div class="user-action width-20">
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
                    title: 'Họ và tên',
                    width: 20,
                },
                {
                    title: 'Id vehicle',
                    width: 10,
                },
                {
                    title: 'Time',
                    width: 20,
                },
                {
                    title: 'Image',
                    width: 20,
                },
                {
                    title: 'Action',
                    width: 20,
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
                .get('https://652182c1a4199548356d4f70.mockapi.io/violation/violations')
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
