/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-10-15 15:18:36
 * @Description: file content
 */
import workbench from './workbench.js'
import system from './system.js'
import userCenter from './userCenter.js'
import fnComponents from './fnComponents.js'
import cssEffect from './cssEffect.js'
import errorPageArr from './errorPage.js'
// 专门用来测试的页面
import testArr from './test.js'

const childrenRouter = [
  ...new Set(workbench),
  ...new Set(system),
  ...new Set(userCenter),
  ...new Set(fnComponents),
  ...new Set(cssEffect),
  ...new Set(errorPageArr),
  ...new Set(testArr),

]
export default childrenRouter