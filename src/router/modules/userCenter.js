/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2022-04-13 15:38:22
 * @Description: file content
 */

const userCenter = [
  // ======================================================================个人中心======================================================================
  {
    path: '/userCenter',
    name: 'userCenter',
    meta: {
      title: '个人中心',
    },
    component: () => import('@/pages/special/components/content.vue'),
    children: [
      {
        path: '/userInfo',
        name: 'userInfo',
        meta: {
          title: '个人资料',
        },
        component: () => import('@/pages/userCenter/userInfo/userInfo.vue'),
      },
      {
        path: '/editUserInfo',
        name: 'editUserInfo',
        meta: {
          title: '编辑用户信息',
        },
        component: () => import('@/pages/userCenter/userInfo/editUserInfo.vue'),
      },
    ],
  },
]

export default userCenter
