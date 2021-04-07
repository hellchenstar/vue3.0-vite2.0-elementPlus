<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-07 21:15:04
 * @Description: file content
-->
<template>
	<div class="home">
		<el-row>
			<el-col :span="3">
				<Menu></Menu>
			</el-col>
			<el-col :span="21">
				<Header></Header>
				<Content></Content>
			</el-col>
		</el-row>
	</div>
</template>
<script>
import Header from "./components/header.vue"
import Content from "./components/content.vue"
import Menu from "./components/menu.vue"
export default {
	components: {
		Header,
		Content,
		Menu,
	},
}
</script>
<style lang="scss" scoped>
.home {
	width: 100%;
	height: 100%;
	.el-row {
		height: 100%;
	}
}
</style>
