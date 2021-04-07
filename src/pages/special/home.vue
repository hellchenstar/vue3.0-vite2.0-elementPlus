<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-07 19:15:52
 * @Description: file content
-->
<template>
	<div class="home">
		<Header></Header>
		<Content></Content>
		<Footer></Footer>
	</div>
</template>
<script>
import Header from "./components/header.vue"
import Content from "./components/content.vue"
import Footer from "./components/footer.vue"
export default {
	components: {
		Header,
		Content,
		Footer,
	},
}
</script>
<style lang="scss" scoped>
.home {
	width: 100%;
	height: 100%;
}
</style>
