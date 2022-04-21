/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2022-04-21 10:41:05
 * @Description: vuex 4.0
 */
import { createStore } from 'vuex'
import special from './modules/special.js'
import system from './modules/system.js'
import users from './modules/users.js'
const store = createStore({
  modules: {
    special,
    system,
    users,
  },
})

export default store
