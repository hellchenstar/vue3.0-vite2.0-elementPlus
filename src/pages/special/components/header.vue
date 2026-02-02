<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2025-07-11 17:10:55
 * @Description: file content
-->
<template>
  <div class="header">
    <div class="header_nav">
      <i
        :class="`el-icon-s-${isCollapse ? 'un' : ''}fold`"
        @click="setMenuStatus"
      ></i>
      <!--  -->
      <el-breadcrumb separator="/" style="margin-left: 10px">
        <el-breadcrumb-item v-for="item in routeList" :key="item.name">
          {{ item.meta.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="userCenter">
      <el-avatar :size="35" class="avatar" :src="avatar || defaultAvatar">
        <img :src="defaultAvatar" alt="" />
      </el-avatar>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{ userName }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="userInfo">个人资料</el-dropdown-item>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <i class="el-icon-setting setting" @click="openSetting"></i>
    </div>
    <el-drawer
      title="用户设置"
      v-model="drawer"
      :before-close="handleClose"
      destroy-on-close
    >
      <UserSetting></UserSetting>
    </el-drawer>
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import defaultAvatar from '@/assets/img/header/defaultAvatar.png'
import UserSetting from './userSetting.vue'

const router = useRouter()
const route = useRoute()
const store = useStore()

const userName = ref('')
const avatar = ref('')
const drawer = ref(false)

const isCollapse = computed(() => store.state.special.isCollapse)

const routeList = computed(() => route.matched.filter((_, index) => index !== 0))

function setMenuStatus() {
  store.commit('setIsCollapse', !isCollapse.value)
}

function getUserInfo() {
  userName.value = localStorage.getItem('username') || ''
  avatar.value = localStorage.getItem('avatar') || ''
}

function handleCommand(command) {
  if (command === 'userInfo') {
    router.push(command)
  } else {
    localStorage.clear()
    router.push('login')
  }
}

function openSetting() {
  drawer.value = true
}

function handleClose() {
  drawer.value = false
}

onMounted(() => {
  getUserInfo()
})
</script>
<style lang="scss" scoped>
.header {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .header_nav {
    display: flex;
    align-items: center;
  }
  .userCenter {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    cursor: pointer;

    .avatar {
      width: 30px;
      height: 30px;
      margin-right: 10px;
      border-radius: 50%;
    }
    .setting {
      margin-left: 10px;
    }
  }
}
</style>
