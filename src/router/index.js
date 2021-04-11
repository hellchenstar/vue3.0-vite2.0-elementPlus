/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-11 10:28:23
 * @Description: 路由文件
 */
import { createRouter, createWebHistory } from 'vue-router'
import childrenRouter from './modules/index.js'
// 开启历史模式
// vue2中使用 mode: history 实现
const routerHistory = createWebHistory();


const routerList = [{
  path: '/',
  redirect: '/workbench'
},

{
  path: '/login',
  name: 'login',
  component: () => import('@/pages/special/login.vue'),
},
{
  path: '/home',
  name: 'home',
  redirect: '/workbench',
  component: () => import('@/pages/special/home.vue'),
  children: [...new Set(childrenRouter)]
}]
const router = createRouter({
  history: routerHistory,
  routes: routerList

})
router.beforeEach((to, from) => {
  // ...
  // 返回 false 以取消导航
  console.log(to.name)

})
export default router