/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-21 11:11:11
 * @Description: file content
 */

const workbench = [

  // ======================================================================个人中心======================================================================
  {
    path: '/workbench',
    name: 'workbench',
    meta: {
      icon: 'weimingmingwenjianjia_gongzuotai',
      title: '工作台'
    },
    component: () => import('@/pages/workbench/workbench.vue'),

  },
]

export default workbench