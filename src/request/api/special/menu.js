/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-15 13:07:30
 * @Description: 菜单
 */
import { base } from '../../baseUrl' // 导入接口域名列表
import axios from '../../index' // 导入axios实例

const menuApi = {
  // 登录,获取token
  getMenuList() {
    console.log(`${base.dev.menu}/menuList`)
    return axios.get(`${base.dev.menu}/menuList`)
  },
  // 注册
  getMenuTable(params) {
    return axios.post(`${base.dev.menu}/saveMenu`, params)
  },

  // 其他接口…………
}

export default menuApi
