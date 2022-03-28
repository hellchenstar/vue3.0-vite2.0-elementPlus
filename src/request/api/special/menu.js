/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2022-02-28 11:17:35
 * @Description: 菜单
 */
import { base } from '../../baseUrl' // 导入接口域名列表
import axios from '../../index' // 导入axios实例

const menuApi = {
  // 获取菜单
  getMenuList() {
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
  // 删除
  changeMenuStatus(data) {
    return axios.post(`${base.dev.menu}/changeMenuStatus`,data)
  },

  // 其他接口…………
}

export default menuApi
