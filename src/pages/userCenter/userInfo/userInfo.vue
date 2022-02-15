<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2022-02-15 16:18:35
 * @Description: 个人资料
-->
<template>
	<div class="module">
		<div class="userInfoContent">
			<div class="left">
				<div class="avatar"></div>
				<div class="userTag">个人标签</div>
			</div>

			<div class="right">
				<div class="menu">条目</div>
				<div class="content">内容</div>
			</div>
		</div>
	</div>
</template>
<style lang="scss" scoped>
.userInfoContent {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	background: cornflowerblue;
	.left {
		padding: 20px;
		box-sizing: border-box;
		width: 160px;
		height: 100%;
		.avatar {
			width: 100%;
			height: 120px;
			background: red;
			border-radius: 50%;
		}
		.userTag {
			padding: 20px;
			width: 100%;
			height: calc(100% - 120px);
			border: 1px solid blue;
		}
	}
	.right {
		padding: 20px;
		width: calc(100% - 200px);
		height: 100%;
		.menu {
			padding: 20px;
			width: 100%;
			height: 60px;
			background: cadetblue;
		}
		.content {
			padding: 20px;
			width: 100%;
			height: calc(100% - 60px);
			background: chocolate;
		}
	}
}
</style>
