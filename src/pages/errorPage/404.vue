<!--
 * @Author: chenx
 * @Date: 2021-01-12 14:53:19
 * @LastEditTime: 2021-01-12 14:54:12
 * @Description: file content
-->
<template>
  <div class="errPage-container">
    <el-button icon="el-icon-arrow-left" type="primary" @click="goback">
      返回
    </el-button>
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">
          Oops!
        </h1>
        gif来源<a href="https://zh.airbnb.com/" target="_blank">airbnb</a> 页面
        <h2>你跑错页面了</h2>
        <h6>仔细检查一下页面地址</h6>
      </el-col>
      <el-col :span="12">
        <img
          :src="errGif"
          width="313"
          height="428"
          alt="Girl has dropped her ice cream."
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import errGif from '@/assets/img/errImg/401.gif'
export default {
  name: 'page403',
  data() {
    return {
      errGif: errGif
    }
  },
  methods: {
    goback() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.errPage-container {
  width: 800px;
  max-width: 100%;
  margin: 50px auto;
  .pan-back-btn {
    background: #008489;
    color: #fff;
    border: none !important;
  }
  .pan-gif {
    margin: 0 auto;
    display: block;
  }
  .pan-img {
    display: block;
    margin: 0 auto;
    width: 100%;
  }
  .text-jumbo {
    font-size: 60px;
    font-weight: 700;
    color: #484848;
  }
}
</style>
