/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-15 13:08:11
 * @Description: file content
 */

import { base } from '../../baseUrl' // 导入接口域名列表
import axios from '../../index' // 导入http中创建的axios实例

const login = {
  // 登录,获取token
  loginSub(params) {
    console.log(`${base.dev.root}/login`)
    return axios.post(`${base.dev.root}/login`, params)
  },
  // 注册
  register(params) {
    return axios.post(`${base.dev.root}/register`, params)
  },

  // 其他接口…………
}

export default login