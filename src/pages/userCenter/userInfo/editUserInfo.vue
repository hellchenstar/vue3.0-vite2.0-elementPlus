<!--
 * @Author: chenx
 * @Descripttion: 
 * @Date: 2022-04-13 15:34:16
 * @LastEditors: chenx
 * @LastEditTime: 2022-04-19 18:30:12
-->
<template>
  <div class="">
    <el-form ref="userInfoForm" :label-position="labelPosition" label-width="100px" :model="user.info" class="form" :rules="rules">
      <el-row class="handleFormBtn" justify="end">
        <el-button type="primary" @click="submit('formEl')">提交</el-button>
        <el-button @click="$router.push('userInfo')">取消</el-button>
      </el-row>
      <el-row :gutter="20" class="formContent">
        <el-col :span="8">
          <div class="title">编辑个人信息</div>
          <el-form-item>
            <el-avatar :size="120" :src="user.info.avatar" @error="errorHandler" class="avatar">
              <el-upload action="" :http-request="uploadAvatar" list-type="picture" :before-upload="beforeUpload" accept="png,jpeg,jpg,gif" :auto-upload="false">
                <i class="icon hellxiangji"></i>
              </el-upload>
              <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
            </el-avatar>
          </el-form-item>
          <el-form-item label="姓名：" prop="userName">
            <el-input v-model="user.info.userName" />
          </el-form-item>
          <el-form-item label="性别：" prop="gender">
            <el-select v-model="user.info.gender" style="width: 100%">
              <el-option label="男" :value="1" />
              <el-option label="女" :value="0" />
            </el-select>
          </el-form-item>
          <el-form-item label="生日：" prop="birthday">
            <el-date-picker v-model="user.info.birthday" type="date" value-format="YYYY-MM-DD" style="width: 100%" />
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
          <template v-for="(item, index) in user.info.project">
            <div class="proItem" v-if="item.disabled">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="项目名称：" label-width="140px" :prop="`project.${index}.projectName`" :rules="[{ required: true, message: '请输入项目名称', trigger: 'blur' }]">
                    <el-input v-model="item.projectName" />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-row>
                    <el-col :span="24">
                      <el-row justify="start">
                        <el-form-item label="项目起止时间：" label-width="140px" :prop="`project.${index}.startTime`" :rules="[{ required: true, validator: validateTime, trigger: 'change' }]">
                          <el-date-picker v-model="item.startTime" type="date" value-format="YYYY-MM-DD" />
                        </el-form-item>
                        <span style="margin: 0 10px">-</span>
                        <el-form-item label-width="0" :prop="`project.${index}.endTime`" :rules="[{ required: true, validator: validateTime, trigger: 'change' }]">
                          <el-date-picker v-model="item.endTime" type="date" value-format="YYYY-MM-DD" />
                        </el-form-item>
                      </el-row>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="项目描述：" label-width="140px" :prop="`project.${index}.projectDescribe`" :rules="[{ required: true, message: '请输入项目描述', trigger: 'blur' }]">
                    <el-input v-model="item.projectDescribe" type="textarea" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row justify="end">
                <el-button type="danger" @click="delProItem(item)">删除该项目</el-button>
              </el-row>
            </div>
          </template>
          <el-button type="primary" @click="addProItem">添加项目</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref, unref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { users } from '@/request/api/index.js'
import { ElMessage } from 'element-plus'
const route = useRoute()
const router = useRouter()
const labelPosition = ref('right')

// 表单信息
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
// 表单规则
const rules = reactive({
  userName: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  gender: [{ required: true, message: '请输入名称', trigger: 'change' }],
  birthday: [{ required: true, message: '请输入名称', trigger: 'change' }],
})
const validateTime = (rule, value, callback) => {
  let name = rule.field.split('.')[2]
  let msg = ''
  if (name === 'startTime') {
    msg = '请选择开始时间'
  } else {
    msg = '请选择结束时间'
  }
  if (!value) {
    callback(new Error(msg))
  } else {
    callback()
  }
}
//取个人信息 ======================================================================================================
// 加载失败或者无头像是否显示默认头像
const errorHandler = () => true

// 获取个人信息
const getUserInfo = () => {
  //
  let id = route.query.id
  users.getUserInfo(id).then((res) => {
    user.info = res.data
    user.info.tags = user.info.tags ? user.info.tags.split(',') : []
  })
}
// 删除标签
const closeTag = (index) => {
  user.info.tags.splice(index, 1)
  appendTag.value = ''
}
// 添加标签
const addTag = (val) => {
  user.info.tags.push(val)
}

// 项目 ======================================================================================================
const addProItem = () => {
  let obj = {
    name: '',
    startTime: '',
    endTime: '',
    userDescribe: '',
    disabled: 1,
    userId: route.query.id,
  }
  user.info.project.push(obj)
}
// 删除项目
const delProItem = (item) => {
  item.disabled = 0
}
// 文件上传逻辑======================================================================================================
const beforeUpload = (file) => {
  console.log(file)
}
const uploadAvatar = (data) => {
  console.log(data)
}
// 提交 ======================================================================================================
const userInfoForm = ref(null) //需要根据ref实例化一个form实例

const submit = () => {
  const formEl = unref(userInfoForm)
  formEl.validate((valid) => {
    if (valid) {
      users.updateUserInfo(user.info).then((res) => {
        ElMessage.success('更新成功')
        router.push('userInfo')
      })
    } else {
      return false
    }
  })
}

onMounted(() => {
  getUserInfo()
})
</script>
<style lang="scss" scoped>
.form {
  position: relative;
}
.handleFormBtn {
  position: fixed;
  width: calc(100% - 205px);
  top: 55px;
  right: 0;
  background: #fff;
  padding: 10px 10px;
  z-index: 999;
  border-bottom: 1px solid #ccc;
}
.formContent {
  margin-top: 60px;
}
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
.proItem {
  padding: 10px;
  border: 1px solid #ccc;
  box-shadow: 5px 5px 5px #cccccc;
  margin-bottom: 20px;
  color: #666666;
}
</style>
