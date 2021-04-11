<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-11 10:17:49
 * @Description: file content
-->
<template>
	<div class="home">
		<el-container>
			<el-aside>
				<Menu></Menu>
			</el-aside>
			<el-container>
				<el-header>
					<Header></Header>
				</el-header>
				<el-main>
					<Content></Content>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>
<script>
import Header from "./components/header.vue"
import Content from "./components/content.vue"
import Menu from "./components/menu.vue"
import { computed, reactive, toRefs } from "vue"
import { useStore } from "vuex"
export default {
	setup() {
		const vuex = useStore()
		const state = reactive({
			isCollapse: computed(() => {
				return vuex.state.special.isCollapse
			}),
		})
		return {
			...toRefs(state),
		}
	},
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
	.el-container {
		width: 100%;
		height: 100%;
		.el-aside {
			height: 100%;
		}
		.el-header {
			padding: 0;
		}
		.el-main {
			margin: 5px;
			padding: 5px;
			background: #fff;
		}
	}
}
</style>
