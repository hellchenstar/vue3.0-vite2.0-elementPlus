<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-19 19:07:35
 * @Description: file content
-->
<template>
	<div class="Content">
		<Menu />
		<el-container>
			<el-header>
				<Header />
			</el-header>
			<el-main>
				<Container />
			</el-main>
		</el-container>
	</div>
</template>
<script>
import Header from "./components/header.vue"
import Container from "./components/content.vue"
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
		Menu,
		Header,
		Container,
	},
}
</script>
<style lang="scss" scoped>
.Content {
	width: 100%;
	height: 100%;
	display: flex;

	.el-container {
		width: calc(100% - 220px);
		height: 100%;
		.el-header {
			height: 50px !important;
			background: #fff;
		}
		.el-main {
			padding: 5px;
			background: #eee;
			height: calc(100% - 50px);
		}
	}
}
</style>
