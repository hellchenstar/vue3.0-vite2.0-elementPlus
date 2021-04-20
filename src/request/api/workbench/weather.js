/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-20 10:43:00
 * @Description: file content
 */
import axios from '../../index' // 导入axios实例
const weatherApi = {
  // 获取天气信息
  getWeatherInfo() {
    let url = 'https://www.tianqiapi.com/free/week?appid=52284916&appsecret=7KCOEDL5'
    return axios.get(`${url}&vue=1`)
  },


  // 其他接口…………
}

export default weatherApi

