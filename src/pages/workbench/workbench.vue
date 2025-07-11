<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2025-07-11 13:49:09
 * @Description: 工作台
-->
<template>
  <div class="workbench">
    <el-carousel trigger="click" height="300px" class="carousel">
      <el-carousel-item v-for="(item, index) in imgList" :key="index">
        <img :src="item.default" alt="" />
      </el-carousel-item>
    </el-carousel>

    <div class="center">
      <div class="center_left">
        <div class="center_left_top">
          <el-avatar :size="35" class="avatar" :src="avatar">
            <img :src="defaultAvatar" />
          </el-avatar>
          <div>
            <div>
              <span style="font-weight: 600">
                {{ userName }}
              </span>
              ,祝你新的一天工作愉快
            </div>
          </div>
        </div>
        <div class="center_left_bottom">
          <div>
            <ul>
              <li
                v-for="item in eventList"
                :key="item.id"
                class="eventListItem"
              >
                <span>{{ item.title }}</span>
                <span>{{ item.updateTime }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Weather></Weather>
    </div>
    <el-row :gutter="10" class="top">
      <el-col :span="4"><div class="grid-content bg-purple">1</div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple">2</div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple">3</div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple">4</div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple">4</div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple">4</div></el-col>
    </el-row>
  </div>
</template>
<script setup>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
import defaultAvatar from '@/assets/img/header/defaultAvatar.png'
import Weather from './components/weather.vue'

const state = reactive({
  userName: '',
  avatar: '',
  currentDate: '',
  imgList: [],
  eventList: [],
})

const getEventList = () => {
  state.eventList = [
    {
      title: '今天星期一,请假',
      updateTime: '2022-03-14',
      id: 1,
    },
    {
      title: '今天星期二,休假',
      updateTime: '2022-03-15',
      id: 1,
    },
    {
      title: '今天星期三,旷工',
      updateTime: '2022-03-16',
      id: 1,
    },
    {
      title: '今天星期四,辞职',
      updateTime: '2022-03-17',
      id: 1,
    },
  ]
}

onBeforeMount(() => {
  // Vite 5 推荐用法，eager:true 立即加载所有图片模块
  const picModules = import.meta.glob('/src/assets/img/workbench/slider/*', {
    eager: true,
    import: 'default',
  })
  // picModules: { 路径: 图片url, ... }
  state.imgList = Object.entries(picModules).map(([path, url]) => ({
    default: url,
  }))
})

onMounted(() => {
  let userName = localStorage.getItem('username')
  let avatar = localStorage.getItem('avatar')
  state.userName = userName ? userName : ''
  state.avatar = avatar ? avatar : defaultAvatar
  getEventList()
})

// 使用解构赋值来暴露响应式数据
const { userName, avatar, imgList, eventList } = toRefs(state)
</script>
<style lang="scss" scoped>
.workbench {
  width: 100%;
  height: 100%;
}
.top,
.center,
.footer {
  width: 100%;
  border-radius: 10px;
}
.bg-purple {
  background: #aedadd;
}
.top {
  height: 250px;
  margin-bottom: 10px;
  .el-col {
    height: 100%;
    .grid-content {
      height: 100%;
      border-radius: 10px;
    }
  }
}
.center {
  display: flex;
  padding: 0;
  height: 286px;
  margin-bottom: 10px;
  .center_right {
    background: #fff;
  }
  .center_left {
    margin-right: 10px;
    width: calc(100% - 710px);
    height: 100%;
    background: #fff;
    border-radius: 10px;
    padding: 10px;
    .center_left_top {
      display: flex;
      align-items: center;
      height: 60px;
      border-bottom: 1px dashed #ccc;
      .el-avatar {
        margin-right: 5px;
      }
    }
    .center_left_bottom {
      width: 100%;
      height: calc(100% - 60px);
      padding: 5px 0;
      .eventListItem {
        padding: 5px 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        :nth-child(1) {
          font-size: 14px;
          color: #636363;
        }
        :nth-child(2) {
          font-size: 14px;
          color: #409eff;
        }
      }
    }
  }
}

.carousel {
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
