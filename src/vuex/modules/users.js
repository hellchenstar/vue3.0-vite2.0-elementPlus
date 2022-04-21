/*
 * @Author: chenx
 * @Descripttion:
 * @Date: 2022-04-21 10:39:03
 * @LastEditors: chenx
 * @LastEditTime: 2022-04-21 11:03:04
 */
import { base } from '@/request/baseURL'
export default {
  state() {
    return {
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    }
  },
  mutations: {
    updateUserInfo(state, status) {
      if (status) {
        state.avatar = `${base.host}${status}`
      }
      console.log('===', status)
    },
  },
}
