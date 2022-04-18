<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2022-04-18 18:43:35
 * @Description: 个人资料
-->
<template>
  <div class="module">
    <div class="userInfoContent">
      <el-row class="userInfo">
        <el-col :span="20">
          <el-row align="middle">
            <el-avatar :size="120" :src="user.info.avatar" @error="errorHandler">
              <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
            </el-avatar>
            <div>
              <div class="userTag">
                <span class="tags">{{ user.info.userName }}</span>
                <span class="tags">{{ user.info.gender ? '男' : '女' }}</span>
                <span class="tags">{{ user.info.birthday }}</span>
              </div>

              <div class="userTag">
                <el-tag v-for="(item, index) in user.info.tags" :key="index" class="tags">{{ item }}</el-tag>
              </div>
              <div class="userTag">
                <span class="tags">{{ user.info.userDescribe }}</span>
              </div>
            </div>
          </el-row>
        </el-col>
        <el-col :span="4">
          <el-button @click="editUserInfo">编辑资料</el-button>
        </el-col>
      </el-row>

      <div class="right">
        <div class="content">
          <div class="title">我的项目</div>
          <div v-for="(item, index) in user.info.project" :key="index" class="proItem">
            <div class="proItemTitle">
              <span>{{ item.projectName }}</span>
              <span class="proItemTime">{{ item.startTime }} - {{ item.endTime }}</span>
            </div>
            <div class="proItemCon">{{ item.projectDescribe }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { users } from '@/request/api/index.js'
const router = useRouter()
let user = reactive({
  info: {
    userId: '',
  },
})
const getUserInfo = () => {
  // 根据用户id获取用户信息
  users.getUserInfo(user.info.accountId).then((res) => {
    user.info = res.data
    user.info.tags = user.info.tags ? user.info.tags.split(',') : []
  })
}
const editUserInfo = () => {
  router.push({
    name: 'editUserInfo',
    query: {
      id: user.info.accountId,
    },
  })
}
const errorHandler = () => true
onMounted(() => {
  user.info.accountId = localStorage.getItem('userId')
  getUserInfo()
})
</script>
<style lang="scss" scoped>
.userInfoContent {
  width: 100%;
  height: calc(100% - 20px);

  .userInfo {
    padding: 20px;
    box-sizing: border-box;
    width: 100%;
    height: 160px;
    .avatar {
      width: 100%;
      height: 120px;
      background: red;
      border-radius: 50%;
    }
    .userTag {
      padding: 5px;
      width: 100%;
      height: calc(100% - 120px);
      .tags {
        margin: 5px;
      }
    }
  }
  .right {
    padding: 20px;
    width: 100%;
    .menu {
      padding: 10px;
      width: 100%;
      height: 60px;
    }
    .content {
      padding: 20px;
      width: 100%;
      height: calc(100% - 60px);
      .proItem {
        padding: 10px;
        border: 1px solid #ccc;
        box-shadow: 5px 5px 5px #cccccc;
        margin-bottom: 20px;
        color: #666666;
        .proItemTitle {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px dashed #ccc;
          padding-bottom: 10px;
          .proItemName {
            font-size: 24px;
          }
          .proItemTime {
            font-size: 12px;
            text-indent: 14px;
          }
        }

        .proItemCon {
          font-size: 14px;
          text-indent: 28px;
          padding-top: 10px;
        }
      }
    }
  }
}
</style>
