<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-11 11:25:23
 * @Description: file content
-->
<template>
	<div class="header">
		<div>
			<i
				:class="`el-icon-s-${isCollapse ? 'un' : ''}fold`"
				@click="setMenuStatus"
			></i>
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
		</div>
	</div>
</template>
<script>
import { computed, onMounted, reactive, toRefs } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import defaultAvatar from "@/assets/img/header/defaultAvatar.png"
export default {
	setup() {
		const router = useRouter()
		const vuex = useStore()
		// reactive将数据变为响应式
		const userInfo = reactive({
			userName: "",
			avatar: "",
			defaultAvatar,
			isCollapse: computed(() => {
				return vuex.state.special.isCollapse
			}),
		})
		const setMenuStatus = () => {
			vuex.commit("setIsCollapse", !userInfo.isCollapse)
		}
		const getUserInfo = () => {
			let user = JSON.parse(localStorage.getItem("userInfo"))
			if (user) {
				userInfo.userName = user.name
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
		onMounted(() => {
			getUserInfo()
		})
		return {
			...toRefs(userInfo),
			getUserInfo,
			handleCommand,
			setMenuStatus,
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
	}
}
</style>
