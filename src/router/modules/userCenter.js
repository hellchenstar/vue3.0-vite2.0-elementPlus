/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-15 18:34:26
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
    path: '/userCenter',
    name: 'userCenter',
    meta: {
      icon: 'el-icon-user-solid',
      title: '个人中心'
    },
    component: () => import('@/pages/userCenter/userCenter.vue'),
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
  },
]

export default userCenter