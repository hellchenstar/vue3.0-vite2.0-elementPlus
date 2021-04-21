/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-21 11:11:26
 * @Description: 作品管理
 */

const works = [

  // ======================================================================个人中心======================================================================
  {
    path: '/works',
    name: 'works',
    meta: {
      icon: 'zuopinzhuzuo',
      title: '作品管理'
    },
    component: () => import('@/pages/special/components/content.vue'),
    children: [
      {
        path: '/articleList',
        name: 'articleList',
        meta: {
          title: '文章管理'
        },
        component: () => import('@/pages/works/articleManager/articleList.vue')
      },
      {
        path: '/pictureList',
        name: 'pictureList',
        meta: {
          title: '照片管理'
        },
        component: () => import('@/pages/works/pictureManager/pictureList.vue')
      }
    ],
  },
]

export default works