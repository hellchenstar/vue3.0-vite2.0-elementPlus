<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-23 14:59:36
 * @Description: file content
-->
<template>
	<div class="header">
		<div class="header_nav">
			<i :class="`el-icon-s-${isCollapse ? 'un' : ''}fold`" @click="setMenuStatus"></i>
			<!--  -->
			<el-breadcrumb separator="/" style="margin-left: 10px">
				<el-breadcrumb-item v-for="item in routeList" :key="item.name">
					{{ item.meta.title }}
				</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="userCenter">
			<el-avatar :size="35" class="avatar" :src="avatar">
				<img :src="defaultAvatar" />
			</el-avatar>
			<el-dropdown @command="handleCommand">
				<span class="el-dropdown-link">
					{{ userName }}
					<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item command="userInfo">个人资料</el-dropdown-item>
						<el-dropdown-item command="logout">退出</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
			<i class="el-icon-setting setting" @click="openSetting"></i>
		</div>
		<el-drawer title="用户设置" v-model="drawer" :before-close="handleClose" destroy-on-close>
			<UserSetting></UserSetting>
		</el-drawer>
	</div>
</template>
<script>
import { computed, onMounted, reactive, toRefs } from "vue"
import { useRouter, useRoute } from "vue-router"
import { useStore } from "vuex"
import defaultAvatar from "@/assets/img/header/defaultAvatar.png"
import UserSetting from "./userSetting.vue"
export default {
	components: {
		UserSetting,
	},
	setup() {
		const router = useRouter()
		const route = useRoute()
		const vuex = useStore()
		// reactive将数据变为响应式
		// 个人信息===================================================
		const userInfo = reactive({
			userName: "",
			avatar: "",
			defaultAvatar,
			drawer: false,
			isCollapse: computed(() => {
				return vuex.state.special.isCollapse
			}),
		})

		const setMenuStatus = () => {
			vuex.commit("setIsCollapse", !userInfo.isCollapse)
		}
		const getUserInfo = () => {
			let username = localStorage.getItem("username")
			if (username) {
				userInfo.userName = username
			} else {
				router.push("login")
			}
		}
		const handleCommand = (command) => {
			if (command === "userInfo") {
				router.push(command)
			} else {
				localStorage.clear()
				router.push("login")
			}
		}

		// 个性化设置 ==============================================

		const setting = reactive({
			drawer: false,
		})
		const openSetting = () => {
			setting.drawer = true
		}
		const handleClose = () => {
			setting.drawer = false
		}

		// 面包屑 ==============================================
		const navInfo = reactive({
			routeList: computed(() => {
				let arr = route.matched.filter((el, index) => {
					return index !== 0
				})
				return arr
			}),
		})

		onMounted(() => {
			getUserInfo()
		})
		return {
			...toRefs(userInfo),
			getUserInfo,
			handleCommand,
			setMenuStatus,

			...toRefs(setting),
			openSetting,
			handleClose,

			...toRefs(navInfo),
			route,
		}
	},
}
</script>
<style lang="scss" scoped>
.header {
	height: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.header_nav {
		display: flex;
		align-items: center;
	}
	.userCenter {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 20px;
		cursor: pointer;

		.avatar {
			width: 30px;
			height: 30px;
			margin-right: 10px;
			border-radius: 50%;
		}
		.setting {
			margin-left: 10px;
		}
	}
}
</style>
