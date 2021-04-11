/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-11 10:09:16
 * @Description: file content
 */

export default {
  state() {
    return {
      isCollapse: false
    }
  },
  mutations: {
    setIsCollapse(state, status) {
      state.isCollapse = status
    }
  }
}