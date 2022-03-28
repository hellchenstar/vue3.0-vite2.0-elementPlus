/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2022-03-28 18:03:25
 * @Description: element-ui按需加载分离（不写在main.js中）
 */
import 'dayjs/locale/zh-cn'
// import locale from "element-plus/lib/locale";
import lang from 'element-plus/lib/locale/lang/zh-cn'
import {
  ElAvatar,
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
  ElSubMenu,
  ElInput,
  ElForm,
  ElFormItem,
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification,
  ElDrawer,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElContainer,
  ElAside,
  ElMain,
  ElHeader,
  ElSwitch,
  ElTable,
  ElTableColumn,
  ElDialog,
  ElSelect,
  ElOption,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTabs,
  ElTabPane,
  ElCarousel,
  ElCarouselItem,
  ElCalendar,
  ElTag,
} from 'element-plus'
const components = [
  ElAvatar,
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
  ElSubMenu,
  ElInput,
  ElForm,
  ElFormItem,
  ElDrawer,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElContainer,
  ElAside,
  ElMain,
  ElHeader,
  ElSwitch,
  ElTable,
  ElTableColumn,
  ElDialog,
  ElSelect,
  ElOption,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTabs,
  ElTabPane,
  ElCarousel,
  ElCarouselItem,
  ElCalendar,
  ElTag,
]
const plugins = [
  ElInfiniteScroll,
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification,
]

export default (app) => {
  // locale:lang,
  components.forEach((component) => {
    app.component(component.name, component)
  })

  plugins.forEach((plugin) => {
    app.use(plugin)
  })
}
