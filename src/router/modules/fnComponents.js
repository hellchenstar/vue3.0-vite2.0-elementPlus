/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-26 14:39:32
 * @Description: file content
 */
const fnComponents = [

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
        path: '/calendar',
        name: 'calendar',
        meta: {
          title: '日历'
        },
        component: () => import('@/pages/fnComponents/calendar/calendar.vue')
      },
      {
        path: '/editorlist',
        name: 'editorlist',
        meta: {
          title: '富文本'
        },
        component: () => import('@/pages/fnComponents/editor/editorlist.vue')
      }
    ],
  },
]

export default fnComponents