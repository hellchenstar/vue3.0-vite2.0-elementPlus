<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-19 11:55:25
 * @Description: 菜单
-->
<template>
	<el-menu router default-active="workbench" class="el-menu-vertical" :collapse="isCollapse">
		<div class="logo">
			<img src="@/assets/img/logo/logo.jpg" alt="" />
			<span class="sysName" v-if="!isCollapse"> Vite2.0 + Vue3.0 </span>
		</div>

		<template v-for="(item, index) in menuList" :key="index">
			<el-submenu :index="item.url" v-if="item.children.length">
				<template #title>
					<i :class="`el-icon-${item.icon}`"></i>
					<span>{{ item.name }}</span>
				</template>

				<el-menu-item v-for="(el, i) in item.children" :index="el.url" :key="i">
					{{ el.name }}
				</el-menu-item>
			</el-submenu>

			<el-menu-item :index="item.url" v-else>
				<i :class="`el-icon-${item.icon}`"></i>
				<template #title>{{ item.name }}</template>
			</el-menu-item>
		</template>
	</el-menu>
</template>
<script>
import { computed, onMounted, reactive, toRefs } from "vue"
import { menuApi } from "@/request/api/index.js"
import { useStore } from "vuex"
import { useRoute } from "vue-router"
import { makeTreeData } from "@/utils/utils.js"
export default {
	setup() {
		const router = useRoute()
		const vuex = useStore()
		const state = reactive({
			menuInfo: {
				userId: "",
			},

			menuList: [],
			isCollapse: computed(() => {
				return vuex.state.special.isCollapse
			}),
		})

		const getMenuData = () => {
			menuApi.getMenuList().then((res) => {
				state.menuList = makeTreeData(res.data, "")
			})
		}
		onMounted(() => {
			let userId = localStorage.getItem("userId")
			if (userId) {
				getMenuData()
			} else {
				router.push("login")
			}
		})
		return {
			...toRefs(state),
			getMenuData,
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
		width: 40px;
		height: 40px;
	}
	.sysName {
		height: 30px;
		line-height: 30px;
		white-space: nowrap;
		margin-left: 10px;
	}
}
</style>
