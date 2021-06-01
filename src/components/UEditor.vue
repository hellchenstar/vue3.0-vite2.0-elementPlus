<template>
	<div>
		<!--下面通过传递进来的id完成初始化-->
		<script :id="randomId" type="text/plain" style="width: 99%; height: 100%"></script>
	</div>
</template>

<script>
require("../../static/ueditor/ueditor.config.js")
require("../../static/ueditor/ueditor.all.js")
require("../../static/ueditor/ueditor.parse.min.js")
require("../../static/ueditor/lang/zh-cn/zh-cn.js")
import imgzip from "./imgzip.js"
export default {
	props: {
		//配置可以传递进来
		ueditorConfig: null,
		readonly: false,
		value: "",
	},
	watch: {
		value: function (val, oldval) {
			if (!this.isUserEdit && val != oldval) {
				try {
					this.instance.setContent(val)
				} catch (e) {
					this.instance.addListener("ready", () => {
						this.instance.setContent(val)
					})
				}
			}
			if (this.isUserEdit) {
				this.isUserEdit = false
			}
		},
	},
	data() {
		return {
			//每个编辑器生成不同的id,以防止冲突
			randomId: "editor_" + (Number(new Date()).toString() + parseInt(1000 * Math.random()) + parseInt(1000 * Math.random()) + parseInt(1000 * Math.random())),
			//编辑器实例
			instance: null,
			isUserEdit: false,
		}
	},
	//此时--el挂载到实例上去了,可以初始化对应的编辑器了
	mounted() {
		var that = this
		$(function () {
			that.initEditor()
		})
	},

	beforeDestroy() {
		// 组件销毁的时候，要销毁 UEditor 实例
		if (this.instance !== null && this.instance.destroy) {
			this.instance.destroy()
		}
	},
	methods: {
		setUEContent(val) {
			setTimeout(() => {
				this.instance.setContent(val)
			}, 1000)
		},
		getUEContent() {
			// 获取内容方法
			return this.instance.getContent()
		},
		destroy() {
			this.instance.destroy()
		},
		setToViewMode() {
			if (this.instance.queryCommandState("source") == 1) {
				this.instance.execCommand("source")
			}
		},
		initEditor() {
			//dom元素已经挂载上去了
			this.$nextTick(() => {
				if (this.ueditorConfig) {
					this.instance = UE.getEditor(this.randomId)
				} else {
					this.instance = UE.getEditor(this.randomId, this.ueditorConfig)
				}

				var that = this
				// 这里处理富文本编辑文件上传的问题
				// this.instance.setOpt("doImgUpload", function (filepara, done) {
				// 	var farr = Array.prototype.slice.call(filepara.files)
				// 	var parr = farr.reduce((t, file) => {
				// 		return t.then((r) => {
				// 			return imgzip(file).then(({ furl, data }) => {
				// 				var formData = new FormData()
				// 				formData.append("file", data)
				// 				formData.append("catalog", "diseaseImg")
				// 				console.log("上传图片")
				// 				return that.$request.upload("/file/uploadImage", formData).then((res) => {
				// 					if (res.res && res.res.body) {
				// 						var imageUrl = that.$cfg.imgPreviewUrl + res.res.body
				// 						return r.concat([imageUrl])
				// 					} else {
				// 						return Promise.reject(null)
				// 					}
				// 				})
				// 			})
				// 		})
				// 	}, Promise.resolve([]))
				// 	parr.then((r) => {
				// 		done(r)
				// 	})
				// })

				this.instance.addListener("contentChange", function (editor) {
					var val = that.instance.getContent()

					if (that.value != val) {
						that.isUserEdit = true
						that.$emit("input", val)
					}
				})
				// 绑定事件，当 UEditor 初始化完成后，将编辑器实例通过自定义的 ready 事件交出去
				this.instance.addListener("ready", () => {
					this.$emit("ready", this.instance)
					if (that.value) {
						this.instance.setContent(that.value)
					}
					if (this.readonly) {
						this.instance.setDisabled()
					}
				})
			})
		},
	},
}
</script>

<style scoped>
.ueditor-container {
	height: 100%;
	width: 100%;
}
</style>
