<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-09 11:55:08
 * @Description: 登录
-->
<template>
	<div class="login">
		<div class="loginContent">
			<el-form
				:model="loginInfo"
				:rules="rules"
				ref="loginForm"
				label-width="60px"
				class="demo-ruleForm"
			>
				<el-form-item label="账号" prop="account">
					<el-input v-model="loginInfo.account"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="loginInfo.password" show-password></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="login" style="width: 100%">
						登录
					</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
import { reactive, toRefs, onMounted, ref, unref } from "vue"
import { useRouter } from "vue-router"
export default {
	name: "login",
	setup() {
		const router = useRouter()
		// ref等同于vue2.0中的this.$refs，获取 ref 对象
		const loginForm = ref(null)
		const state = reactive({
			loginInfo: {
				account: "admin",
				password: "123456",
				name: "",
			},
			rules: {
				account: [{ required: true, message: "请输入账号", trigger: "blur" }],
				password: [
					{ required: true, message: "请输入密码", trigger: "blur" },
					{ max: 16, min: 6, message: "密码长度为6-16之间", trigger: "blur" },
				],
			},
		})

		const login = () => {
			// unref
			// 如果参数是一个 ref，则返回内部值，否则返回参数本身。这是 val = isRef(val) ? val.value : val 的语法糖函数。
			const form = unref(loginForm)
			form.validate((valid) => {
				if (valid) {
					state.loginInfo.name = "超级管理员"
					localStorage.setItem("userInfo", JSON.stringify(state.loginInfo))
					router.push("home")
				} else {
					console.log("error submit!!")
					return false
				}
			})
		}
		onMounted(() => {})
		return {
			...toRefs(state),
			loginForm,
			login,
		}
	},
}
</script>
<style lang="scss" scoped>
.login {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #ecf5ff;
}
.loginContent {
	width: 500px;
	height: 300px;
	background: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid #eee;
	border-radius: 10px;
	box-shadow: 5px 5px 5px rgba(238, 238, 238, 0.5);
}
</style>
