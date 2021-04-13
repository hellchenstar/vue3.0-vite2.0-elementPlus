/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-13 21:19:23
 * @Description: file content
 */
// 处理多接口多域名的问题

const base = {
  dev: {
    user: 'api/users'
  },
}
const fileUploadPath = 'api/v1/file/UploadFile'
const fileDownloadPath = 'api/v1/file/DownloadFile?'

export { base, fileUploadPath, fileDownloadPath }
