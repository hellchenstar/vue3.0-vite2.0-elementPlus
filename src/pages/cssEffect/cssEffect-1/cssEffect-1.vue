<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-10-21 16:10:45
 * @Description: file content
-->
<template>
	<div class="cssEffect-main">
		<div ref="stars">
			<div class="star" :style="{ top: `${randomDistance(500, -100)}px`, left: `${randomDistance(1300, 300)}px` }" v-for="item in 30" :key="item"></div>
		</div>
	</div>
</template>
<script>
import { reactive, ref, toRefs, onMounted } from "vue"
export default {
	setup() {
		const stars = ref(null)
		const state = reactive({
			list: [],
		})
		const setCssEffect = () => {
			console.log(stars)
		}
		const randomDistance = (max, min) => {
			let distance = Math.floor(Math.random() * (max - min + 1) + min)
			return distance
		}
		onMounted(() => {
			console.log(stars)
		})
		return {
			...toRefs(state),
			stars,
			randomDistance,
			setCssEffect,
		}
	},
}
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
		max-width: 1600px;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 2;
		.star {
			display: flex;
			width: 1px;
			background: transparent;
			position: relative;
			opacity: 0;
			/*过渡动画*/
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
			/*变形*/
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
				-webkit-transform: scale(0.5) translate3d(0, 0, 0);
				-moz-transform: scale(0.5) translate3d(0, 0, 0);
			}
			50% {
				opacity: 1;
				transform: translate3d(-200px, 200px, 0);
				-webkit-transform: translate3d(-200px, 200px, 0);
				-moz-transform: translate3d(-200px, 200px, 0);
			}
			100% {
				opacity: 0;
				transform: scale(1.2) translate3d(-300px, 300px, 0);
				-webkit-transform: scale(1.2) translate3d(-300px, 300px, 0);
				-moz-transform: scale(1.2) translate3d(-300px, 300px, 0);
			}
		}
	}
}
</style>
