/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2024-02-27 11:18:28
 * @Description: vuex 4.0
 */
import { createStore } from 'vuex';
import special from './modules/special';
import system from './modules/system';

const store = createStore({
  modules: {
    special,
    system,
  },

});

export default store;
