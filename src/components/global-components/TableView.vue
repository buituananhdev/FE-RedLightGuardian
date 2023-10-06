<template>
    <div class="tableview" :class="{ 'half-width': isSplitScreen }">
        <div
            class="tableview__container"
            :class="{ 'blank-pagination': !listData.length }"
        >
            <div class="tableview__container__head">
                <div class="tableview__container__head__row">
                    <div
                        class="tableview__container__head__row__cell"
                        v-for="(item, index) in listHeader"
                        :key="index"
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
            <div
                class="tableview__container__body overflow-y"
                v-if="listDataProps.length"
            >
                <slot name="tbody" v-bind:listData="listDataProps" />
            </div>
            <div v-else class="tableview__empty">
                <!-- <img src="~/assets/icons/empty-icn.svg" alt="" /> -->
                <span> Không có dữ liệu </span>
            </div>
        </div>
        <!-- <div v-show="listData.length" class="tableview__pagination">
            <vue-paginate
                v-show="!showLoading && listData.length"
                :baseUrl="requestUrl"
                ref="vuePaginate"
                :optionParam="$attrs.optionParam ?? ''"
                :startFetch="true"
                startPageCount="1"
                :paging="10"
                @before-fetch="showLoading = $event"
                @fetch-success="parseDataClass"
                @total-count="totalNews = $event"
                @click-page="scrollToTopPage"
            >
            </vue-paginate>
        </div> -->
    </div>
</template>

<script>
// import VuePaginate from '~/components/paginate/VuePaginate.vue';
export default {
    // components: {
    //     VuePaginate,
    // },
    props: {
        listHeader: {
            type: Array,
        },
        requestUrl: {
            type: String,
            default: '',
        },
        isSplitScreen: {
            type: Boolean,
            default: false,
        },
        listDataProps: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            showLoading: true,
            totalNews: null,
            listData: [],
        };
    },
    computed: {
    },
    methods: {
        columnStyle(item) {
            if (this.isSplitScreen) {
                return parseFloat(100 / this.listHeaderFiltered.length);
            } else {
                return item.width;
            }
        },
        parseDataClass(data) {
            try {
                this.listData = data;
                console.log('data', data);
            } catch (e) {
                console.log('loi', e);
            }
        },
        scrollToTopPage() {},
    },
};
</script>

<style lang="scss" scoped>
.tableview {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: stretch;
    // padding-top: 45px;
    &__pagination {
        display: flex;
        padding: 20px 0px;
        padding-top: 24px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 24px;
        // margin-top: 21px;
        border-radius: 8px;
        background: $neutral-0;
        width: 100%;
        box-shadow: 0px 16px 72px 0px rgba(71, 79, 98, 0.07);
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
        height: calc(100% - 74px);
        &__head {
            display: block;
            width: 100%;
            position: sticky;
            top: 0;
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
                        @include text-style(
                            14px,
                            150%,
                            500,
                            $text-light-icon-secondary-2,
                            normal
                        );
                        @include truncate(1);
                    }
                }
            }
        }
        &__body {
            display: block;
            overflow-y: scroll;
            height: calc(100% - 45px);
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
                        @include text-style(
                            14px,
                            150%,
                            400,
                            $text-light-secondary-1,
                            normal
                        );
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
