/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-09-27 16:10:58
 * @Description: file content
 */

const userCenter = [

  // ======================================================================个人中心======================================================================
  {
    path: '/userCenter',
    name: 'userCenter',
    meta: {
      icon: 'gerenzhongxin',
      title: '个人中心'
    },
    component: () => import('/@/pages/special/components/content.vue'),
    children: [
      {
        path: '/userInfo',
        name: 'userInfo',
        meta: {
          title: '个人资料'
        },
        component: () => import('/@/pages/userCenter/userInfo/userInfo.vue')
      }
    ],
  },
]

export default userCenter