/*
 * @Author: chenx
 * @Descripttion: 
 * @Date: 2021-10-15 15:17:02
 * @LastEditors: chenx
 * @LastEditTime: 2021-10-15 15:33:34
 */
const test = [

  // ======================================================================个人中心======================================================================
  {
    path: '/test',
    name: 'test',
    meta: {
      icon: 'weimingmingwenjianjia_gongzuotai',
      title: '测试页面'
    },
    component: () => import('/@/pages/test/index.vue'),

  },
]

export default test