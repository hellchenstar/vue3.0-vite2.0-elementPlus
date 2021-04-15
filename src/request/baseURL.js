/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-15 14:20:35
 * @Description: file content
 */
// 处理多接口多域名的问题
// http://192.168.1.173:5000下使用
const base = {
  dev: {
    root: 'api/users',
    menu: 'api/menu'
  }
}

// 'http://39.97.254.142:8082下使用
// const base = {
//   dev: {
//     root: 'iframe',
//     menu: 'iframe/index'
//   },
// }


export { base }
