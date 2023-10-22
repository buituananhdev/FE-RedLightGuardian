<template>
    <div class="modal-alert" @click.stop>
        <div class="modal-alert__content">
            <h2 :class="typeModal">{{ title }}</h2>
        </div>
        <slot name="popupbody" />
        <div class="modal-alert__tool">
            <button-vue
                v-if="isButtonCancel"
                class="btn button--secondary"
                :type-btn="'secondary'"
                :width="'100px'"
                @click="onCancel()"
            >
                <span>{{ buttonCancelContent }}</span>
            </button-vue>
            <button-vue
                v-if="isButtonOk"
                class="btn button--primary"
                :type-btn="'primary'"
                :width="'100px'"
                @click="onOk()"
            >
                <span>{{ buttonOkContent }}</span>
            </button-vue>
        </div>
        
    </div>
</template>

<script>
import ButtonVue from '@/components/Atoms/ButtonVue.vue';
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
            default: 'confirm',
        },
        buttonOkContent: {
            type: String,
            default: 'Ok',
        },
        buttonCancelContent: {
            type: String,
            default: 'Cancel',
        },
        isShowLogo: {
            type: Boolean,
            default: true,
        },
    },
    methods: {
        onCancel() {
            if (!this.isButtonCancel) return;
            this.$emit('onCancel');
        },
        onOk() {
            if (!this.isButtonOk) return;
            this.$emit('onOk');
        },
        onClick(event) {
            console.log('target', event.target);
        },
    },
};
</script>

<style lang="scss" scoped>
.modal-alert {
    display: inline-flex;
    padding: 40px;
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

            &.confirm {
                color: $text-light-icon-secondary-1;
                font-weight: 700;
                font-size: 18px;
                
            }
        }

        p {
            text-align: center;
            @include text-style(
                14px,
                150%,
                400,
                $text-light-icon-secondary-2,
                normal
            );
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
            height: 46px;
            padding: 16px 24px;
            justify-content: center;
            align-items: center;
            gap: 4px;
            flex: 1 0 0;
        }
    }
}

.not-allow {
    cursor: not-allowed !important;
}
</style>
