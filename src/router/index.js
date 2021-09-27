/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-09-27 16:09:51
 * @Description: 路由文件
 */
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import childrenRouter from './modules/index.js'
import NProgress from 'NProgress'
// 开启历史模式
// vue2中使用 mode: history 实现
// const routerHistory = createWebHistory();

const routerHash = createWebHashHistory()

const routerList = [
  {
    path: '/',
    redirect: '/home'
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('/@/pages/special/login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('/@/pages/special/register.vue'),
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      title: '工作台'
    },
    redirect: '/workbench',
    component: () => import('/@/pages/special/home.vue'),
    children: [...new Set(childrenRouter)]
  }
]

// 创建路由
const router = createRouter({
  // hostory
  // history: routerHistory,
  // hash
  history: routerHash,
  routes: routerList

})


router.beforeEach((to, from) => {
  NProgress.start()
});

router.afterEach(() => {
  NProgress.done()
});


export default router