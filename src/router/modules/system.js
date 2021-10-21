/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-09-27 16:10:54
 * @Description: file content
 */


const system = [

  // ======================================================================系统设置======================================================================
  {
    path: '/system',
    name: 'system',
    meta: {
      icon: 'xitongshezhi',
      title: '系统设置'
    },
    component: () => import('@/pages/special/components/content.vue'),
    children: [
      {
        path: '/menuManager',
        name: 'menuManager',
        meta: {
          title: '菜单管理'
        },
        component: () => import('@/pages/system/menuManager/menuList.vue')
      }

    ],

  },
]

export default system