<template>
    <div>
        <div class="pagination">
            <div v-if="isHaveContent" class="pagination-content">
                <span class="total-page">Total page: {{ meta.totalPages }}</span>
                <span class="pagination-btn">
                    <img
                        v-if="meta.hasPrevPage"
                        style="cursor: pointer"
                        src="@/assets/icons/arrow-left-icon.svg"
                        alt=""
                        @click="goToPrevPage()"
                    />
                    <p v-if="meta.currentPage >= 3" style="cursor: context-menu">...</p>
                    <p v-if="meta.hasPrevPage" @click="goToPrevPage()">
                        {{ meta.currentPage - 1 }}
                    </p>
                    <p class="active-page">{{ meta.currentPage }}</p>
                    <p v-if="meta.hasNextPage" @click="goToNextPage()">
                        {{ meta.currentPage + 1 }}
                    </p>
                    <p v-if="meta.currentPage + 1 < meta.totalPages" style="cursor: context-menu">...</p>
                    <img
                        v-if="meta.hasNextPage"
                        style="cursor: pointer"
                        src="@/assets/icons/arrow-right-icon.svg"
                        alt=""
                        @click="goToNextPage()"
                    />
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        meta: {
            type: Object,
            default() {
                return {
                    hasPrevPage: false,
                    hasNextPage: true,
                    currentPage: 1,
                    totalPages: 1,
                }
            },
        },
        isHaveContent: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['go-to-next-page', 'go-to-prev-page'],
    methods: {
        goToPrevPage() {
            this.$emit('go-to-prev-page')
        },
        goToNextPage() {
            this.$emit('go-to-next-page')
        },
    },
}
</script>

<style scoped lang="scss">
.pagination {
    width: 100%;
    height: 80px;
    padding: 15px 50px;
    display: flex;
    justify-content: flex-end;
}
.pagination-content {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 400px;
    height: 100%;
    gap: 15px;
}
.pagination-btn {
    display: flex;
    align-items: center;
    width: 100px;
    gap: 18px;
}

.pagination-btn p {
    cursor: pointer;
}

.active-page {
    /* background: #008cde; */
    background-color: $secondary-500;
    padding: 5px 8px;
    color: #fff;
    border-radius: 3px;
}

.empty-icn {
    width: 100%;
    height: 100%;
    flex-direction: column;
    gap: 12px;
}
.empty-err-mess {
    font-size: 32px;
    font-weight: 500;
    color: #9fa2b4;
}
.action-container {
    position: relative;
    width: 100%;
    padding: 0 42px;
    display: flex;
    gap: 8px;
}
</style>
