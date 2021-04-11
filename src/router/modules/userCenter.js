/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-11 10:30:31
 * @Description: file content
 */

const userCenter = [
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

export default userCenter