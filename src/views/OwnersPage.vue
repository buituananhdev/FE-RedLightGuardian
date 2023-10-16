<template>
    <div class="page-owners">
        <table-view
            :listHeader="listHeader"
            :requestUrl="'/test'"
            ref="tableview"
            :listData="listData"
            class="page-owners__table"
        >
            <template v-slot:tbody>
                <div
                    class="page-owners__table__row"
                    v-for="(item, index) in listData"
                    :key="item.id"
                    :class="!(index % 2) ? 'bold' : ' unbold'"
                >
                    <span class="page-owners__table__row__id">{{ index + 1 }}</span>
                    <span class="page-owners__table__row__username" @click="getSingleOwner(item.id)">{{ item.name }}</span>
                    <span class="page-owners__table__row__address">{{ item.address }}</span>
                    <span class="page-owners__table__row__email">{{ item.email }}</span>
                    <div class="page-owners__table__row__action">
                        <img src="@/assets/icons/edit-icon.svg" alt="edit" @click="showUpdate()" />
                        <img src="@/assets/icons/delete-icon.svg" alt="delete" @click="deleteOwner(item.id)"
                        />
                    </div>
                </div>
            </template>
        </table-view>
        <panel-view
            :title="'test'"
            class="page-owners__panel"
            v-if="isShowDetail"
            @close-panel="isShowDetail = false"
        >
        <template v-slot:pbody>
            <div class="page-owners__panel__content">
                <span>Name:</span>
                <input type="text" v-model="currentOwner.name" name="" id="" :disabled="!isEdit">
                <span>Address:</span>
                <input type="text" v-model="currentOwner.address" :disabled="!isEdit">
                <span>Email:</span>
                <input type="text" v-model="currentOwner.email" name="" id="" :disabled="!isEdit">
            </div>
        </template>
        </panel-view>
    </div>
</template>

<script>
import { deleteOwner, getAllOwners, getSingleOwner } from '@/services/owner.service'
export default {
    data() {
        return {
            listHeader: [
                {
                    title: 'Id',
                    width: 15,
                },
                {
                    title: 'Name',
                    width: 20,
                },
                {
                    title: 'Address',
                    width: 25,
                },
                {
                    title: 'Email',
                    width: 20,
                },
                {
                    title: 'Action',
                    width: 20,
                },
            ],
            listData: [],
            currentOwner: {},
            isEdit: false,
            isShowDetail: false,
        }
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        async fetchData() {
            try {
                const res = await getAllOwners();
                this.listData = res.data.data
            } catch (error) {
                console.error(error)
            }
        },
        async deleteOwner(id) {
            try {
                const res = await deleteOwner(id);
                if(res.data.status === "success") {
                    this.listData  = this.listData.filter( owner => owner.id !== id);
                    this.$notify({
                        type: 'success',
                        title: 'Delete Owner',
                        text: 'Delete owner successfully!',
                    })
                }
            } catch (error) {
                $notify({
                        type: 'error',
                        title: 'Delete Owner',
                        text: 'Delete owner failed!',
                        duration: 1000,
                    })
            }
            
        },
        async getSingleOwner(id) {
            try {
                const res = await getSingleOwner(id);
                this.currentOwner = res.data.data;
                this.isShowDetail = true
            } catch (error) {
                console.error(error);
            }
        },
        showUpdate() {
            this.isEdit = true;
            this.isShowDetail = true;
        }
    },
}
</script>
<style lang="scss" scoped>
.page-owners {
    width: 100%;
    height: 100vh;
    display: flex;
    &__table {
        &__row {
            padding: 0 16px;
            padding-right: 20px ;
            display: flex;
            width: 100%;
            gap: 20px;
            background: var(--neutral-100, #fafcfe);
            &.bold {
                background: var(--neutral-300, #f4f7fe);
            }
            span {
                padding: 16px 24px;
                display: flex;
                justify-content: center;
                align-content: center;
            }
            &__id {
                width: 15%;
            }
            &__email, &__username {
                width: 20%;
            }
            &__address {
                width: 25%;
            }
            &__action {
                width: 20%;
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
    &__panel {
        &__content {
            display: flex;
            flex-direction: column;
            input {
                margin-bottom: 10px;
            }
            span {
                padding: 7px 0;
            }
        }
    }
}
</style>
