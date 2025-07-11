/*
 * @Author: chenx
 * @Descripttion:
 * @Date: 2022-03-14 10:51:53
 * @LastEditors: chenx
 * @LastEditTime: 2024-02-27 11:11:39
 */
import { createApp } from 'vue'
import router from './router' // 引入router组件
import App from './App.vue'
import 'element-plus/dist/index.css' // 手动导入Element Plus样式
import '@/assets/css/element-custom.scss' // Element Plus 自定义主题
import '@/assets/css/common.scss'
import store from '@/vuex/index.js'

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')

// 卸载应用
window.unmount = () => {
  app.unmount()
}
