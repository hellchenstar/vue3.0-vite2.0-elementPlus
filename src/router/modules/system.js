/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-15 16:00:50
 * @Description: file content
 */


const system = [

  // ======================================================================系统设置======================================================================
  {
    path: '/system',
    name: 'system',
    meta: {
      icon: 'el-icon-setting',
      title: '系统设置'
    },
    component: () => import('@/pages/system/system.vue'),
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