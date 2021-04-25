/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-25 14:58:20
 * @Description: file content
 */
const plans = [

  // ======================================================================计划======================================================================
  {
    path: '/plan',
    name: 'plan',
    meta: {
      icon: 'helljihua',
      title: '计划管理'
    },
    component: () => import('@/pages/special/components/content.vue'),
    children: [

      {
        path: '/planList',
        name: 'planList',
        meta: {
          title: '计划管理'
        },
        component: () => import('@/pages/plans/planManager/planList.vue')
      }
    ],
  },
]

export default plans