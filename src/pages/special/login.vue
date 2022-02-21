<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2022-02-21 23:33:18
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
          <el-input
            v-model="loginInfo.account"
            @keyup.enter="goLogin"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginInfo.password"
            show-password
            @keyup.enter="goLogin"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :loading="loginLoading"
            @click="goLogin"
            style="width: 45%"
          >
            登录
          </el-button>
          <el-button type="primary" @click="goRegister" style="width: 45%">
            注册
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs, onMounted, ref, unref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/request/api/index.js'
export default {
  name: 'login',
  setup() {
    const router = useRouter()
    // ref等同于vue2.0中的this.$refs，获取 ref 对象

    const state = reactive({
      loginInfo: {
        account: '',
        password: '',
        role: 1,
      },
      loginLoading: false,
      rules: {
        account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { max: 16, min: 6, message: '密码长度为6-16之间', trigger: 'blur' },
        ],
      },
    })
    // 登录逻辑
    const loginForm = ref(null)
    const goLogin = () => {
      state.loginLoading = true
      // 如果参数是一个 ref，则返回内部值，否则返回参数本身。这是 val = isRef(val) ? val.value : val 的语法糖函数。
      const form = unref(loginForm)
      form.validate((valid) => {
        if (valid) {
          login
            .loginSub(state.loginInfo)
            .then((res) => {
              state.loginLoading = false
              localStorage.setItem('username', res.data.username)
              localStorage.setItem('avatar', res.data.avatar)
              localStorage.setItem('token', res.data.token)
              localStorage.setItem('userId', res.data.id)
              router.push('home')
            })
            .catch((err) => {
              state.loginLoading = false
              console.log(err)
            })
          //
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
    const goRegister = () => {
      router.push('register')
    }
    onMounted(() => {})
    return {
      ...toRefs(state),
      loginForm,
      goLogin,
      goRegister,
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
  background: url('@/assets/img/login/bg2.jpeg') no-repeat;
  background-size: 100% 100%;
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
  // 添加css 毛玻璃效果
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    // 这里很重要
    filter: blur(20px);
    z-index: -1;
    margin: -30px;
  }
}
</style>
