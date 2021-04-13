/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-13 21:33:32
 * @Description: file content
 */

import { base } from '../../baseUrl' // 导入接口域名列表
import axios from '../../index' // 导入http中创建的axios实例

const login = {
  // 登录,获取token
  loginSub(params) {
    console.log(`${base.dev.user}/login`)
    return axios.post(`${base.dev.user}/login`, params)
  },
  // 获取登录用户信息
  getUserInfo() {
    return axios.get(`${base.dev.user}/userInfo`)
  },

  // 其他接口…………
}

export default login