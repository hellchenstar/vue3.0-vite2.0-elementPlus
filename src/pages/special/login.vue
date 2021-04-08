<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-08 18:38:33
 * @Description: 登录
-->
<template>
	<div class="login">
		<div class="loginContent">
			<el-form
				:model="loginInfo"
				:rules="rules"
				ref="loginForm"
				label-width="100px"
				class="demo-ruleForm"
			>
				<el-form-item label="账号" prop="account">
					<el-input v-model="loginInfo.account"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="loginInfo.password"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="login('loginForm')">
						登录
					</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
import { onMounted, reactive, toRefs } from 'vue'
import { useRouter, useRoute } from "vue-router"
export default {
  name:'login',
	setup() {
		const router = useRouter()
		const route = useRoute()
    const state = reactive({
      loginInfo = {
        account:'',
        password:'',
        name:''
      },
      rules:{
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min:6,max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }

        ],
      }
    })

		const login = (formName) => {
			this.$refs[formName].validate((valid) => {
				if (valid) {
          router.push(home)
          loginInfo.name = '管理员'
          localStorage.setItem('userInfo',loginInfo)
				} else {
					console.log("error submit!!")
					return false
				}
			})
		}
    onMounted(() => {
			console.log(route)
		})
		return {
      ...toRefs(state),
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
	background: #fff;
}
.loginContent {
	width: 500px;
	height: 300px;
	border: 1px solid #eee;
	border-radius: 10px;
}
</style>
