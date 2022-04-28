/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2022-04-22 17:23:36
 * @Description: file content
 */
// 处理多接口多域名的问题
const { MODE } = import.meta.env
const base = {
  host: MODE === 'development' ? 'http://127.0.0.1:21009/' : 'http://139.129.101.158:21009/',
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
console.log(MODE)
export { base }
