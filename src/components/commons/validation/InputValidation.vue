<script>
export default {
    props: {
        value: {
            type: String,
            default: '',
        },
        isValid: {
            type: Boolean,
            default: true,
        },
        invalidContent: {
            type: String,
            default: '',
        },
        noResetValidate: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            dataTest: '',
            isFocused: false,
            isShowPassword: false,
        }
    },
    computed: {
        modelValue: {
            get() {
                return this.value
            },
            set(newVal) {
                this.$emit('input', newVal)
            },
        },
    },
    methods: {
        toggleShowPassword() {
            this.isShowPassword = !this.isShowPassword
        },
        onFocus() {
            this.isFocused = true
        },
        onBlur() {
            this.isFocused = false
        },
    },
    watch: {
        value() {
            this.$emit('resetInvalidInput')
        },
    },
}
</script>
<template>
    <ValidationProvider
        class="input-validation"
        :name="$attrs.nameField"
        :rules="$attrs.rules"
        v-slot="{ errors }"
        tag="div"
    >
        <div class="input-validation__label">
            <label :for="$attrs.id" class="sr-only">{{ $attrs.nameField }} </label>
            <span v-if="$attrs.isRequired" class="isRequired">*</span>
        </div>
        <div
            class="input__container"
            :class="[{ focused: isFocused }, { error: !!errors[0] }, { noResetValidate: noResetValidate }]"
        >
            <input
                :id="$attrs.id"
                v-model="modelValue"
                :name="$attrs.nameField"
                :type="isShowPassword ? 'text' : $attrs.type"
                autocomplete="off"
                :placeholder="$attrs.placeholder"
                :disabled="$attrs.isDisabled === true"
                @focus="onFocus"
                @blur="onBlur"
                ref="input_text"
                v-if="$attrs.type != 'date'"
            />
            <date-picker
                v-else
                ref="date-picker-start"
                @click.prevent.stop
                :config="{
                    disableMobile: true,
                    dateFormat: 'Y-m-d',
                }"
                :placeholder="'yyyy/mm/dddd'"
                v-model="modelValue"
                id="startDate"
            />
            <img
                @click="toggleShowPassword()"
                v-if="($attrs.type == 'password') & isShowPassword"
                src="@/assets/icons/eye-icon.svg"
                alt=""
            />
            <img
                @click="toggleShowPassword()"
                v-if="($attrs.type == 'password') & !isShowPassword"
                src="@/assets/icons/eye-icon.svg"
                alt=""
            />
            <img v-if="$attrs.type === 'date'" src="@/assets/icons/calendar-icon.svg" alt="" />
        </div>
        <span v-if="!isValid" class="input-validation__error">
            <img src="@/assets/icons/dagerous-icon.svg" alt="" />
            <span>{{ invalidContent }}</span>
        </span>
        <span v-else-if="(errors[0] && isFocused) || noResetValidate" class="input-validation__error">
            <img v-if="errors[0]" src="@/assets/icons/dagerous-icon.svg" alt="" />
            <span>
                {{ errors[0] }}
            </span>
        </span>
    </ValidationProvider>
</template>

<style lang="scss" scoped>
.input-validation {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    align-self: stretch;
    height: 74px;

    &__label {
        display: flex;
        gap: 3px;
        align-items: center;
        label {
            @include text-style(12px, 150%, 600, $text-light-icon-secondary-1, normal);
        }
        span {
            font-family: Montserrat !important;
            @include text-style(14px, 150%, 400, $danger-700, normal);
        }
    }

    .input__container {
        display: flex;
        padding: 12px;
        justify-content: center;
        align-items: center;
        gap: 12px;
        align-self: stretch;
        border-radius: 8px;
        border: 1px solid $neutral-400;
        height: 45px;
        input {
            display: flex;
            align-items: center;
            gap: 12px;
            flex: 1 0 0;
            outline: none;
            border: none;
            background: transparent;
            @include text-style(14px, 150%, 400, $text-light-icon-secondary-1, normal);
        }

        input::placeholder {
            @include text-style(14px, 150%, 400, $text-light-icon-disabled, normal);
        }

        input:-webkit-autofill,
        input:-webkit-autofill:focus {
            transition: background-color 50000s linear 0s;
        }
        img {
            cursor: pointer;
            width: 16px;
            height: 16px;
        }
        &.focused {
            outline: none;
            border-radius: 8px;
            border: 1px solid $primary-500;

            &.error {
                border-radius: 8px;
                border: 1px solid $danger-700;
            }
        }
        &.error {
            &.noResetValidate {
                border-radius: 8px;
                border: 1px solid $danger-700;
            }
        }
        &:focus {
            outline: none;
            border-radius: 8px;
            border: 1px solid $primary-500;
        }
    }
    &__error {
        margin-top: -4px;
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
}
</style>
