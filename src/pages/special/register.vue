<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-14 17:51:57
 * @Description: 注册
-->
<template>
	<div class="register">
		<div class="form">
			<el-form :model="registerInfo" :rules="rules" ref="registerForm" label-width="100px">
				<el-form-item label="账号" prop="userName">
					<el-input v-model="registerInfo.userName"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="registerInfo.password" type="password"></el-input>
				</el-form-item>
				<el-form-item label="联系电话" prop="phone">
					<el-input v-model="registerInfo.phone"></el-input>
				</el-form-item>
				<el-form-item label="真实姓名" prop="realName">
					<el-input v-model="registerInfo.realName"></el-input>
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
				userName: "",
				password: "",
				phone: "",
				realName: "",
			},
			rules: {
				userName: [{ required: true, message: "请输入账号", trigger: "blur" }],
				password: [{ required: true, message: "请输入密码", trigger: "blur" }],
				phone: [{ required: true, message: "请输入联系电话", trigger: "blur" }],
				realName: [{ required: true, message: "请输入真实姓名", trigger: "blur" }],
			},
		})
		const goRegister = () => {
			const form = unref(registerForm)
			form.validate((valid) => {
				if (valid) {
					login.register(state.registerInfo).then((res) => {
						// if(res)
						console.log(res)
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
	}
}
</style>
