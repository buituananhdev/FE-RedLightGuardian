<template>
    <div class="panel-view">
        <div class="panel-view__header">
            <div class="panel-view__header__title">
                <img src="@/assets/icons/arrow-right-icon.svg" alt="close" @click="closePanel()" />
                <p class="panel-view__header__title__content">{{ title }}</p>
            </div>
            <div v-if="label !== 'violations'" class="panel-view__header__group-button">
                <button v-if="!isEdit" class="btn button--primary btn__update" @click="allowUpdate">Cập nhật</button>
                <div v-else class="panel-view__header__group-button__confirm">
                    <button @click="cancel" class="btn button--secondary">Hủy</button>
                    <button @click="updateObject" class="btn button--primary">Lưu</button>
                </div>
            </div>
        </div>
        <div class="panel-view__body">
            <slot name="pbody"></slot>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
        },
        isEdit: {
            type: Boolean,
            default: false,
        },
        label: {
            type: String,
            default: '',
        },
    },
    methods: {
        closePanel() {
            this.$emit('close-panel')
        },
        updateObject() {
            this.$emit('update-object')
        },
        allowUpdate() {
            this.$emit('allow-update')
        },
        cancel() {
            this.$emit('cancel')
        },
    },
}
</script>
<style lang="scss" scoped>
.panel-view {
    padding: 12px 20px;
    border-radius: 4px 4px 0px 0px;
    border-left: 1px solid $neutral-400;
    width: 40%;
    background-color: #ffff;
    &__header {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: 26px;
        &__title {
            display: flex;
            align-items: center;
            gap: 5px;
            img {
                width: 14px;
                margin-right: 8px;
                border-radius: 50%;
                &:hover {
                    opacity: 0.8;
                    cursor: pointer;
                }
            }
            &__content {
                color: $text-light-icon-secondary-1;
                text-align: center;
                font-size: 22px;
                font-weight: 700;
            }
        }
        &__group-button {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 24px;
            align-self: stretch;
            &__confirm {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 10px;
            }
            .btn {
                display: flex;
                width: 60px;
                height: 36px;
                padding: 6px 10px;
                justify-content: center;
                align-items: center;
                gap: 4px;
                border-radius: 80px;
                font-size: 12px;
                &__update {
                    width: 100px;
                }
                &.button--primary {
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
}
</style>
