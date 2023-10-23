<template>
    <div class="signin">
        <div class="signin__body">
            <div class="signin__body__header">
                <h2 class="">{{ $attrs.header }}</h2>

                <div class="signin__body__header__btn-close" @click="onCloseAddNew">
                    <img src="@/assets/icons/close-icon.svg" alt="" />
                </div>
            </div>
            <client-only>
                <ValidationObserver v-slot="{ handleSubmit }" class="form-validate" tag="div">
                    <form class="form-validate" @submit.prevent="handleSubmit(onSubmit)">
                        <div class="form-validate__body">
                            <input-validation
                                id="reason"
                                v-model="reason"
                                nameField="Reason"
                                :rules="'required'"
                                type="text"
                                :isRequired="Boolean(true)"
                                placeholder="Reason"
                            />
                        </div>

                        <button type="submit" class="form-validate__submit">Submit</button>
                    </form>
                </ValidationObserver>
            </client-only>
        </div>

        <notifications
            group="addnewbuilder"
            position="top right"
            :duration="5000"
            animation-type="velocity"
            :max="2"
            :ignoreDuplicates="true"
        />
    </div>
</template>

<script>
export default {
    props: {
        changeStatus: {
            type: Function,
        },
        user: {
            type: Object,
        },
    },
    data() {
        return {
            reason: '',
        }
    },
    methods: {
        onSubmit() {
            this.changeStatus(this.user, this.reason)
            this.$emit('close-modal', true)
        },
        onCloseAddNew() {
            this.$emit('close-modal', false)
        },
    },
}
</script>

<style lang="scss" scoped>
.signin {
    display: flex;
    min-height: 100vh;
    height: 100%;
    align-items: center;
    justify-content: center;
    padding: 0px 16px;
    width: 100%;

    &__body {
        width: 100%;
        max-width: 38rem;
        border: 1px solid $border-color;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 32px;
        border-radius: 10px;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        background-color: $neutral-0;

        &__header {
            display: flex;
            flex-direction: row;
            justify-content: center;
            position: relative;

            h2 {
                @include text-style(25px, 52px, 600, $text-color, 0);
            }

            &__btn-close {
                position: absolute;
                height: 40px;
                width: 40px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                top: 5px;
                right: 5px;
                cursor: pointer;

                &:hover {
                    background-color: $border-color;
                }

                &:hover img {
                    transform: rotate(90deg);
                    transition: all 0.5s ease-in-out;
                }

                img {
                    width: 30px;
                    height: 30px;
                    transform: rotate(0deg);
                    transition: all 0.5s ease-in-out;
                }
            }
        }

        .form-validate {
            &__body {
                &__provider {
                    display: flex;
                    flex-direction: column;

                    label {
                        @include text-style(17px, 35px, 500, $text-color, 0);
                    }

                    input {
                        border: 2px solid $border-color;
                        border-radius: 4px;
                        font-size: 16px;
                        padding: 10px;
                        width: calc(100% - 20px);
                        max-width: 100%;
                        background-color: $background-color;
                        color: #333;

                        &:focus {
                            outline: none;
                            border-color: $gray-300;
                        }
                    }

                    &__error {
                        height: 21px;
                        @include text-style(15px, 20px, 500, $error-text, 0);
                    }
                }
            }

            &__submit {
                width: 100%;
                cursor: pointer;
                @include text-style(17px, 35px, 600, $background-color, 0);
                height: 40px;
                background-color: $primary-button;
                border-radius: 6px;

                &:hover {
                    background-color: $hover-primary-button;
                }
            }
        }
    }
}
</style>
