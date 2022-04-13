<!--
 * @Author: chenx
 * @Descripttion: 
 * @Date: 2022-04-13 15:34:16
 * @LastEditors: chenx
 * @LastEditTime: 2022-04-13 20:41:56
-->
<template>
  <div>编辑个人信息</div>
  <div>
    <el-form>
      <el-form-item>
        <el-input v-model="user.info.name"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { users } from '@/request/api/index.js'
const route = useRoute()

// 当前登录人的信息
const user = reactive({
  info: {
    username: '',
    gender: 1,
    birthday: '',
    userId: '',
    tag: [],
    describe: '',
  },
})

// 获取个人信息
const getUserInfo = () => {
  //
  let id = route.query.id
  users.getUserInfo(id).then((res) => {
    console.log(res)
    user.info = res.data
  })
}
onMounted(() => {
  getUserInfo()
})
</script>
