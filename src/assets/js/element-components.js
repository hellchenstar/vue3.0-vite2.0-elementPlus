/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-11 13:46:07
 * @Description: element-ui按需加载分离（不写在main.js中）
 */
import "dayjs/locale/zh-cn";
import locale from "element-plus/lib/locale";
import lang from "element-plus/lib/locale/lang/zh-cn";
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
  ElSubmenu,
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
} from 'element-plus';
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
  ElSubmenu,
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
]
const plugins = [

  ElInfiniteScroll,
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification,
]

export default (app) => {
  // app.config.globalProperties.$ELEMENT = { locale };
  // 可以查看文档
  locale.use(lang);
  components.forEach(component => {
    app.component(component.name, component);
  });

  plugins.forEach(plugin => {
    app.use(plugin);
  });
};