/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-11 10:09:59
 * @Description: vuex 4.0
 */
import { createStore } from 'vuex'
import special from './modules/special.js'
const store = createStore({
  modules: {
    special
  }

})

export default store