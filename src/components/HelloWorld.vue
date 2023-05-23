

<template>
  <h1 color="$ep-color-primary">{{ msg }}</h1>
  <!-- example components -->
  <div class="mb-4">
    <el-button size="large" @click="toast">El Message</el-button>
  </div>

  <div class="my-2 text-center flex flex-wrap justify-center items-center">
    <el-button @click="count++">count is: {{ count }}</el-button>
    <el-button type="primary" @click="count++">count is: {{ count }}</el-button>
    <el-button type="success" @click="count++">count is: {{ count }}</el-button>
    <el-button type="warning" @click="count++">count is: {{ count }}</el-button>
    <el-button type="danger" @click="count++">count is: {{ count }}</el-button>
    <el-button type="info" @click="count++">count is: {{ count }}</el-button>
  </div>

  <div>
    <el-tag type="success" class="m-1">Tag 1</el-tag>
    <el-tag type="warning" class="m-1">Tag 1</el-tag>
    <el-tag type="danger" class="m-1">Tag 1</el-tag>
    <el-tag type="info" class="m-1">Tag 1</el-tag>
  </div>

  <div class="my-2">
    <el-input class="m-2" v-model="input" style="width: 200px" />
    <el-date-picker
      class="m-2"
      v-model="curDate"
      type="date"
      placeholder="Pick a day"
    ></el-date-picker>
  </div>



</template>
<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";

defineProps<{ msg: string }>();

const count = ref(0);
const input = ref("element-plus");

const curDate = ref("");

const toast = () => {
  ElMessage.success("Hello");
};
</script>
<style>
.ep-button {
  margin: 4px;
}
.ep-button + .ep-button {
  margin-left: 0;
  margin: 4px;
}
</style>
