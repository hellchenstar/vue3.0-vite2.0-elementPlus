<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-08 17:28:22
 * @Description: file content
-->
<template>
	<div class="header">
		<div>
			<i class="el-icon-s-fold"></i>
			<i class="el-icon-s-unfold"></i>
		</div>
		<div>
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
import { onMounted, reactive, toRefs } from "vue"
import { useRouter } from "vue-router"
export default {
	setup() {
		const router = useRouter()
		// reactive将数据变为响应式
		const userInfo = reactive({
			userName: "",
		})
		const getUserInfo = () => {
			userInfo.userName = "管理员"
		}
		const handleCommand = (command) => {
			if (command === "userInfo") {
				router.push(command)
			} else {
				router.push("login")
			}
		}
		onMounted(() => {
			console.log(router)
			getUserInfo()
		})
		return {
			...toRefs(userInfo),
			getUserInfo,
			handleCommand,
		}
	},
}
</script>
<style lang="scss" scoped>
.header {
	height: 60px;
	border-bottom: 1px solid #eee;
	display: flex;
	padding: 0 10px;
	justify-content: space-between;
	align-items: center;
	background: #fff;
}
</style>
