<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-11 10:10:28
 * @Description: file content
-->
<template>
	<div class="header">
		<div>
			<i
				:class="isCollapse ? `el-icon-s-unfold` : 'el-icon-s-fold'"
				@click="setMenuStatus"
			></i>
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
import { computed, onMounted, reactive, toRefs } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
export default {
	setup() {
		const router = useRouter()
		const vuex = useStore()
		// reactive将数据变为响应式
		const userInfo = reactive({
			userName: "",
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
	height: 60px;
	border-bottom: 1px solid #eee;
	display: flex;
	padding: 0 10px;
	justify-content: space-between;
	align-items: center;
	background: #fff;
	.el-dropdown-link {
		cursor: pointer;
	}
}
</style>
