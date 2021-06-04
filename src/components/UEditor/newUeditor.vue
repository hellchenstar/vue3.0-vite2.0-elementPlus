<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-06-04 10:17:48
 * @Description: file content
-->
<template>
	<div id="editorContainer"></div>
</template>
<script>
import "/ueditor/ueditor.config.js"
import "/ueditor/ueditor.all.js"
import "/ueditor/ueditor.parse.min.js"
import "/ueditor/lang/zh-cn/zh-cn.js"
// import imgZip from "./components/imgzip.js"
import { onMounted, ref } from "vue"
export default {
	inject: ["ueditorConfig", "readonly", "value"],
	setup() {
		const randomId = "editor_" + (Number(new Date()).toString() + parseInt(1000 * Math.random()) + parseInt(1000 * Math.random()) + parseInt(1000 * Math.random()))
		const instance = ref(null)
		const isUserEdit = ref(false)
		const initEditor = () => {
			//dom元素已经挂载上去了
			$nextTick(() => {
				if (ueditorConfig) {
					instance.value = UE.getEditor(randomId)
				} else {
					instance.value = UE.getEditor(randomId, ueditorConfig.value)
				}
				console.log(this)
				return
				// 这里处理富文本编辑文件上传的问题
				instance.setOpt("doImgUpload", (filepara, done) => {
					const farr = Array.prototype.slice.call(filepara.files)
					const parr = farr.reduce((t, file) => {
						return t.then((r) => {
							return imgzip(file).then(({ furl, data }) => {
								const formData = new FormData()
								formData.append("file", data)
								formData.append("catalog", "diseaseImg")
								console.log("上传图片")
								// 这里做发送图片上传请求
								// return upload.imgUpload().then(res => { //...})
							})
						})
					}, Promise.resolve([]))
					parr.then((r) => {
						done(r)
					})
				})

				instance.addListener("contentChange", (editor) => {
					const val = instance.getContent()

					if (instance.value != val) {
						isUserEdit.value = true
						$emit("input", val)
					}
				})
				// 绑定事件，当 UEditor 初始化完成后，将编辑器实例通过自定义的 ready 事件交出去
				instance.addListener("ready", () => {
					this.$emit("ready", instance)
					if (instance.value) {
						instance.setContent(instance.value)
					}
					if (this.readonly) {
						instance.setDisabled()
					}
				})
			})
		}
		const createScript = () => {
			const container = document.getElementById("editorContainer")
			let script = document.createElement("script")
			script.type = "text/plain"
			script.id = randomId
			script.style = "width: 99%; height: 100%"
			container.appendChild(script)
		}
		onMounted(() => {
			createScript()
			initEditor()
		})
		return {
			randomId,
			instance: null,
			isUserEdit: false,
			initEditor,
		}
	},
}
</script>
<style scoped>
.ueditor-container {
	height: 100%;
	width: 100%;
}
</style>
