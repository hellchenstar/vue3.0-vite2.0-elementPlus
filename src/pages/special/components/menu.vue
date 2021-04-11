<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-11 11:31:52
 * @Description: 菜单
-->
<template>
	<el-menu
		router
		default-active="workbench"
		class="el-menu-vertical"
		:collapse="isCollapse"
	>
		<div class="logo">
			<img src="@/assets/img/header/logo.svg" alt="" />
			<span class="sysName" v-if="!isCollapse"> Vite2.0 + Vue3.0 </span>
		</div>

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
				<i :class="item.meta.icon"></i>
				<template #title>{{ item.meta.title }}</template>
			</el-menu-item>
		</template>
	</el-menu>
</template>
<script>
import { computed, onMounted, reactive, toRefs } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
export default {
	setup() {
		const router = useRouter()
		const vuex = useStore()
		const routerInfo = reactive({
			routerList: [],
			isCollapse: computed(() => {
				return vuex.state.special.isCollapse
			}),
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
.el-menu-vertical:not(.el-menu--collapse) {
	width: 200px;
	height: 100%;
	overflow-y: auto;
	overflow-x: hidden;
}
.logo {
	height: 50px;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 10px;
	border-bottom: 1px solid #ccc;
	img {
		width: 24px;
		height: 24px;
	}
	.sysName {
		height: 30px;
		line-height: 30px;
		white-space: nowrap;
		margin-left: 10px;
	}
}
</style>
