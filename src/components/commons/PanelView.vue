<template>
    <div class="panel-view">
        <div class="panel-view__header">
            <div class="panel-view__header__title">
                <img src="@/assets/icons/arrow-right-icon.svg" alt="close" @click="closePanel()" />
                <p class="panel-view__header__title__content">{{ title }}</p>
            </div>
            <button v-if="isEdit" class="panel-view__header__button" @click="updateObject()">Update</button>
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
    },
    methods: {
        closePanel() {
            this.$emit('close-panel')
        },
        updateObject() {
            this.$emit('update-object')
        },
    },
}
</script>
<style lang="scss" scoped>
.panel-view {
    padding: 12px 20px;
    border-radius: 4px 4px 0px 0px;
    border-left: 1px solid $neutral-400;
    width: 30%;
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
                width: 10px;
            }
            &__content {
                font-size: 20px;
                font-weight: 700;
            }
        }
        &__button {
            padding: 6px 25px;
            color: $slate-50;
            margin-top: 20px;
            border-radius: 80px;
            background: var(--gradient-default, linear-gradient(135deg, #868cff 0%, #4318ff 100%));
        }
    }
}
</style>
