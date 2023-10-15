<template>
    <div class="page-owners">
        <table-view
            :listHeader="listHeader"
            :requestUrl="'/test'"
            ref="tableview"
            :listData="listData"
            :class="{'page-owners__table': true, 'w-100': isShowDetail, 'w-70': !isShowDetail }"
        >
            <template v-slot:tbody>
                <div
                    class="page-owners__table__row"
                    v-for="(item, index) in listData"
                    :key="item.id"
                    :class="!(index % 2) ? 'bold' : ' unbold'"
                >
                    <span class="page-owners__table__row__id">{{ index + 1 }}</span>
                    <span class="page-owners__table__row__username">{{ item.name }}</span>
                    <span class="page-owners__table__row__address">{{ item.address }}</span>
                    <span class="page-owners__table__row__email">{{ item.email }}</span>
                    <div class="page-owners__table__row__action">
                        <img src="@/assets/icons/edit-icon.svg" alt="edit" />
                        <img src="@/assets/icons/delete-icon.svg" alt="delete" @click="deleteOwner(item.id)"
                        />
                    </div>
                </div>
            </template>
        </table-view>
    </div>
</template>

<script>
import { deleteOwner, getAllOwners } from '@/services/owner.service'
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
            display: flex;
            width: 100%;
            gap: 40px;
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
    
    .detail-infor {
        width: 30%;
        position: relative;
        h3 {
            font-weight: 600;
            padding: 10px 0;
        }
        .close-icon {
            position: absolute;
            top:10px;
            right: 10px;
        }
    }
}
</style>
