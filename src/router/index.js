/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-08 18:38:02
 * @Description: file content
 */
import { createRouter, createWebHistory } from 'vue-router'
// 开启历史模式
// vue2中使用 mode: history 实现
const routerHistory = createWebHistory();

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/special/login.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/pages/special/home.vue'),
      children: [
        {
          path: '/userInfo',
          name: 'userInfo',
          component: () => import('@/pages/user/userInfo.vue')
        },
      ]
    },
  ]
})

export default router