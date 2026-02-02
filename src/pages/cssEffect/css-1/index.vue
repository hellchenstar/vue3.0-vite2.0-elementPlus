<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2022-02-26 14:28:12
 * @Description: file content
-->
<template>
  <div class="cssEffect-main">
    <div id="stars">
      <div
        v-for="item in 30"
        :key="item"
        class="star"
        :style="{
          top: `${randomDistance(500, -100)}px`,
          left: `${randomDistance(1300, 300)}px`,
        }"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const stars = ref(null)

function randomDistance(max, min) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function setCssEffect() {
  console.log('star', stars)
}

onMounted(() => {
  console.log(stars)
})
</script>

<style lang="scss" scoped>
.cssEffect-main {
  width: 100%;
  height: 100%;
  margin: 0;
  overflow: hidden;
  background: linear-gradient(rgba(0, 108, 172, 1), rgba(0, 122, 195, 0.7));
  #stars {
    margin: 0 auto;
    width: 100%;
    position: fixed;
    top: 60px;
    left: 200px;
    right: 0;
    bottom: 0;
    z-index: 2;
    .star {
      display: flex;
      width: 1px;
      background: transparent;
      position: relative;
      opacity: 0;
      animation: star-fall 3s linear infinite;
      -webkit-animation: star-fall 3s linear infinite;
      -moz-animation: star-fall 3s linear infinite;
    }
    .star:after {
      content: "";
      display: block;
      border: 0px solid #fff;
      border-width: 0px 90px 2px 90px;
      border-color: transparent transparent transparent rgba(255, 255, 255, 0.5);
      box-shadow: 0 0 1px 0 rgba(255, 255, 255, 0.1);
      transform: rotate(-45deg) translate3d(1px, 3px, 0);
      -webkit-transform: rotate(-45deg) translate3d(1px, 3px, 0);
      -moz-transform: rotate(-45deg) translate3d(1px, 3px, 0);
      transform-origin: 0% 100%;
      -webkit-transform-origin: 0% 100%;
      -moz-transform-origin: 0% 100%;
    }
    @keyframes star-fall {
      0% {
        opacity: 0;
        transform: scale(0.5) translate3d(0, 0, 0);
      }
      50% {
        opacity: 1;
        transform: translate3d(-200px, 200px, 0);
      }
      100% {
        opacity: 0;
        transform: scale(1.2) translate3d(-300px, 300px, 0);
      }
    }
  }
}
</style>
