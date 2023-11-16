<template>
    <div class="tableview" :class="{ 'half-width': true }">
        <div class="tableview__header">
            <div class="tableview__header__filter-container">
                <div v-if="label !== 'violations'" class="tableview__header__filter-container__search">
                    <img src="@/assets/icons/glass-icon.svg" alt="" />
                    <input
                        v-model="searchValue"
                        class="input_search"
                        type="text"
                        placeholder="Search"
                        @input="onSearchInput"
                    />
                </div>
                <!-- <div class="tableview__header__filter-container__filter">
                    <select-box type_select_box="status-white" :label="'name'" :placeholder="'Chọn gì đó'" />
                </div> -->
                <slot name="fbody"></slot>
            </div>
            <button-vue
                v-if="!isViolation"
                :type-btn="'secondary'"
                :width="'100px'"
                class="tableview__header__button"
                @click-button="$emit('click-button')"
            >
                + Add
            </button-vue>
        </div>
        <div class="tableview__container" :class="{ 'blank-pagination': !listData.length }">
            <div class="tableview__container__head">
                <div class="tableview__container__head__row">
                    <div
                        v-for="(item, index) in listHeaderFiltered"
                        :key="index"
                        class="tableview__container__head__row__cell"
                        :style="{ width: columnStyle(item) + '%' }"
                        :class="{
                            'left-align': item.textAlign === 'left',
                            'center-align': item.textAlign === 'center',
                        }"
                    >
                        <span>{{ item.title }}</span>
                    </div>
                </div>
            </div>
            <div class="tableview__container__body overflow-y" v-if="listData.length">
                <slot name="tbody"></slot>
            </div>
            <div v-else class="tableview__empty">
                <span>Không có dữ liệu</span>
            </div>
        </div>
        <div class="tableview__pagination">
            <panigate-vue
                :meta="meta"
                :is-have-content="isHaveContent"
                @go-to-prev-page="prevPage"
                @go-to-next-page="nextPage"
            />
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const isViolation = computed(() => route.name === 'violations')
</script>

<script>
export default {
    props: {
        listHeader: {
            type: Array,
        },
        itemsPerPage: {
            type: Number,
            default: 10,
        },
        isSplitScreen: {
            type: Boolean,
            default: false,
        },
        listData: {
            type: Array,
            default() {
                return []
            },
        },
        searchValueProps: {
            type: String,
            default: '',
        },
        valueProps: {
            type: String,
            default: '',
        },
        isHaveContent: {
            type: Boolean,
            default: false,
        },
        meta: {
            type: Object,
        },
        isHidden: {
            type: Boolean,
            default: false,
        },

        label: {
            type: String,
            default: '',
        },
    },
    emits: ['click', 'open-popup', 'on-search', 'go-to-prev-page', 'go-to-next-page', 'click-button'],
    data() {
        return {
            currentPage: 1,
            searchValue: this.searchValueProps,
            value: this.valueProps,
        }
    },
    computed: {
        listHeaderFiltered() {
            return this.listHeader
        },
    },
    methods: {
        columnStyle(item) {
            if (this.isSplitScreen) {
                return parseFloat(100 / this.listHeaderFiltered.length)
            } else {
                return item.width
            }
        },
        goToPage(pageNumber) {
            this.currentPage = pageNumber
        },
        nextPage() {
            this.$emit('go-to-next-page')
        },
        prevPage() {
            this.$emit('go-to-prev-page')
        },
        openPopup() {
            this.$emit('open-popup')
        },
        onSearchInput() {
            if (this.label === 'violations') {
                return
            } else {
                return this.$emit('on-search', this.searchValue)
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.tableview {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: stretch;
    overflow: hidden;
    // padding-top: 45px;
    &__header {
        padding: 10px 40px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 20px;
        background-color: #ffff;
        &__filter-container {
            display: flex;
            align-items: center;
            gap: 10px;
            width: 80%;
            &__search {
                position: relative;
                width: 30%;
                height: 100%;
                img {
                    position: absolute;
                    left: 16px;
                    top: 12px;
                }
            }
        }
        &__button {
            padding: 6px 25px;
            border-radius: 80px;
            background: $gradient-default;
            @include text-style(14px, 150%, 600, $slate-50, 0);
            &:hover {
                background: $gradient-hover;
            }
        }
    }
    &__pagination {
        // display: flex;
        // position: fixed;
        // bottom: 40px;
        // right: ;
        // padding: 20px 0px;
        // padding-top: 24px;
        // flex-direction: column;
        // justify-content: center;
        // align-items: center;
        // gap: 24px;
        // // margin-top: 21px;
        // border-radius: 8px;
        // background: $neutral-0;
        // width: 100%;
        // box-shadow: 0px 16px 72px 0px rgba(71, 79, 98, 0.07);
        position: fixed;
        bottom: 40px;
        width: 100%;
        right: 40px;
    }
    &__empty {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 16px;
        justify-content: center;
        align-items: center;
        margin-top: 45px;
        span {
            @include text-style(16px, 24px, 400, $text-light-secondary2, 0);
        }
    }
    &__container {
        display: block;
        width: 100%;
        position: relative;
        // height: calc(100% - 74px);
        overflow: hidden;
        &__head {
            // display: block;
            width: 100%;
            // position: sticky;
            // top: 0;
            background-color: #ffff;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: flex-end;

            &__button {
                right: 10px;
                left: auto;
                padding: 6px 25px;
                color: $slate-50;
                margin: 20px 30px 10px 0;
                border-radius: 80px;
                background: var(--gradient-default, linear-gradient(135deg, #868cff 0%, #4318ff 100%));
            }
            &__row {
                width: 100%;
                padding-right: 4px;
                display: flex;
                border-radius: 4px 4px 0px 0px;
                border-bottom: 1px solid $neutral-400;
                gap: 20px;
                &__cell {
                    display: flex;
                    padding: 12px 24px;
                    text-align: center;
                    span {
                        width: 100%;
                        @include text-style(14px, 150%, 600, $text-light-icon-secondary-2, normal);
                        @include truncate(1);
                    }
                }
            }
        }
        &__body {
            display: block;
            overflow-y: scroll;
            height: calc(100% - 45px);
            @include custom-scrollbar();
            &::-webkit-scrollbar {
                width: 6px;
            }
            &__row {
                width: 100%;
                display: flex !important;
                gap: 20px;
                &:last-child {
                    border-bottom: none;
                }

                &__cell {
                    position: relative;
                    // padding: 16px 24px;

                    span {
                        @include truncate(1);
                        @include text-style(14px, 150%, 400, $text-light-secondary-1, 0);
                    }
                    button {
                        @include truncate(1);
                    }
                }
            }
        }
        &.blank-pagination {
            background: transparent;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .tableview__container__head {
                position: absolute;
                left: 0;
                top: 0;
            }
        }
    }
}
.half-width {
    .tableview__container {
        &__head {
            &__row {
                padding: 0 16px;
                padding-right: calc(16px + 4px);
                &__cell {
                    padding: 12px 2px;
                }
            }
        }
        &__body {
            &__row {
                padding: 0 16px;
                &__cell {
                    padding: 16px 2px;
                    width: 100% !important;
                }
            }
        }
    }
}
</style>
