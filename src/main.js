/*
 * @Author: chenx
 * @Descripttion:
 * @Date: 2022-03-14 10:51:53
 * @LastEditors: chenx
 * @LastEditTime: 2022-04-22 17:33:43
 */
import { createApp } from 'vue'
import router from './router' //引入router组件
import App from './App.vue'
import '@/assets/css/element-custom.scss' //配合element组件该更自定义主题设置
import '@/assets/css/common.scss'
import store from '@/vuex/index.js'
const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
