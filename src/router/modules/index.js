/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-19 19:00:31
 * @Description: file content
 */
import workbench from './workbench.js'
import system from './system.js'
import userCenter from './userCenter.js'
import errorPageArr from './errorPage.js'
const childrenRouter = [
  ...new Set(workbench),
  ...new Set(system),
  ...new Set(userCenter),
  ...new Set(errorPageArr),

]
export default childrenRouter