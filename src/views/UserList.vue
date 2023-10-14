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
                    <span class="user-id">{{ item.id }}</span>
                    <span class="user-username">{{ item.username }}</span>
                    <div class="user-action">
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
                    width: 20,
                },
                {
                    title: 'User Name',
                    width: 50,
                },
                {
                    title: 'Action',
                    width: 30,
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
                .get('https://652182c1a4199548356d4f70.mockapi.io/violation/users')
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
        .user-id {
            width: 20%;
        }
        .user-username {
            width: 50%;
        }
        .user-action {
            width: 30%;
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
