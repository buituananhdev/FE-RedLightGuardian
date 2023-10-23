import { createApp } from 'vue';
import router from '@/router';
import App from './App.vue';
import './assets/css/tailwind.css';
import './assets/css/global.scss';
import Notifications from '@kyvg/vue3-notification';
import { initAuthStore } from '@/stores/auth.store';
import { authMiddleware } from '@/router/router.middleware'
import ModalAlert from '@/components/modals/ModalAlert.vue';
import FullModal from '@/components/modals/FullModal.vue';
import TableView from '@/components/commons/TableView.vue';
import authLayout from '@/layouts/authLayout.vue'
import emptyLayout from '@/layouts/emptyLayout.vue'

const initApp = async () => {
  authMiddleware()
  await initAuthStore()
  const app = createApp(App)
  app.use(router)
  app.component('full-modal', FullModal)
  app.component('modal-alert', ModalAlert)
  app.component('table-view', TableView)
  app.component('default-layout', authLayout)
  app.component('empty-layout', emptyLayout)
  app.use(Notifications)
  app.mount('#app')
}
initApp()
