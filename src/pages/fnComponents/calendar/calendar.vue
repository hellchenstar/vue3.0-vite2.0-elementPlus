<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-09-27 16:09:08
 * @Description: file content
-->
<template>
  <div class="module">
    <Calendar style="height: 85%" @getCurrentDate="getCurrentDate">
      <template #last>上个月</template>
      <template #now>这个月</template>
      <template #next>下个月</template>
    </Calendar>
    <div>点击日期返回: {{ date }}</div>
    <div>当前日期: {{ `${date.year} - ${date.month} - ${date.day}` }}</div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import Calendar from '@/components/calendar.vue'

const date = reactive({
  year: '',
  month: '',
  day: '',
})

function getCurrentDate(val) {
  if (val) Object.assign(date, val)
}

onMounted(() => {
  getCurrentDate()
})
</script>
