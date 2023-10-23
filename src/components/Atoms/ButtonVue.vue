<template>
    <button :class="[`btn-${typeBtn}`]" :style="computedStyles" @click="$emit('click')">
        <slot />
    </button>
</template>

<script>
export default {
    props: {
        typeBtn: {
            type: String,
            default: '',
        },
        width: {
            type: String,
            default: '',
        },
    },
    computed: {
        computedStyles() {
            return {
                width: this.width,
            }
        },
    },
    methods: {},
}
</script>

<style lang="scss" scoped>
button {
    padding: 7px 24px;
    outline: none;
    // border: transparent;
    &:hover {
        cursor: pointer;
    }
    &.btn-primary {
        border-radius: 80px;
        // @include text-style(14px, 21px, 600, $neutral-0, 0px);
        background-color: $secondary-500;
        color: $neutral-200;
        &:hover {
            background-color: $secondary-600;
        }
    }

    &.btn-secondary {
        border-radius: 80px;
        // border: 1px solid $text-primary;
        // @include text-style(14px, 21px, 600, $text-primary, 0px);
        background-color: $neutral-0;
        &:hover {
            background-color: $neutral-200;
        }
    }
}
</style>
