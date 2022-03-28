/*
 * @Author: chenx
 * @Descripttion:
 * @Date: 2022-03-14 10:51:53
 * @LastEditors: chenx
 * @LastEditTime: 2022-03-25 17:19:57
 */
import { createApp } from 'vue'
import router from './router' //引入router组件
import App from './App.vue'
import element from '@/assets/js/element-components' //这里我将element按需引入的组件分离出去了，便面main.js过大
import '@/assets/css/element-custom.scss' //配合element组件该更自定义主题设置
import '@/assets/css/common.scss'
import store from '@/vuex/index.js'
const app = createApp(App)
app.use(store)
app.use(router)
element(app)
app.mount('#app')
