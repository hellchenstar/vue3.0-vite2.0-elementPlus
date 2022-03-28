/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2022-03-14 08:56:55
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
      }
     
    ],
  },
]

export default cssEffect