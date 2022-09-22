<!--
 * @Author: chenx
 * @Descripttion: 
 * @Date: 2022-03-28 17:41:50
 * @LastEditors: chenx
 * @LastEditTime: 2022-04-28 17:52:25
-->
<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>
<script setup>
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
const locale = zhCn
</script>
<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  background: #eee;
}
</style>
