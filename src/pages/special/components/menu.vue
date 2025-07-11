<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2025-07-11 17:32:48
 * @Description: 菜单
-->
<template>
  <el-menu
    router
    class="el-menu-vertical"
    :collapse="isCollapse"
    unique-opened
    :default-active="defaultActive"
  >
    <div class="logo">
      <img src="../../../assets/img/logo/logo.jpg" alt="" />
      <span class="sysName" v-if="!isCollapse">Vite2.0 + Vue3.0</span>
    </div>

    <template v-for="(item, index) in menuList" :key="index">
      <el-sub-menu :index="item.url" v-if="item.children.length">
        <template #title>
          <i :class="`icon hell${item.icon}`"></i>
          <span>{{ item.name }}</span>
        </template>

        <el-menu-item v-for="(el, i) in item.children" :index="el.url" :key="i">
          {{ el.name }}
        </el-menu-item>
      </el-sub-menu>

      <el-menu-item :index="item.url" v-else>
        <i :class="`icon hell${item.icon}`"></i>
        <template #title>{{ item.name }}</template>
      </el-menu-item>
    </template>
  </el-menu>
</template>
<script setup>
import { computed, onMounted, reactive, toRefs, watch } from 'vue'
import { menuApi } from '@/request/api/index.js'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { makeTreeData } from '@/utils/utils.js'

const router = useRouter()
const route = useRoute()
const store = useStore()

// 递归处理路由，生成菜单数据
function filterRoutes(routes) {
  return routes
    .filter(r => r.meta && r.meta.title && r.name) // 只显示有title和name的
    .map(r => ({
      name: r.name,
      path: r.path,
      title: r.meta.title,
      icon: r.meta.icon, // 如果有icon
      children: r.children ? filterRoutes(r.children) : [],
    }))
}
// 这里用 router.options.routes（如果用的是vue-router4.x的history模式，推荐用router.getRoutes()并自己处理children结构）
const menuList = computed(() => filterRoutes(router.options.routes))
const defaultActive = computed(() => route.name)
const menuInfo = reactive({
  userId: '',
})

const isCollapse = computed(() => store.state.special.isCollapse)
const isReloadMenu = computed(() => store.state.system.isReloadMenu)

const getMenuData = () => {
  // menuApi.getMenuList().then(res => {
  //   state.menuList = makeTreeData(res.data, null)
  //   store.commit('setIsReloadMenu', false)
  // })
}

watch(
  isReloadMenu,
  val => {
    if (val) {
      getMenuData()
    }
  },
  { lazy: true }
)

// 暴露给模板
</script>
<style lang="scss" scoped>
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
.logo {
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  img {
    width: 40px;
    height: 40px;
  }
  .sysName {
    height: 30px;
    line-height: 30px;
    white-space: nowrap;
    margin-left: 10px;
  }
}
</style>
