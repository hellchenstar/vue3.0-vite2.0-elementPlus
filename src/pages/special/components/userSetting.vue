<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-10-21 16:11:04
 * @Description: file content
-->
<template>
  <div class="content">
    <div class="fullscreen">
      <span style="margin-right: 20px">是否全屏</span>
      <el-switch v-model="isFull" @change="changeIsFull" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import screenfull from 'screenfull'

const isFull = ref(screenfull.isFullscreen)

function handleScreenfull() {
  if (!screenfull.isEnabled) {
    ElMessage.warning('浏览器不支持全屏！')
    return false
  }
  screenfull.toggle()
}

function changeIsFull(val) {
  if (val) {
    handleScreenfull()
  } else {
    screenfull.exit()
  }
}

function updateFullState() {
  isFull.value = screenfull.isFullscreen
}

onMounted(() => {
  window.addEventListener('resize', updateFullState)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateFullState)
})
</script>

<style lang="scss" scoped>
.content {
  padding: 0 10px;
}
</style>
