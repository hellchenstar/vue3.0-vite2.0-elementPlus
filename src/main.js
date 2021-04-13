import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import element from "@/assets/js/element-components";
import '@/assets/css/element-variables.scss'
import 'element-plus/packages/theme-chalk/src/base.scss'
import store from '@/vuex/index.js'
import api from './request/api/index'
const app = createApp(App)
app.use(store)
app.use(router)
app.config.globalProperties.$ELEMENT = { size: 'small' }

element(app);
app.mount('#app')
