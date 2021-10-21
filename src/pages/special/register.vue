<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-10-21 16:10:48
 * @Description: 注册
-->
<template>
	<div class="register">
		<div class="form">
			<el-form :model="registerInfo" :rules="rules" ref="registerForm" label-width="100px">
				<el-form-item label="账号" prop="account">
					<el-input v-model="registerInfo.account"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="registerInfo.password" type="password"></el-input>
				</el-form-item>

				<el-form-item label="用户昵称" prop="username">
					<el-input v-model="registerInfo.username"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="goRegister"> 注册 </el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
import { reactive, ref, toRefs, unref } from "vue"
import { useRouter } from "vue-router"
import { login } from "@/request/api/index.js"
export default {
	setup() {
		const router = useRouter()
		const registerForm = ref(null)
		const state = reactive({
			registerInfo: {
				username: "",
				password: "",
				role: 1,
				account: "",
			},
			rules: {
				account: [{ required: true, message: "请输入账号", trigger: "blur" }],
				password: [{ required: true, message: "请输入密码", trigger: "blur" }],
				username: [{ required: true, message: "请输入用户名称", trigger: "blur" }],
			},
		})
		const goRegister = () => {
			const form = unref(registerForm)
			form.validate((valid) => {
				if (valid) {
					login.register(state.registerInfo).then((res) => {
						router.push("login")
					})
				}
			})
		}
		return {
			...toRefs(state),
			registerForm,
			goRegister,
		}
	},
}
</script>
<style lang="scss" scoped>
.register {
	width: 100%;
	height: 100%;
	background: #fff;
	display: flex;
	justify-content: center;
	.form {
		width: 600px;
		margin: 50px 100px;
		border: 1px solid #efefef;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
</style>
