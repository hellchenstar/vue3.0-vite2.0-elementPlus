/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2022-04-21 10:06:39
 * @Description: file content
 */
// 处理多接口多域名的问题
const base = {
  host: 'http://127.0.0.1:21009/',
  dev: {
    accounts: '/api/accounts',
    users: '/api/users',
    menu: '/api/menu',
  },
  upload: {
    img: '/api/upload/img',
  },

  uploadHeader: {
    Authorization: localStorage.getItem('token'),
  },
}

export { base }
