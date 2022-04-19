/*
 * @Author: chenx
 * @Descripttion:
 * @Date: 2022-04-19 18:20:11
 * @LastEditors: chenx
 * @LastEditTime: 2022-04-19 18:21:37
 */
import { base } from '../../baseUrl' // 导入接口域名列表
import axios from '../../index' // 导入http中创建的axios实例
const fileUpload = {
  // 登录,获取token
  imgUpload(params) {
    return axios.post(`${base.dev.upload}`, params)
  },

  // 其他接口…………
}

export default fileUpload
