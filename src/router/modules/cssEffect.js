/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2022-02-26 14:25:40
 * @Description: file content
 */
const cssEffect = [
  {
    path: '/cssEffect',
    name: 'cssEffect',
    meta: {
      title: 'css特效'
    },
    component: () => import('@/pages/special/components/content.vue'),
    children: [
      {
        path: '/shower',
        name: 'shower',
        meta: {
          title: '流星雨'
        },
        component: () => import('@/pages/cssEffect/css-1/index.vue')
      },
      {
        path: '/test22',
        name: 'test22',
        meta: {
          title: '流星雨'
        },
        component: () => import('@/pages/cssEffect/test22/test22.vue')
      }
    ],
  },
]

export default cssEffect