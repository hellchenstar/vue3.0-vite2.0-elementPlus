/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-21 12:18:19
 * @Description: vuex 4.0
 */
import { createStore } from 'vuex'
import special from './modules/special.js'
import system from './modules/system.js'
const store = createStore({
  modules: {
    special,
    system,
  },
})

export default store
