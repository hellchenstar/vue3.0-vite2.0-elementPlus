/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-21 12:49:44
 * @Description: 系统设置
 */
export default {
  state() {
    return {
      isReloadMenu: false
    }
  },
  mutations: {
    setIsReloadMenu(state, status) {
      state.isReloadMenu = status
    }
  }
}