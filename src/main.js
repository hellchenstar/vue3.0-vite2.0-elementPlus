import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import 'element-plus/packages/theme-chalk/src/base.scss'
import store from '@/vuex/index.js'
const app = createApp(App)
app.use(store)
app.use(router)
app.config.globalProperties.$ELEMENT = { size: 'small' }
import {
  ElCol,
  ElRow,
  ElButton,
  ElSlider,
  ElRadio,
  ElRadioButton,
  ElRadioGroup,
  ElInfiniteScroll,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElSubmenu,
  ElInput,
  ElForm,
  ElFormItem,
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElContainer,
  ElAside,
  ElMain,
  ElHeader
} from 'element-plus';



const components = [
  ElCol,
  ElRow,
  ElButton,
  ElSlider,
  ElRadio,
  ElRadioButton,
  ElRadioGroup,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElSubmenu,
  ElInput,
  ElForm,
  ElFormItem,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElContainer,
  ElAside,
  ElMain,
  ElHeader
]
const plugins = [

  ElInfiniteScroll,
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification,
]
components.forEach(component => {
  app.component(component.name, component)
})

plugins.forEach(plugin => {
  app.use(plugin)
})

app.mount('#app')
