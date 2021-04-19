/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-19 19:01:24
 * @Description: 路由文件
 */
import { createRouter, createWebHistory } from 'vue-router'
import childrenRouter from './modules/index.js'
import NProgress from 'NProgress'
// 开启历史模式
// vue2中使用 mode: history 实现
const routerHistory = createWebHistory();


const routerList = [
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
    path: '/register',
    name: 'register',
    component: () => import('@/pages/special/register.vue'),
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      title: '工作台'
    },
    redirect: '/workbench',
    component: () => import('@/pages/special/home.vue'),
    children: [...new Set(childrenRouter)]
  }
]

// 创建路由
const router = createRouter({
  history: routerHistory,
  routes: routerList

})


router.beforeEach((to, from) => {
  NProgress.start()
});

router.afterEach(() => {
  NProgress.done()
});


export default router