import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import element from "@/assets/js/element-components";
import '@/assets/css/element-custom.scss'
import 'element-plus/packages/theme-chalk/src/base.scss'
import '@/assets/css/common.scss'
import 'nprogress/nprogress.css'
import VueUeditorWrap from 'vue-ueditor-wrap';
import store from '@/vuex/index.js'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

const app = createApp(App)

app.use(store)
app.use(router)

// 全局插件
app.use(mavonEditor) //markdown编辑器
app.use(VueUeditorWrap) //富文本编辑器
app.config.globalProperties.$ELEMENT = { size: 'small' }
// 全局 错误处理
app.config.errorHandler = (err, vm, info) => {
  console.log(err)
  console.log(vm)
  console.log(info)
}

element(app);
app.mount('#app')
