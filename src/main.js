import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import Notifications from '@kyvg/vue3-notification'
import ModalAlert from '@/components/global-components/ModalAlert.vue'
import FullModal from '@/components/global-components/FullModal.vue'
import TableView from '@/components/global-components/TableView.vue'
const app = createApp(App);

// Import global components 

app.component('modal-alert', ModalAlert);
app.component('full-modal', FullModal);
app.component('table-view', TableView);

app.use(createPinia());
app.use(router);
app.use(Notifications);


app.mount('#app')
