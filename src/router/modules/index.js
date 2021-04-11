/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-11 10:29:46
 * @Description: file content
 */
import userCenter from './userCenter.js'
const childrenRouter = [
  ...new Set(userCenter)
]
export default childrenRouter