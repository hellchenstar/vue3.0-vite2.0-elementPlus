/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-19 19:05:13
 * @Description: file content
 */

const workbench = [

  // ======================================================================个人中心======================================================================
  {
    path: '/workbench',
    name: 'workbench',
    meta: {
      icon: 'el-icon-user-solid',
      title: '工作台'
    },
    component: () => import('@/pages/workbench/workbench.vue'),

  },
]

export default workbench