/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-11 14:50:48
 * @Description: vuex 4.0
 */
import { createStore } from 'vuex'
import special from './modules/special.js'
import userSetting from './modules/userSetting.js'
const store = createStore({
  modules: {
    special,
    userSetting
  }

})

export default store