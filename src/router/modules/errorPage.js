/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2022-02-26 11:11:37
 * @Description: file content
 */
const errorIndex = () => import('@/pages/errorPage/index.vue')
const page403 = () => import('@/pages/errorPage/403.vue')
const page404 = () => import('@/pages/errorPage/404.vue')
const errorPageArr = [

  {
    path: '/errorIndex',
    name: 'errorIndex',
    meta: {
      icon: 'el-icon-error'
    },
    component: errorIndex,
    children: [
      {
        path: '/403',
        name: '403',
        meta: {
          title: '403'
        },
        component: page403
      },
      {
        path: '/404',
        name: '404',
        meta: {
          title: '404'
        },
        component: page404
      }
    ]
  }
]

export default errorPageArr