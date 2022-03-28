<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2022-03-14 12:34:00
 * @Description: 菜单
-->
<template>
	<el-menu router class="el-menu-vertical" :collapse="isCollapse" unique-opened :default-active="defaultActive">
		<div class="logo">
			<img src="../../../assets/img/logo/logo.jpg" alt="" />
			<span class="sysName" v-if="!isCollapse">Vite2.0 + Vue3.0</span>
		</div>

		<template v-for="(item, index) in menuList" :key="index">
			<el-sub-menu :index="item.url" v-if="item.children.length">
				<template #title>
					<i :class="`icon hell${item.icon}`"></i>
					<span>{{ item.name }}</span>
				</template>

				<el-menu-item v-for="(el, i) in item.children" :index="el.url" :key="i">
					{{ el.name }}
				</el-menu-item>
			</el-sub-menu>

			<el-menu-item :index="item.url" v-else>
				<i :class="`icon hell${item.icon}`"></i>
				<template #title>{{ item.name }}</template>
			</el-menu-item>
		</template>
	</el-menu>
</template>
<script>
import { computed, onMounted, reactive, toRefs, watch } from "vue"
import { menuApi } from "@/request/api/index.js"
import { useStore } from "vuex"
import { useRouter, useRoute } from "vue-router"
import { makeTreeData } from "@/utils/utils.js"
export default {
	setup() {
		// vue的路由实例
		const router = useRouter()
		// 当前路由对象
		const route = useRoute()
		const vuex = useStore()
		const state = reactive({
			menuInfo: {
				userId: "",
			},
			defaultActive: computed(() => {
				return route.name
			}),

			menuList: [],
			isCollapse: computed(() => {
				return vuex.state.special.isCollapse
			}),
		})
		const isReloadMenu = computed(() => {
			return vuex.state.system.isReloadMenu
		})
		watch(
			isReloadMenu,
			val => {
				if (val) {
					getMenuData()
				}
			},
			{ lazy: true }
		)
		const getMenuData = () => {
			menuApi.getMenuList().then(res => {
				state.menuList = makeTreeData(res.data, null)
				vuex.commit("setIsReloadMenu", false)
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
