/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-05-06 11:20:45
 * @Description: file content
 */
import workbench from './workbench.js'
import system from './system.js'
import userCenter from './userCenter.js'
import fnComponents from './fnComponents.js'
import cssEffect from './cssEffect.js'
import errorPageArr from './errorPage.js'
const childrenRouter = [
  ...new Set(workbench),
  ...new Set(system),
  ...new Set(userCenter),
  ...new Set(fnComponents),
  ...new Set(cssEffect),
  ...new Set(errorPageArr),

]
export default childrenRouter