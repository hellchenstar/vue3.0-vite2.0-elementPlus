/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-19 19:11:17
 * @Description: file content
 */

const userCenter = [

  // ======================================================================个人中心======================================================================
  {
    path: '/userCenter',
    name: 'userCenter',
    meta: {
      icon: 'el-icon-user-solid',
      title: '个人中心'
    },
    component: () => import('@/pages/special/components/content.vue'),
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