/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-21 12:49:37
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