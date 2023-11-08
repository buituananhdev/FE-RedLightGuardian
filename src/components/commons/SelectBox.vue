<script>
export default {
    props: {
        type_select_box: {
            // loai select box css
            type: String,
        },
        label: {
            // dung de goi ham
            type: String,
        },
        placeholder: {
            type: String,
            default: 'Select',
        },
        selectedProps: {
            // bien truyen gia tri
            type: Object,
            default() {
                return {
                    status: '',
                }
            },
        },
        options: {
            // mang option
            type: Array,
            default() {
                return []
            },
        },
        isSelect: {
            // có cho chọn hay không
            type: Boolean,
            default: true,
        },
        isRequired: {
            // validation
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isShowSelectBox: false,
            selected: this.selectedProps,
        }
    },
    watch: {
        selectedProps() {
            this.selected = this.selectedProps
        },
    },
    methods: {
        ChangeOption(option) {
            try {
                switch (this.label) {
                    case 'name':
                        if (option.name != this.selected.name) {
                            this.$emit('ChangeValueSelectBox', option)
                        }
                        break
                    case 'status':
                        if (option != this.selected.status) {
                            this.$emit('ChangeStatus', this.selected, option.status)
                            if (this.type_select_box == 'status-white') {
                                this.selected.status = option.status
                            }
                        }
                        break
                    default:
                        console.error('Select box error')
                        break
                }
                this.CloseSelectBox()
            } catch (ex) {
                console.log(ex)
            }
        },
        CloseSelectBox() {
            this.isShowSelectBox = false
        },
        ToogleSelect() {
            if (!this.isSelect) {
                return
            }
            this.isShowSelectBox = !this.isShowSelectBox
            console.log(this.isShowSelectBox)
        },
        checkLabel(option, ischeckActive) {
            switch (this.label) {
                case 'name':
                    return ischeckActive ? option.name === this.selected.name : option.name
                case 'status':
                    return ischeckActive ? option.status === this.selected.status : option.status
                default:
                    console.error('Select box error')
                    break
            }
        },
    },
}
</script>

