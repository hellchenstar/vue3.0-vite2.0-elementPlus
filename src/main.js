import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import 'element-plus/packages/theme-chalk/src/base.scss'
const app = createApp(App)

import {
  ElCol,
  ElRow,
  ElButton,
  ElSlider,
  ElInfiniteScroll,
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification,
} from 'element-plus';



const components = [
  ElCol,
  ElRow,
  ElButton,
  ElSlider,

]
const plugins = [
  ElInfiniteScroll,
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification,
]
components.forEach(component => {
  console.log(component)
  app.component(component.name, component)
})

plugins.forEach(plugin => {
  app.use(plugin)
})
app.use(router)
app.mount('#app')
