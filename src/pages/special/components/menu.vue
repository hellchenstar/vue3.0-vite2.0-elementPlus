<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-11 10:10:46
 * @Description: 菜单
-->
<template>
	<div class="menuContent">
		<div class="logo">logo</div>
		<el-menu
			router
			default-active="workbench"
			class="el-menu-vertical"
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
					<i :class="item.meta.icon"></i>
					<template #title>{{ item.meta.title }}</template>
				</el-menu-item>
			</template>
		</el-menu>
	</div>
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
.menuContent {
	width: 100%;
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
	.el-menu {
		width: 100%;
		height: calc(100% - 60px);
	}
}
</style>
