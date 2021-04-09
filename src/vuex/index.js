/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-09 16:05:05
 * @Description: vuex 4.0
 */
import { createStore } from 'vuex'

const store = createStore({
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
})

export default store