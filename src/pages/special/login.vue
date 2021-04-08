<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-08 17:48:53
 * @Description: 登录
-->
<template>
	<div>
		<el-button type="primary" @click="login">主要按钮</el-button>
	</div>
</template>
<script>
import { useRouter } from "vue-router"
export default {
	setup() {
		const router = useRouter()
		const login = () => {
			router.push("home")
		}
		return {
			login,
		}
	},
}
</script>
