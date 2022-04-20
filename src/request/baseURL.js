/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2022-04-20 10:27:06
 * @Description: file content
 */
// 处理多接口多域名的问题
const base = {
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
