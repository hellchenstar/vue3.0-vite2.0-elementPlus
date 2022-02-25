/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2022-02-25 18:08:59
 * @Description: file content
 */
const fnComponents = [

  // ======================================================================计划======================================================================
  {
    path: '/fnList',
    name: 'fnList',
    meta: {
      icon: 'helljihua',
      title: '功能组件'
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
        path: '/editorList',
        name: 'editorList',
        meta: {
          title: '富文本'
        },
        component: () => import('@/pages/fnComponents/editor/editorList.vue')
      },
      {
        path: '/markdownEditor',
        name: 'markdownEditor',
        meta: {
          title: 'markdown编辑器'
        },
        component: () => import('@/pages/fnComponents/markdown/markdownEditor.vue')
      },
      {
        path: '/pictureList',
        name: 'pictureList',
        meta: {
          title: '瀑布流'
        },
        component: () => import('@/pages/fnComponents/pictureManager/pictureList.vue')
      }
    ],
  },
]

export default fnComponents