<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-20 17:47:03
 * @Description: 工作台
-->
<template>
	<div class="workbench">
		<div class="top">
			<div class="top-title">工作台</div>
			<el-row class="top-content">
				<el-col :span="6" class="top-content-left">
					<el-avatar :size="35" class="avatar" :src="avatar">
						<img :src="defaultAvatar" />
					</el-avatar>

					<div>
						<div>
							<span style="font-weight: 600">
								{{ userName }}
							</span>
							,祝你新的一天工作愉快
						</div>
						<!-- <div>西安：</div> -->
					</div>
				</el-col>
				<el-col :span="18"> </el-col>
			</el-row>
		</div>
		<div class="center">
			<el-row :gutter="10">
				<el-col :span="14"></el-col>
				<el-col :span="10">
					<Weather></Weather>
				</el-col>
			</el-row>
		</div>
		<div class="footer">
			<div>left</div>
			<div>center</div>
			<div>right</div>
		</div>
	</div>
</template>
<script>
import { reactive, toRefs, onMounted } from "vue"
import defaultAvatar from "@/assets/img/header/defaultAvatar.png"
import Weather from "./components/weather.vue"
export default {
	components: {
		Weather,
	},
	setup() {
		defaultAvatar
		const state = reactive({
			userName: "",
			avatar: "",
		})

		onMounted(() => {
			let userName = localStorage.getItem("name")
			let avatar = localStorage.getItem("avatar")
			state.userName = userName ? userName : ""
			state.avatar = avatar ? avatar : defaultAvatar
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
.center,
.footer {
	width: 100%;
	border-radius: 10px;
	padding: 5px;
	background: #fff;
	margin-bottom: 5px;
}
.top {
	height: 150px;
	color: #fff;
	background: rgb(110, 134, 179);
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
	padding: 0;
}
.footer {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
</style>
