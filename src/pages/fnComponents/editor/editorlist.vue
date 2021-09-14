<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-06-04 16:08:26
 * @Description: file content
-->
<template>
	<div class="module">
		<div>
			<vue-ueditor-wrap v-model="state.content" :config="editorConfig" editor-id="editor-demo-01"></vue-ueditor-wrap>
		</div>
	</div>
</template>

<script>
import { reactive } from "vue"

export default {
	setup() {
		const state = reactive({
			content: "",
		})

		return { state }
	},
	created() {
		// 更多 UEditor 配置，参考 http://fex.baidu.com/ueditor/#start-config
		this.editorConfig = {
			UEDITOR_HOME_URL: "/UEditor/", // 访问 UEditor 静态资源的根路径，可参考常见问题1
		}
	},
}
</script>
