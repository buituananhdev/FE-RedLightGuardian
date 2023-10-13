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
                    <span class="user-id">{{ index + 1 }}</span>
                    <span class="user-username">{{ item.username }}</span>
                    <div class="user-action">
                        <img src="@/assets/icons/edit-icon.svg" alt="edit" width="20" height="20" @click="editUser" />
                        <img
                            src="@/assets/icons/delete-icon.svg"
                            alt="delete"
                            width="20"
                            height="20"
                            @click="deleteUser(item.id)"
                        />
                    </div>
                </div>
            </template>
        </table-view>
    </div>
</template>

<script>
import { getAllUsers, deleteUser } from '@/services/user.service'
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
            try {
                const res = await getAllUsers();
                this.listData = res.data.data;
                console.log('check', this.listData);
            } catch (error) {
                console.error(error);
            }
        },
        async deleteUser(id) {
            try {
                const res = await deleteUser(id);
                if(res.data.status === 'success') {
                    this.listData = this.listData.filter(user => user.id !== id);
                    this.$notify({
                        type: 'success',
                        title: 'Delete User',
                        text: 'Delete user successfully!',
                    })
                }
            } catch (error) {
                console.error(error);
                $notify({
                        type: 'error',
                        title: 'Delete User',
                        text: 'Delete user failed!',
                        duration: 1000,
                    })
            }
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
            justify-content: center;
            gap: 10px;
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
