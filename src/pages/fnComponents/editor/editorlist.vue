<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-10-21 17:22:25
 * @Description: file content
-->
<template>
	<div class="module">
		<div>
			富文本编辑器
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
}
</script>
