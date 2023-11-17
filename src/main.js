import { createApp } from 'vue'
// import Vue from 'vue'
import router from '@/router'
import App from './App.vue'
import './assets/css/tailwind.css'
import './assets/css/global.scss'
import './assets/css/font.css'
import '@vuepic/vue-datepicker/dist/main.css'
import Notifications from '@kyvg/vue3-notification'
import { initAuthStore } from '@/stores/auth.store'
import { authMiddleware } from '@/router/router.middleware'
import VueDatePicker from '@vuepic/vue-datepicker'
import ModalAlert from '@/components/modals/ModalAlert.vue'
import FullModal from '@/components/modals/FullModal.vue'
import TableView from '@/components/commons/TableView.vue'
import PanelView from '@/components/commons/PanelView.vue'
import PopupView from '@/components/commons/PopupView.vue'
import SelectBox from '@/components/commons/SelectBox.vue'
import PanigateVue from '@/components/commons/paginate/PanigateVue.vue'
// import InputValidationVue from './components/commons/validation/InputValidation.vue'
import authLayout from '@/layouts/authLayout.vue'
import emptyLayout from '@/layouts/emptyLayout.vue'
import ButtonVue from '@/components/Atoms/ButtonVue.vue'
// import { ValidationProvider, extend } from 'vee-validate'
// import vClickOutside from 'v-click-outside'
// extend('secret', {
//     validate: (value) => value === 'example',
//     message: 'This is not the magic word',
// })

const initApp = async () => {
    authMiddleware()
    await initAuthStore()
    const app = createApp(App)
    app.use(router)
    // app.use(vClickOutside)
    app.component('full-modal', FullModal)
    app.component('modal-alert', ModalAlert)
    app.component('table-view', TableView)
    app.component('panel-view', PanelView)
    app.component('popup-view', PopupView)
    app.component('auth-layout', authLayout)
    app.component('empty-layout', emptyLayout)
    app.component('button-vue', ButtonVue)
    app.component('select-box', SelectBox)
    app.component('panigate-vue', PanigateVue)
    // app.component('input-validation-vue', InputValidationVue)
    app.component('vue-date-picker', VueDatePicker)
    // app.component('ValidationProvider', ValidationProvider)

    app.use(Notifications)
    app.mount('#app')
}
initApp()
