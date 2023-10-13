<template>
    <div class="page-main">
        <table-view
            :listHeader="listHeader"
            :requestUrl="'/test'"
            ref="tableview"
            :class="{ 'table-owner': true, 'w-100': isShowDetail, 'w-70': !isShowDetail }"
        >
            <template v-slot:tbody>
                <div
                    class="row"
                    v-for="(item, index) in listData"
                    :key="item.id"
                    :class="!(index % 2) ? 'bold' : ' unbold'"
                >
                    <span class="user-id">{{ index + 1 }}</span>
                    <span class="user-username">{{ item.name }}</span>
                    <span class="user-username">{{ item.email }}</span>
                    <span class="user-username">{{ item.address }}</span>
                    <div class="user-action">
                        <img src="@/assets/icons/edit-icon.svg" alt="edit" width="20" height="20" @click="editUser" />
                        <img
                            src="@/assets/icons/delete-icon.svg"
                            alt="delete"
                            width="20"
                            height="20"
                            @click="deleteOwner(item.id)"
                        />
                    </div>
                </div>
            </template>
        </table-view>
        <div class="detail-infor" v-if="!isShowDetail">
            <img src="@/assets/icons/close-icon.svg" alt="close" class="close-icon">
            <h3>Detail Owner</h3>
            <div class="detail-content">
                <p>STT:</p>
                <input type="text" id="id" v-model="ownerCurrent.id" />
                <p>name:</p>
                <input type="text" id="name" v-model="ownerCurrent.id" />
                <p>Email:</p>
                <input type="email" id="email" v-model="ownerCurrent.id" />
                <p >Address:</p>
                <input type="text" v-model="ownerCurrent.id" id="address" />
            </div>
        </div>
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
            ownerCurrent: {},
            isShowDetail: false,
        }
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        async fetchData() {
            try {
                // const res = await getAllOwners();
                const res = await axios.get(`https://652182c1a4199548356d4f70.mockapi.io/violation/owners`)
                console.log('res', res)
                this.listData = res.data
                console.log('check', this.listData)
            } catch (error) {
                console.error(error)
            }
        },
        async getSingleOwner(id) {
            try {
                // const res = await getAllOwners();
                const res = await axios.get(`https://652182c1a4199548356d4f70.mockapi.io/violation/owners/${id}`)
                console.log('res', res)
                this.ownerCurrent = res.data
                console.log('check', this.ownerCurrent)
            } catch (error) {
                console.error(error)
            }
        },
        async deleteOwner(id) {
            try {
                // const res = await deleteOwner(id);
                const res = await axios.delete(`https://652182c1a4199548356d4f70.mockapi.io/violation/owners/${id}`)
                // if(res.data.status === 'success') {
                this.listData = this.listData.filter((user) => user.id !== id)
                this.$notify({
                    type: 'success',
                    title: 'Delete Owner',
                    text: 'Delete Owner successfully!',
                })
                // }
            } catch (error) {
                console.error(error)
                $notify({
                    type: 'error',
                    title: 'Delete Owner',
                    text: 'Delete Owner failed!',
                    duration: 1000,
                })
            }
        },
    },
}
</script>
<style lang="scss" scoped>
.w-100 {
    width: 100%;
}
.w-70 {
    width: 70%;
}
.page-main {
    width: 100%;
    height: 100vh;
    display: flex;
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
