import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/index.css'
import store from './stores/store'

const app = createApp(App)

app.use(createPinia())
app.use(store)
app.use(router)

app.mount('#app')
