/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2022-04-02 10:35:05
 * @Description: file content
 */

import { base } from '../../baseUrl' // 导入接口域名列表
import axios from '../../index' // 导入http中创建的axios实例

const login = {
  // 登录,获取token
  loginSub(params) {
    return axios.post(`${base.dev.root}/login`, params)
  },
  // 注册
  register(params) {
    return axios.post(`${base.dev.root}/register`, params)
  },

  // 其他接口…………
}

export default login
