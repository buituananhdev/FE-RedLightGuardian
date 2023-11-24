<template>
    <div class="modal-alert" @click.stop>
        <div class="modal-alert__content">
            <h2 :class="typeModal">{{ title }}</h2>
        </div>
        <slot name="popupbody"></slot>
        <div class="modal-alert__tool">
            <button-vue
                v-if="isButtonCancel"
                class="btn button--secondary"
                :type-btn="'secondary'"
                :width="'100px'"
                @click-button="onCancel"
            >
                <span>{{ buttonCancelContent }}</span>
            </button-vue>
            <button-vue
                v-if="isButtonOk"
                class="btn button--primary"
                :type-btn="'primary'"
                :width="'100px'"
                @click-button="onOk"
            >
                <span>{{ buttonOkContent }}</span>
            </button-vue>
        </div>
    </div>
</template>

<script>
import ButtonVue from '@/components/Atoms/ButtonVue.vue'
export default {
    components: {
        ButtonVue,
    },
    props: {
        title: {
            type: String,
            required: true,
        },
        isButtonCancel: {
            type: Boolean,
            default: true,
        },
        isButtonOk: {
            type: Boolean,
            default: true,
        },
        typeModal: {
            type: String,
            default: 'header',
        },
        buttonOkContent: {
            type: String,
            default: 'Xác nhận',
        },
        buttonCancelContent: {
            type: String,
            default: 'Hủy bỏ',
        },
        isShowLogo: {
            type: Boolean,
            default: true,
        },
    },
    methods: {
        onCancel() {
            if (!this.isButtonCancel) return
            return this.$emit('onCancel')
        },
        onOk() {
            if (!this.isButtonOk) return
            return this.$emit('onOk')
        },
        onClick(event) {
            console.log('target', event.target)
        },
    },
}
</script>

<style lang="scss" scoped>
.modal-alert {
    display: inline-flex;
    padding: 40px 50px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 32px;
    border-radius: 35px;
    background: $neutral-100;
    /* Shadow/5 */
    box-shadow: 0px 16px 72px 0px rgba(71, 79, 98, 0.07);
    width: 520px;
    // border: 1px solid black;
    &__content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        align-self: stretch;

        h2 {
            // width: 360px;
            text-align: center;

            &.success {
                color: $success-700;
            }

            &.failed {
                color: $danger-700;
            }

            &.header {
                color: $text-light-icon-secondary-1;
                text-align: center;
                font-size: 28px;
                font-weight: 700;
            }
        }

        p {
            text-align: center;
            @include text-style(14px, 150%, 400, $text-light-icon-secondary-2, 0);
        }
    }

    &__tool {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 24px;
        align-self: stretch;
        .btn {
            display: flex;
            width: 120px;
            height: 36px;
            padding: 8px 16px;
            justify-content: center;
            align-items: center;
            gap: 4px;
            &.button--primary {
                border-radius: 80px;
                background: $gradient-default;
                text-align: center;
                @include text-style(14px, 150%, 600, $neutral-100, 0);
                &:hover {
                    background: $gradient-hover;
                }
            }
            &.button--secondary {
                border: 1px solid $primary-500;
                @include text-style(14px, 150%, 600, $primary-500, 0);
                &:hover {
                    background: $gradient-default;
                    border: none;
                    color: #ffff;
                }
            }
        }
    }
}
.not-allow {
    cursor: not-allowed !important;
}
</style>
