<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-08 17:31:54
 * @Description: file content
-->
<template>
	<div class="content">
		<router-view></router-view>
	</div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
.content {
	width: 100%;
	height: calc(100% - 60px);
	margin: 5px;
	padding: 5px;
	background: #fff;
}
</style>
