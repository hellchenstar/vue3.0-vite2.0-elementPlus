<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2022-03-14 13:10:23
 * @Description: file content
-->
<template>
	<div class="module">
		<div class="container">
			<h3 class="title">
				vue-quill-editor编辑器
				<a href="https://www.kancloud.cn/liuwave/quill/1409423">https://www.kancloud.cn/liuwave/quill/1409423</a>
			</h3>
			<div id="editor">
				<Quill v-model="state.content" :options="options" />
			</div>
		</div>
	</div>
</template>

<script>
import { reactive } from "vue"

import { Quill } from "quill"

export default {
	components: {
		Quill,
	},
	setup() {
		const toolbarOptions = [
			["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
			["blockquote", "code-block"], //引用，代码块

			[{ header: 1 }, { header: 2 }], // // 标题，键值对的形式；1、2表示字体大小
			[{ list: "ordered" }, { list: "bullet" }], //列表
			[{ script: "sub" }, { script: "super" }], // 上下标
			[{ indent: "-1" }, { indent: "+1" }], // 缩进
			[{ direction: "rtl" }], // 文本方向

			[{ size: ["small", false, "large", "huge"] }], //  字体大小
			[{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题

			[{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
			[{ font: [] }], //字体
			[{ align: [] }], //对齐方式

			["clean"], // 清除字体样式
			["image", "video"], //上传图片、上传视频
		]
		const options = {
			readOnly: false, // 是否只读，默认false
			theme: "snow", // 主题 snow | bubble, 需要引入对应的样式
			modules: {
				// container: '#toolbar', // x选择toolbar的自定义容器
				toolbar: toolbarOptions, //工具栏功能
			},
			// scrollingContainer:"#editor" // 滚动容器
		}
		const state = reactive({
			content: "",
		})

		return { state, options }
	},
}
</script>
<style lang="scss" scoped>
.container {
	width: 100%;
	height: 100%;
}
.title {
	width: 100%;
	height: 40px;
	padding: 10px 0;
	box-sizing: border-box;
}
#editor {
	width: 100%;
	min-height: 400px;
	max-height: calc(100% - 100px);
	// overflow-y: auto;
	box-sizing: border-box;
	.ql-container {
		width: 100%;
		height: calc(100% - 60px);
		overflow-y: auto;
	}
}
</style>
