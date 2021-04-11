<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-11 17:08:01
 * @Description: file content
-->
<template>
	<div class="content">
		<div class="fullscreen">
			<span style="margin-right: 20px">是否全屏</span>
			<el-switch v-model="isFull" @change="changeIsFull"> </el-switch>
		</div>
	</div>
</template>
<script>
import { reactive, toRefs } from "vue"
import screenfull from "screenfull"
export default {
	setup() {
		const setInfo = reactive({
			isFull: screenfull.isFullscreen,
		})
		const handleScreenfull = () => {
			if (!screenfull.isEnabled) {
				this.$message({
					message: "浏览器不支持全屏！",
					type: "warning",
				})
				return false
			}
			screenfull.toggle()
		}
		// 窗口变化的时候获取全屏状态
		window.onresize = () => {
			setInfo.isFull = screenfull.isFullscreen
		}
		// 改变全屏状态
		const changeIsFull = (val) => {
			if (val) {
				handleScreenfull()
			} else {
				screenfull.exit()
			}
		}
		return {
			...toRefs(setInfo),
			changeIsFull,
		}
	},
}
</script>
<style lang="scss" scoped>
.content {
	padding: 0 10px;
}
</style>
