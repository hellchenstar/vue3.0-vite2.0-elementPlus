/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-21 11:10:40
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
      },
      {
        path: '/roleManager',
        name: 'roleManager',
        meta: {
          title: '角色管理'
        },
        component: () => import('@/pages/system/roleManager/roleList.vue')
      }
    ],

  },
]

export default system