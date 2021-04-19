/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-19 15:19:41
 * @Description: file content
 */
// 菜单数据接口重组

export const makeTreeData = function (data, pId) {
  let temp = []
  for (let i = 0; i < data.length; i++) {

    if (data[i].parentId === pId) {
      temp.push(data[i])
      data[i].children = makeTreeData(data, data[i]._id)
    }
  }
  return temp
}
