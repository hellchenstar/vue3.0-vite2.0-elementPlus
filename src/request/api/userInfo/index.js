/*
 * @Author: chenx
 * @Descripttion:
 * @Date: 2022-04-13 16:24:52
 * @LastEditors: chenx
 * @LastEditTime: 2022-04-18 14:54:32
 */
import { base } from '../../baseUrl' // 导入接口域名列表
import axios from '../../index' // 导入http中创建的axios实例

const users = {
  // 获取用户账号信息
  getUserAccountInfo(id) {
    return axios.get(`${base.dev.accounts}/account?id=${id}`)
  },
  // 获取用户个人信息
  getUserInfo(userId) {
    return axios.get(`${base.dev.users}/userInfo?id=${userId}`)
  },
  // 更新用户个人信息
  updateUserInfo(data) {
    return axios.post(`${base.dev.users}/update`, data)
  },
  // 其他接口…………
}

export default users
