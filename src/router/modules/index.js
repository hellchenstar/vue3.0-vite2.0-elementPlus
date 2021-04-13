/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-13 21:09:24
 * @Description: file content
 */
import userCenter from './userCenter.js'
import errorPageArr from './errorPage.js'
const childrenRouter = [
  ...new Set(userCenter),
  ...new Set(errorPageArr),

]
export default childrenRouter