<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2025-07-11 17:04:34
 * @Description: 登录
-->
<template>
  <div class="login" :style="{ backgroundImage: `url(${loginBg})` }">
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
<script setup>
import { reactive, ref, unref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/request/api/index.js'
import loginBg from '@/assets/img/login/bg2.jpeg'

const router = useRouter()

const loginInfo = reactive({
  account: '',
  password: '',
  role: 1,
})
const loginLoading = ref(false)
const rules = reactive({
  account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      max: 16,
      min: 6,
      message: '密码长度为6-16之间',
      trigger: 'blur',
    },
  ],
})

const loginForm = ref(null)
const goLogin = () => {
  loginLoading.value = true
  const form = unref(loginForm)
  form.validate((valid) => {
    if (valid) {
      login
        .loginSub(loginInfo)
        .then((res) => {
          loginLoading.value = false
          localStorage.setItem('username', res.data.username)
          localStorage.setItem('avatar', res.data.avatar)
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('userId', res.data.id)
          router.push('home')
        })
        .catch(() => {
          loginLoading.value = false
        })
    } else {
      loginLoading.value = false
    }
  })
}
const goRegister = () => {
  router.push('register')
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
    filter: blur(20px);
    z-index: -1;
    margin: -30px;
  }
}
</style>
