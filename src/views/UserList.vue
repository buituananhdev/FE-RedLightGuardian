<template>
    <div class="page-users">
        <table-view :listHeader="listHeader" :requestUrl="'/test'" ref="tableview" :listData="listData" class="page-users__table">
            <template v-slot:tbody>
                <div
                    class="page-users__table__row"
                    v-for="(item, index) in listData"
                    :key="item.id"
                    :class="{ 'bold': !(index % 2)}"
                >
                    <span class="page-users__table__row__id">{{ index + 1 }}</span>
                    <span class="page-users__table__row__username">{{ item.username }}</span>
                    <div class="page-users__table__row__action">
                        <img src="@/assets/icons/edit-icon.svg" alt="edit" @click="editUser" />
                        <img src="@/assets/icons/delete-icon.svg" alt="delete" @click="deleteUser(item.id)" />
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
.page-users {
    width: 100%;
    height: 100vh;
    &__table{
        &__row {
            display: flex;
            width: 100%;
            gap: 40px;
            background: var(--neutral-100, #fafcfe);
            span {
                padding: 16px 24px;
                display: flex;
                justify-content: center;
                align-content: center;
            }
            &__id {
                width: 20%;
            }
            &__username {
                width: 50%;
            }
            &__action {
                width: 30%;
                display: flex;
                justify-content: center;
                gap: 10px;
                img {
                    height: 20px;
                    width: 25px;
                }
            }
            &.bold {
                background: var(--neutral-300, #f4f7fe);
            }
        }
    }
    
}
</style>
