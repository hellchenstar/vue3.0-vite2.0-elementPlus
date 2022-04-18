/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2022-04-14 16:10:35
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
  ElPageHeader,
  ElDatePicker,
  ElUpload,
  ElIcon,
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
  ElPageHeader,
  ElDatePicker,
  ElUpload,
  ElIcon,
]
const plugins = [ElInfiniteScroll, ElLoading, ElMessage, ElMessageBox, ElNotification]

export default (app) => {
  // locale:lang,
  components.forEach((component) => {
    app.component(component.name, component)
  })

  plugins.forEach((plugin) => {
    app.use(plugin)
  })
}
