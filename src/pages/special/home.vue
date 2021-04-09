<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-09 18:55:29
 * @Description: file content
-->
<template>
	<div class="home">
		<el-container>
			<el-aside width="200px">
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
				return vuex.state.isCollapse
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
}
</style>
