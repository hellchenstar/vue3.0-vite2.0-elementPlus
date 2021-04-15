/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-15 14:28:47
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
  path: '/register',
  name: 'register',
  component: () => import('@/pages/special/register.vue'),
},
{
  path: '/home',
  name: 'home',
  redirect: '/workbench',
  component: () => import('@/pages/special/home.vue'),
  children: [...new Set(childrenRouter)]
}]

// 创建路由
const router = createRouter({
  history: routerHistory,
  routes: routerList

})

export default router