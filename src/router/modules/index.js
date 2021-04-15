/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-15 15:51:21
 * @Description: file content
 */
import system from './system.js'
import userCenter from './userCenter.js'
import errorPageArr from './errorPage.js'
const childrenRouter = [
  ...new Set(system),
  ...new Set(userCenter),
  ...new Set(errorPageArr),

]
export default childrenRouter