<template>
    <div :class="[type_select_box]" @blur="CloseSelectBox">
        <div
            :class="[
                `${type_select_box}-select-box`,
                `${selected.status}`,
                { isShowSelectBox: isShowSelectBox },
                { center: !isSelect },
                { isRequired: isRequired },
            ]"
            @click="ToogleSelect()"
        >
            <span v-if="label === 'name' && selected.name" :class="`${type_select_box}-select-box_selected`">{{
                selected.name
            }}</span>
            <span v-if="label === 'status' && selected.status" :class="`${type_select_box}-select-box_selected`">{{
                selected.status
            }}</span>
            <span v-if="JSON.stringify(selected) === JSON.stringify({ placeholder: placeholder })" class="placeholder">
                {{ placeholder }}
            </span>
            <img
                v-if="isSelect"
                :class="{ isShow: isShowSelectBox }"
                :src="type_select_box == 'status-color' ? 'icons/arrow-down-light.svg' : 'icons/arrow-down.svg'"
            />
        </div>
        <div v-if="isRequired && !selected.name" class="error">
            <img src="../../assets/icons/dangerous-icon.svg" alt="" />
            <span>Trường này là bắt buộc</span>
        </div>
        <div v-if="isShowSelectBox && isSelect" :class="`${type_select_box}_options`" class="overflow-y">
            <div v-if="options.length > 0" :class="`${type_select_box}_options_container`">
                <div
                    v-for="(option, index) in options"
                    :key="index"
                    :class="{
                        [`${type_select_box}_options_selected`]: checkLabel(option, true),
                    }"
                    class="options-content"
                    @click="ChangeOption(option)"
                >
                    <span class="content">{{ checkLabel(option, false) }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.status-color {
    width: 100%;
    max-width: 132px;
    cursor: pointer;
    &-select-box {
        display: flex;
        width: 100%;
        padding: 2px 16px;
        justify-content: flex-start;
        align-items: center;
        gap: 4px;
        border-radius: 80px;
        background: $success-700;
        position: relative;
        &_selected {
            width: calc(100% - 20px - 4px);
            @include text-style(14px, 21px, 500, $text-dark-primary, 0);
            @include truncate(1);
        }
        img {
            cursor: pointer;
            position: absolute;
            right: 16px;
        }
        .isShow {
            transition: all 0.2s;
            transform: rotate(180deg);
        }
    }

    &_options {
        position: absolute;
        z-index: 2;
        top: 42px;
        display: flex;
        width: 100%;
        max-width: 132px;
        padding: 6px;
        flex-direction: column;
        align-items: flex-start;
        gap: 2px;
        border-radius: 8px;
        background: $neutral-0;
        box-shadow: 0px 16px 72px 0px rgba(71, 79, 98, 0.07);
        &_container {
            width: 100%;
            height: 100%;
        }
        .options-content {
            display: flex;
            padding: 6px 8px;
            align-items: center;
            gap: 10px;
            align-self: stretch;
            .content {
                @include text-style(12px, 18px, 400, $text-light-icon-secondary-2, 0);
            }
            &:hover {
                cursor: pointer;
                background: $text-light-icon-hover-item;
                border-radius: 8px;
            }
        }
        &_selected {
            .content {
                @include text-color-gradient();
            }
        }
    }

    .TODO {
        background: #868cff !important;
    }
    .PENDING {
        background: #2b3674 !important;
    }
    .DOING {
        background: #ff8800 !important;
    }

    .CANCELED {
        background: #a3aed0 !important;
    }

    .DONE {
        background: #08875d !important;
    }

    .EXPIRED {
        background: #e02d3c !important;
    }

    .center {
        justify-content: center;
    }
}
.status-white {
    width: 100%;
    max-width: 100%;
    cursor: pointer;
    position: relative;
    &-select-box {
        height: 100%;
        border-radius: 8px;
        border: 1px solid $neutral-400;
        display: flex;
        padding: 5px 8px 5px 12px;
        justify-content: space-between;
        align-items: center;
        position: relative;
        &.isShowSelectBox {
            border: 1px solid $primary-500;
        }
        &_selected {
            width: 100%;
            @include text-style(12px, 18px, 400, $text-light-icon-secondary-1, 0);
            @include truncate(1);
            @include text-color-gradient();
        }
        img {
            cursor: pointer;
            position: absolute;
            right: 16px;
        }
        .isShow {
            transition: all 0.2s;
            transform: rotate(180deg);
        }

        .placeholder {
            @include text-style(12px, 18px, 400, $text-light-icon-disabled, 0);
        }
    }

    &_options {
        position: absolute;
        z-index: 2;
        top: 42px;
        left: 0;
        display: flex;
        width: 100%;
        max-width: 100%;
        max-height: 254px;
        padding: 6px;
        flex-direction: column;
        align-items: flex-start;
        gap: 2px;
        border-radius: 8px;
        gap: 12px;
        background: $neutral-0;
        box-shadow: 0px 16px 72px 0px rgba(71, 79, 98, 0.07);
        &_container {
            width: 100%;
            height: 100%;
        }
        .options-content {
            display: flex;
            padding: 6px 8px;
            align-items: center;
            gap: 10px;
            align-self: stretch;
            .content {
                @include text-style(12px, 18px, 400, $text-light-icon-secondary-2, 0);
            }
            &:hover {
                cursor: pointer;
                background: $text-light-icon-hover-item;
                border-radius: 8px;
            }
        }

        &_selected {
            .content {
                @include text-color-gradient();
            }
        }
    }
}
.search-container {
    position: relative;
}
.isRequired {
    border: 1px solid $danger-700 !important;
}
.empty {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 10px;
}
.error {
    height: 18px;
    display: flex;
    align-items: center;
    gap: 4px;
    span {
        @include text-style(12px, 18px, 400, $danger-700, 0);
    }
    image {
        width: 16px;
        height: 16px;
    }
}
</style>
