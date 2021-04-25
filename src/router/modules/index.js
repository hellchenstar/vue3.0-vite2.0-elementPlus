/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-25 14:44:05
 * @Description: file content
 */
import workbench from './workbench.js'
import system from './system.js'
import userCenter from './userCenter.js'
import works from './works.js'
import plans from './plans.js'
import errorPageArr from './errorPage.js'
const childrenRouter = [
  ...new Set(workbench),
  ...new Set(system),
  ...new Set(userCenter),
  ...new Set(works),
  ...new Set(plans),
  ...new Set(errorPageArr),

]
export default childrenRouter