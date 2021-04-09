<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-09 15:43:08
 * @Description: file content
-->
<template>
	<div class="menu">
		<div class="logo">logo</div>
		<el-menu
			router
			default-active="1-4"
			class="el-menu-vertical-demo"
			:collapse="isCollapse"
		>
			<template v-for="(item, index) in routerList" :key="index">
				<el-submenu :index="item.name" v-if="item.children.length">
					<template #title>
						<i :class="item.meta.icon"></i>
						<span>{{ item.meta.title }}</span>
					</template>
					<el-menu-item
						v-for="(el, i) in item.children"
						:index="el.name"
						:key="i"
					>
						{{ el.meta.title }}
					</el-menu-item>
				</el-submenu>

				<el-menu-item :index="item.name" v-else>
					<template #title>
						<i :class="item.meta.icon"></i>
						<span>{{ item.meta.title }}</span>
					</template>
				</el-menu-item>
			</template>
		</el-menu>
	</div>
</template>
<script>
import { onMounted, reactive, toRefs } from "vue"
import { useRouter } from "vue-router"
export default {
	setup() {
		const router = useRouter()
		const routerInfo = reactive({
			routerList: [],
			isCollapse: false,
		})
		onMounted(() => {
			routerInfo.routerList = router.options.routes[2].children
		})
		return {
			...toRefs(routerInfo),
		}
	},
}
</script>
<style lang="scss" scoped>
.menu {
	height: 100%;
	background-color: #001529;
	.logo {
		height: 60px;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
	}
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 100%;
	height: calc(100% - 60px);
}
</style>
