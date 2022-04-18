<!--
 * @Author: chenx
 * @Descripttion: 
 * @Date: 2022-04-13 15:34:16
 * @LastEditors: chenx
 * @LastEditTime: 2022-04-18 10:34:29
-->
<template>
  <div>
    <el-form :label-position="labelPosition" label-width="100px" :model="user.info">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="title">编辑个人信息</div>
          <el-form-item>
            <el-avatar :size="120" :src="user.info.avatar" @error="errorHandler" class="avatar">
              <el-upload action="#" list-type="picture" :auto-upload="false">
                <i class="icon hellxiangji"></i>
              </el-upload>
              <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
            </el-avatar>
          </el-form-item>
          <el-form-item label="姓名：">
            <el-input v-model="user.info.userName" />
          </el-form-item>
          <el-form-item label="性别：">
            <el-select v-model="user.info.gender" style="width: 100%">
              <el-option label="男" :value="1" />
              <el-option label="女" :value="0" />
            </el-select>
          </el-form-item>
          <el-form-item label="生日：">
            <el-date-picker v-model="user.info.birthday" type="date" @change="changeTime" value-format="YYYY-MM-DD" style="width: 100%" />
          </el-form-item>
          <el-form-item label="个人简介：">
            <el-input v-model="user.info.userDescribe" :rows="4" type="textarea" />
          </el-form-item>
          <el-form-item label="个人标签：">
            <el-input v-model="appendTag">
              <template #append>
                <el-button @click="addTag(appendTag)" type="primary">
                  <i class="icon helltianjia"></i>
                </el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-tag v-for="(item, index) in user.info.tags" :key="index" closable @close="closeTag(index)" class="tagItem">{{ item }}</el-tag>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <div class="title">我的项目</div>
          <template v-for="item in user.info.project">
            <el-row>
              <el-col :span="8">
                <el-form-item label-width="0">
                  <el-input v-model="item.name" />
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label-width="10px">
                  <el-input v-model="item.describe" type="textarea" />
                </el-form-item>
              </el-col>
            </el-row>
          </template>
          <el-button>添加项目</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { users } from '@/request/api/index.js'
const route = useRoute()
const labelPosition = ref('right')

// 当前登录人的信息
const user = reactive({
  info: {
    userName: '',
    gender: 1,
    birthday: '',
    userId: '',
    tag: [],
    userDescribe: '',
    project: [],
  },
})
let appendTag = ref('')

// 获取个人信息
const getUserInfo = () => {
  //
  let id = route.query.id
  users.getUserInfo(id).then((res) => {
    user.info = res.data
    user.info.tags = user.info.tags ? user.info.tags.split(',') : []
    console.log(user.info)
  })
}
const closeTag = (index) => {
  user.info.tags.splice(index, 1)
  appendTag.value = ''
}
const addTag = (val) => {
  user.info.tags.push(val)
}
const changeTime = (val) => {
  console.log(val)
}
const errorHandler = () => true
onMounted(() => {
  getUserInfo()
})
</script>
<style lang="scss" scoped>
.tagItem {
  margin: 5px;
}
:deep(.el-input-group__append) {
  background-color: dodgerblue;
  color: #fff;
}

.avatar {
  width: 120px;
  height: 120px;
  border: 1px dashed #999;
  border-radius: 50%;
  position: relative;
  &:hover {
    :deep(.el-upload) {
      display: block;
    }
  }
  :deep(.el-upload) {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    position: absolute;
    bottom: 0;
    right: 0;
    opacity: 0.8;
    background: #333333;
    display: none;
    line-height: 120px;
    .hellxiangji {
      color: #fff;
      font-size: 40px;
    }
  }
}
</style>
