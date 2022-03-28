<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2022-03-28 17:46:52
 * @Description: file content
-->
<template>
  <div class="allContent">
    <Menu />
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <Container />
      </el-main>
    </el-container>
  </div>
</template>
<script>
import Header from './components/header.vue'
import Container from './components/content.vue'
import Menu from './components/menu.vue'

export default {
  components: {
    Menu,
    Header,
    Container,
  },
}
</script>
<style lang="scss" scoped>
.allContent {
  width: 100%;
  height: 100%;
  display: flex;
  .el-container {
    width: calc(100% - 220px);
    height: 100%;
    .el-header {
      height: 50px !important;
      background: #fff;
    }
    .el-main {
      width: 100%;
      margin: 5px;
      padding: 10px;
      background: #fff;
      height: calc(100% - 50px);
    }
  }
}
</style>
