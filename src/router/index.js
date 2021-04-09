/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-09 15:42:15
 * @Description: 路由文件
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
      children: [
        // ======================================================================工作台======================================================================
        {
          path: '/workbench',
          name: 'workbench',
          meta: {
            icon: 'el-icon-s-home',
            title: '工作台'
          },
          children: [],
          component: () => import('@/pages/workbench/workbench.vue')
        },
        // ======================================================================个人中心======================================================================
        {
          path: '/userInfo',
          name: 'userCenter',
          meta: {
            icon: 'el-icon-user-solid',
            title: '个人中心'
          },
          children: [
            {
              path: '/userInfo',
              name: 'userInfo',
              meta: {
                title: '个人资料'
              },
              component: () => import('@/pages/userCenter/userInfo/userInfo.vue')
            }
          ],
          component: () => import('@/pages/userCenter/userCenter.vue')
        },
      ]
    },

  ]
})
router.beforeEach((to, from) => {
  // ...
  // 返回 false 以取消导航
  console.log(to.name)

})
export default router