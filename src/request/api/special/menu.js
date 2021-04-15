/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-15 20:32:52
 * @Description: 菜单
 */
import { base } from '../../baseUrl' // 导入接口域名列表
import axios from '../../index' // 导入axios实例

const menuApi = {
  // 获取菜单
  getMenuList() {
    console.log(`${base.dev.menu}/menuList`)
    return axios.get(`${base.dev.menu}/menuList`)
  },
  // 新增
  addMenu(params) {
    return axios.post(`${base.dev.menu}/saveMenu`, params)
  },
  // 编辑
  editMenu(params) {
    return axios.post(`${base.dev.menu}/updateMenu`, params)
  },

  // 其他接口…………
}

export default menuApi
