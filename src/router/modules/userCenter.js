/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2022-02-26 11:11:35
 * @Description: file content
 */

const userCenter = [

  // ======================================================================个人中心======================================================================
  {
    path: '/userCenter',
    name: 'userCenter',
    meta: {
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