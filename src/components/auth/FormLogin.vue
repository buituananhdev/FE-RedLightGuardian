<script>
export default {
    data() {
        return {
            username: '',
            password: '',
            alert: {
                isShowModal: true,
                title: 'Bạn có muốn thoát?',
                content: 'Khi thoát ra sẽ mất toàn bộ dữ liệu',
                typeModal: 'confirm',
                buttonOkContent: 'Xác nhận',
                isButtonCancel: true,
                isShowLogo: false,
                buttonCancelContent: 'Đóng',
                currentFunctionCancel: this.resetAlert,
                currentFunctionOk: () => {
                },
            },
        };
    },
    mounted() {
        this.alert = {
            ...this.alert,
            ...{},
        };
    },
    methods: {
        async login() {
            try {
                const res = await api.Login({
                    username: this.username,
                    password: this.password,
                });
                localStorage.setItem('access_token', res.data.access_token);
                notify({
                    title: 'Success',
                    text: 'Login success',
                    type: 'success',
                    duration: 1000,
                });
            } catch (error) {
                console.log(error);
                notify({
                    title: 'Failed',
                    text: 'Login error',
                    type: 'error',
                    duration: 1000,
                });
                router.push('/home');
            }
        },
    },
};
</script>

<template>
    <div class="min-h-screen flex items-center justify-center w-full h-full">
        <div
            class="max-w-md w-full px-6 py-8 bg-white shadow-md overflow-hidden sm:rounded-lg"
        >
            <h2 class="text-center text-3xl font-extrabold text-gray-900">
                Login
            </h2>

            <form class="mt-8 space-y-6" @submit.prevent="login">
                <div>
                    <label
                        for="username"
                        class="block text-sm font-medium text-gray-700"
                        >Username</label
                    >
                    <div class="mt-1">
                        <input
                            id="username"
                            name="username"
                            type="text"
                            v-model="username"
                            required
                            class="text-red-600 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                </div>
                <div>
                    <label
                        for="password"
                        class="block text-sm font-medium text-gray-700"
                        >Password</label
                    >
                    <div class="mt-1">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            v-model="password"
                            required
                            class="text-red-600 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                </div>
                <div>
                    <button
                        type="submit"
                        class="btn-submit w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Sign in
                    </button>
                </div>
            </form>
        </div>

        <full-modal v-if="alert.isShowModal" @close-modal="resetAlert">
            <modal-alert
                :title="alert.title"
                :content="alert.content"
                :typeModal="alert.typeModal"
                :isButtonCancel="alert.isButtonCancel"
                :isButtonOk="alert.isButtonOk"
                :buttonOkContent="alert.buttonOkContent"
                :buttonCancelContent="alert.buttonCancelContent"
                :isShowLogo="alert.isShowLogo"
                @onOk="alert.currentFunctionOk"
                @onCancel="alert.currentFunctionCancel"
            />
        </full-modal>
    </div>
</template>

<style lang="scss" scoped></style>
