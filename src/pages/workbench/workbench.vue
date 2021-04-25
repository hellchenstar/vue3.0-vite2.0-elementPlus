<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-25 16:49:06
 * @Description: 工作台
-->
<template>
	<div class="workbench">
		<el-carousel type="card" height="300px" class="carousel">
			<el-carousel-item v-for="(item, index) in imgList" :key="index">
				<img :src="item.src" alt="" />
			</el-carousel-item>
		</el-carousel>

		<div class="center">
			<Weather></Weather>
			<div class="center_right">
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
				</div>
			</div>
		</div>
		<el-row :gutter="10" class="top">
			<el-col :span="4"><div class="grid-content bg-purple">1</div></el-col>
			<el-col :span="4"><div class="grid-content bg-purple">2</div></el-col>
			<el-col :span="4"><div class="grid-content bg-purple">3</div></el-col>
			<el-col :span="4"><div class="grid-content bg-purple">4</div></el-col>
			<el-col :span="4"><div class="grid-content bg-purple">4</div></el-col>
			<el-col :span="4"><div class="grid-content bg-purple">4</div></el-col>
		</el-row>
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
		const imgList = [
			{ src: "/src/assets/img/workbench/slider/1.jpg" },
			{ src: "/src/assets/img/workbench/slider/2.jpg" },
			{ src: "/src/assets/img/workbench/slider/3.jpg" },
			{ src: "/src/assets/img/workbench/slider/4.jpg" },
			{ src: "/src/assets/img/workbench/slider/5.jpg" },
		]
		console.log(imgList)
		onMounted(() => {
			let userName = localStorage.getItem("username")
			let avatar = localStorage.getItem("avatar")
			state.userName = userName ? userName : ""
			state.avatar = avatar ? avatar : defaultAvatar
		})
		return { ...toRefs(state), defaultAvatar, imgList }
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
}
.bg-purple {
	background: #aedadd;
}
.top {
	height: 250px;
	margin-bottom: 10px;
	.el-col {
		height: 100%;
		.grid-content {
			height: 100%;
			border-radius: 10px;
		}
	}
}
.center {
	display: flex;
	padding: 0;
	height: 286px;
	margin-bottom: 10px;
	.center_left {
		background: #fff;
	}
	.center_right {
		margin-left: 10px;
		width: calc(100% - 710px);
		height: 100%;
		background: #fff;
		border-radius: 10px;
		padding: 10px;
	}
}
.carousel {
	img {
		width: 100%;
		height: 100%;
	}
}
</style>
