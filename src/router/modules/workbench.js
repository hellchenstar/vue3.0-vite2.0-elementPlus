/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2023-12-18 15:02:43
 * @Description: file content
 */

const workbench = [

  // ======================================================================个人中心======================================================================
  {
    path: '/workbench',
    name: 'workbench',
    meta: {
      title: '工作台'
    },
    component: () => import('@/pages/workbench/workbench.vue'),

  },
]

export default workbench