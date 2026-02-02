<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2024-02-27 11:22:27
 * @Description: 注册
-->
<template>
  <div class="register">
    <div class="form">
      <el-form :model="registerInfo" :rules="rules" ref="registerFormRef" label-width="100px">
        <el-form-item label="账号" prop="account">
          <el-input v-model="registerInfo.account" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerInfo.password" type="password" />
        </el-form-item>
        <el-form-item label="用户昵称" prop="username">
          <el-input v-model="registerInfo.username" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="goRegister">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, unref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/request/api/index'

const router = useRouter()
const registerFormRef = ref(null)

const registerInfo = reactive({
  username: '',
  password: '',
  role: 1,
  account: '',
})

const rules = reactive({
  account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  username: [{ required: true, message: '请输入用户名称', trigger: 'blur' }],
})

function goRegister() {
  const form = unref(registerFormRef)
  form?.validate((valid) => {
    if (valid) {
      login.register(registerInfo).then(() => {
        router.push('login')
      })
    }
  })
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
