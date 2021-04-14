/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-14 17:58:59
 * @Description: 菜单
 */
import { base } from '../../baseUrl' // 导入接口域名列表
import axios from '../../index' // 导入axios实例

const menuApi = {
  // 登录,获取token
  getMenuList(params) {
    return axios.post(`${base.dev.menu}/getMenuList`, params)
  },
  // 注册
  getMenuTable(params) {
    return axios.post(`${base.dev.menu}/getDataTable`, params)
  },

  // 其他接口…………
}

export default menuApi
