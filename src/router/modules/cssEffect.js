/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-09-27 16:10:27
 * @Description: file content
 */
const cssEffect = [

  // ======================================================================计划======================================================================
  {
    path: '/cssEffect',
    name: 'cssEffect',
    meta: {
      icon: 'helljihua',
      title: 'css特效'
    },
    component: () => import('/@/pages/special/components/content.vue'),
    children: [

      {
        path: '/cssEffect-1',
        name: 'cssEffect-1',
        meta: {
          title: '流星雨'
        },
        component: () => import('/@/pages/cssEffect/cssEffect-1/cssEffect-1.vue')
      },

    ],
  },
]

export default cssEffect