import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Notifications from '@kyvg/vue3-notification'
import { api } from './api/api';
const app = createApp(App);

app.provide('api', api);
app.use(createPinia())
app.use(router)
app.use(Notifications)
app.mount('#app')
