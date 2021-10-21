/*
 * @Author: chenx
 * @Descripttion: 
 * @Date: 2021-04-13 10:05:44
 * @LastEditors: chenx
 * @LastEditTime: 2021-09-27 16:11:26
 */
import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import element from "@/assets/js/element-components";
import '@/assets/css/element-custom.scss'
import 'element-plus/packages/theme-chalk/src/base.scss'
import '@/assets/css/common.scss'
import 'nprogress/nprogress.css'
import store from '@/vuex/index.js'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

const app = createApp(App)

app.use(store)
app.use(router)

// 全局插件
app.use(mavonEditor) //markdown编辑器
app.config.globalProperties.$ELEMENT = { size: 'small' }
// 全局 错误处理
app.config.errorHandler = (err, vm, info) => {
  console.log(err)
  console.log(vm)
  console.log(info)
}
element(app);
app.mount('#app')
