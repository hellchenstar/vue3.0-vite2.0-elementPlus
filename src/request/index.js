/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-15 14:37:18
 * @Description: file content
 */
import { ElMessage } from 'element-plus';
import axios from 'axios'
import router from '@/router/index'
import { base } from './baseUrl'
// import store from '@/store/index.js'
// import Vue from 'vue'

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, message) => {
  // 状态码判断
  switch (status) {
    // case 401:
    // getRefreshToken()
    // break
    case 403:
      ElMessage.error(message)
      router.push('403')
      // 无权限,提示无权限信息
      // 403 token失效，请求刷新token，刷新token也失效，再跳转登录页
      break
    // 404请求不存在
    case 404:
      router.push('404')
      break
    case 500:
      ElMessage.error(message)
      break
    default:
      ElMessage.error(message)
  }
}
// 刷新token
function getRefreshToken() {
  let refreshToken = localStorage.getItem('refreshToken')
  let url = `${base.dev}/refreshtoken/Get?refresh_token=${refreshToken}`
  return axios
    .get(url)
    .then(res => {
      return Promise.resolve(res.data)
    })
    .catch(err => {
      return Promise.reject(err)
    })
}
//判断token是否到期--提取30秒到期
const isTokenExp = () => {
  let expTime = parseInt(localStorage.getItem('expTime')) //本地token存储的时间
  // 当前秒的时间戳，不含毫秒数
  let currentTime = parseInt(new Date().getTime() / 1000 + 30)
  return currentTime >= expTime ? true : false
}

// 请求刷新token的开关
window.isRefreshing = false
// 拦截所有发送请求的数组
let currentAjaxArr = []

// 数组中的请求得到新的token之后自执行，用新的token去请求数据
function onRefreshed(token) {
  // console.log('重新发送积攒的请求')
  currentAjaxArr.map(cb => cb(token))
}
// 将所有的请求都push到数组中
function subscribeTokenRefresh(cb) {
  // console.log('添加请求')
  currentAjaxArr.push(cb)
}

// 创建axios实例，超时时间为10秒
let instance = axios.create({
  timeout: 1000 * 60
})

/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
  // 登录流程控制中，根据本地是否存在token判断用户的登录情况
  // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
  // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
  // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      // config.headers['X-token'] = token
      config.headers.Authorization = token
      if (config.url.indexOf('file/UploadFile') === -1) {
        config.headers['Content-Type'] = 'application/json'
      } else {
        config.headers['Content-Type'] = 'multipart/form-data'
      }
      // 判断是否token过期
      // console.log('开始拦截')
      // if (isTokenExp() && config.url.indexOf('/refreshtoken/') === -1) {
      //   // console.log('token过期了，开始刷新token')
      //   // 是否正在刷新token，不是的话讲之后的token全部push到数组中

      //   if (!window.isRefreshing) {
      //     // console.log('正在刷新token')
      //     window.isRefreshing = true
      //     getRefreshToken()
      //       .then(res => {
      //         window.isRefreshing = false
      //         if (res.Success) {
      //           // console.log('刷新token成功')
      //           localStorage.setItem('accessToken', res.Data.access_token)
      //           localStorage.setItem('expTime', res.Data.exp)
      //           localStorage.setItem('refreshToken', res.Data.refresh_token)
      //           // console.log('token已经更新')
      //           config.headers.token = res.Data.access_token
      //           onRefreshed(res.Data.access_token)
      //           currentAjaxArr = []
      //         } else {
      //           // console.log('刷新token失败')
      //           ElMessage.error(res.ElMessage)
      //           sessionStorage.clear()
      //           localStorage.clear()
      //           router.push('login')
      //           currentAjaxArr = []
      //         }
      //       })
      //       .catch(err => {
      //         ElMessage.error(err)
      //         sessionStorage.clear()
      //         localStorage.clear()
      //         router.push('login')
      //         // console.log(err)
      //       })
      //     let retry = new Promise((resolve, reject) => {
      //       subscribeTokenRefresh(token => {
      //         config.headers.token = token
      //         resolve(config)
      //       })
      //     })
      //     // console.log('过期判断结束')
      //     return retry
      //   } else {
      //     let retry = new Promise((resolve, reject) => {
      //       subscribeTokenRefresh(token => {
      //         config.headers.token = token
      //         resolve(config)
      //       })
      //     })
      //     // console.log('正在刷新，拦截其他多余请求')
      //     return retry
      //   }
      //   // console.log('token过期了，结束刷新token')
      //   // return config
      // } else {
      //   return config
      // }
      return config
    } else {
      // sessionStorage.clear()
      // localStorage.clear()
      // router.push('login')
      return config
    }
  },
  error => Promise.error(error)
)
// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => {
    if (res.status === 200) {
      if (res.data.code !== 200) {
        ElMessage.error(res.data.msg)
      }
      return Promise.resolve(res.data)
    }
  },
  // 请求失败
  error => {
    console.log('失败了：', error)
    const { response } = error
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.message)
      //403返回的值在response.data.ElMessage
      return Promise.reject(response)
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      if (!window.navigator.onLine) {
        // store.commit("changeNetwork", false)
      } else {
        return Promise.reject(response)
      }
    }
  }
)

export default instance
