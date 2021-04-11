/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-11 15:01:18
 * @Description: 用户设置
 */
export default {
  state() {
    return {
      isFull: false
    }
  },
  mutations: {
    setIsFull(state, status) {
      state.isFull = status
    }
  }
}