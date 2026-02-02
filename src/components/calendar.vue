<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-10-21 16:10:44
 * @Description: 日期组件
-->
<template>
  <div class="module">
    <div class="canlendarPanel">
      <div class="canlendar-header">
        <p class="pre">
          <span @click="changeDate('preYear')">
            <i class="el-icon-d-arrow-left" name="preYear" />
          </span>
          <span @click="changeDate('preMonth')">
            <i class="el-icon-arrow-left" name="preMonth" />
          </span>
        </p>
        <p class="currenDate">{{ `${year}年${month}月` }}</p>
        <p class="next">
          <span @click="changeDate('nextMonth')">
            <i class="el-icon-arrow-right" name="nextMonth" />
          </span>
          <span @click="changeDate('nextYear')">
            <i class="el-icon-d-arrow-right" name="nextYear" />
          </span>
        </p>
      </div>
      <div class="canlendar-main">
        <ul class="main-header">
          <li v-for="(item, index) in weekArr" :key="index">{{ item }}</li>
        </ul>
        <ul class="main">
          <li
            v-for="inx in weekDay"
            :key="'pre-' + inx"
            class="ohterMonth"
            :class="{ avtive: inx === day }"
            @click="clickDate(year, month - 1, preMonthSize() - weekDay + inx)"
          >
            <div>{{ preMonthSize() - weekDay + inx }}</div>
            <slot name="last" />
          </li>
          <li
            v-for="item in monthList[month - 1]"
            :key="item"
            class="currentMonth"
            :class="{ currentDay: item === day }"
            @click="clickDate(year, month, item)"
          >
            <div class="currentMonthDay">{{ item }}</div>
            <slot name="now" />
          </li>
          <li
            v-for="index in lastWeekDay"
            :key="'next-' + index"
            class="ohterMonth"
            @click="clickDate(year, month + 1, index)"
          >
            <div>{{ index }}</div>
            <slot name="next" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, toRefs, onBeforeMount } from 'vue'

const emit = defineEmits(['getCurrentDate'])

const state = reactive({
  weekArr: ['日', '一', '二', '三', '四', '五', '六'],
  monthList: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  weekDay: 0,
  lastWeekDay: 0,
  year: '',
  month: '',
  day: '',
})

const { weekArr, monthList, weekDay, lastWeekDay, year, month, day } = toRefs(state)

function preMonthSize() {
  return state.month - 1 === 0 ? 31 : state.monthList[state.month - 2]
}

function getWeekDay(y, m, d) {
  return new Date(`${y}/${m}/${d}`).getDay()
}

function getCurrentDate() {
  const date = new Date()
  state.year = date.getFullYear()
  state.month = date.getMonth() + 1
  state.day = date.getDate()
  emit('getCurrentDate', {
    year: state.year,
    month: state.month,
    day: state.day,
  })
}

function initDate() {
  if ((state.year % 4 === 0 && state.year % 100 !== 0) || state.year % 400 === 0) {
    state.monthList[1] = 29
  } else {
    state.monthList[1] = 28
  }
  const firstDay = getWeekDay(state.year, state.month, 1)
  state.weekDay = firstDay === 7 ? 0 : firstDay
  const remineDay = getWeekDay(state.year, state.month, state.monthList[state.month - 1])
  state.lastWeekDay = remineDay === 7 ? 6 : 6 - remineDay
}

function changeDate(type) {
  switch (type) {
    case 'preYear':
      state.year -= 1
      break
    case 'preMonth':
      if (state.month === 1) {
        state.month = 12
        state.year -= 1
      } else {
        state.month -= 1
      }
      break
    case 'nextYear':
      state.year += 1
      break
    case 'nextMonth':
      if (state.month === 12) {
        state.month = 1
        state.year += 1
      } else {
        state.month += 1
      }
      break
    default:
      break
  }
  initDate()
}

function clickDate(y, m, d) {
  emit('getCurrentDate', { year: y, month: m, day: d })
}

onBeforeMount(() => {
  getCurrentDate()
  initDate()
})
</script>

<style lang="scss" scoped>
li {
  list-style: none;
  text-align: center;
  border: 1px solid #eee;
}
.canlendarPanel {
  width: 100%;
  height: 100%;
  border-bottom: 3px solid #eee;
  display: flex;
  flex-direction: column;
  .canlendar-header {
    line-height: 40px;
    height: 40px;
    background: #eee;
    display: flex;
    flex-direction: row;
    justify-content: center;
    .currenDate {
      margin: 0 20px;
      font-size: 16px;
    }
    .icon {
      width: 12px;
      height: 12px;
    }
  }
  .canlendar-main {
    height: calc(100% - 40px);
    flex: 1;
    display: flex;
    flex-direction: column;
    .main-header {
      height: 40px;
      display: flex;
      line-height: 40px;
      color: #333;
      li {
        flex: 1;
      }
    }
    ul.main {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      padding-bottom: 10px;
      font-size: 14px;
      li {
        height: 80px;
        width: calc(100% / 7);
        position: relative;
        line-height: 25px;
        cursor: pointer;
        color: #666;
        padding: 5px;
      }
      li:hover {
        background: #bfe8ff;
      }
      .currentMonth {
        background: #ecfcff;
        .currentMonthDay {
          font-size: 20px;
          font-weight: 600;
        }
      }
      .ohterMonth {
        background: rgb(255, 255, 255);
        cursor: default;
      }
      .currentDay {
        background: #bfe8ff;
      }
    }
  }
}
</style>
