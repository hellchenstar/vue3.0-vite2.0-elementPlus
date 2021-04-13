<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-13 11:18:40
 * @Description: 工作台
-->
<template>
	<div class="workbench">
		<div class="top">
			<div class="top-title">工作台</div>
			<el-row class="top-content">
				<el-col :span="16" class="top-content-left">
					<el-avatar :size="35" class="avatar" :src="avatar">
						<img :src="defaultAvatar" />
					</el-avatar>
					<div>
						<div>
							早上好！
							<span style="font-weight: 600">
								{{ userName }}
							</span>
							,祝你新的一天工作愉快
						</div>
						<!-- <div>西安：</div> -->
					</div>
				</el-col>
				<el-col :span="8">right-content</el-col>
			</el-row>
		</div>
		<div class="center">center</div>
		<div>
			footer
			<div>left</div>
			<div>right</div>
		</div>
	</div>
</template>
<script>
import { reactive, toRefs, onMounted } from "vue"
import defaultAvatar from "@/assets/img/header/defaultAvatar.png"
export default {
	setup() {
		defaultAvatar
		const state = reactive({
			userName: "",
			avatar: "",
		})
		onMounted(() => {
			let userInfo = JSON.parse(localStorage.getItem("userInfo"))
			state.userName = userInfo.name
			state.avatar = userInfo.avatar
		})
		return { ...toRefs(state), defaultAvatar }
	},
}
</script>
<style lang="scss" scoped>
.workbench {
	width: 100%;
	height: 100%;
}
.top,
.center {
	width: 100%;
	border-radius: 10px;
	padding: 10px;
	background: #fff;
}
.top {
	height: 100px;
	.top-title {
		height: 20px;
	}
	.top-content {
		height: calc(100% - 20px);
		.top-content-left {
			padding: 0 20px;
			display: flex;
			align-items: center;
			.el-avatar {
				margin-right: 10px;
			}
		}
	}
}
.center {
	height: 200px;
	margin-top: 10px;
}
</style>
