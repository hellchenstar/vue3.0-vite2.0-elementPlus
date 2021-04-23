<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-21 13:07:24
 * @Description: 文章管理
-->
<template>
	<div class="module">
		<div class="module_header">
			<el-button type="primary" @click="addOrEdit">新增</el-button>
		</div>
		<el-table :data="dataList" style="width: 100%; margin-bottom: 20px" row-key="url" border>
			<el-table-column prop="name" label="文章名称"> </el-table-column>
			<el-table-column prop="url" label="更新时间"> </el-table-column>

			<el-table-column label="操作">
				<template #default="scope">
					<el-button @click="views(scope.row, 'add')" type="primary" size="mini">预览</el-button>
					<el-button type="primary" size="mini" @click="addOrEdit(scope.row, 'edit')">编辑</el-button>
					<!-- <el-button type="danger" size="mini">删除</el-button> -->
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>
<script>
import { reactive, toRefs } from "vue"
export default {
	setup() {
		const state = reactive({
			dataList: [],
		})
		const getArticleList = () => {}
		const addOrEdit = () => {}
		return {
			...toRefs(state),
			addOrEdit,
		}
	},
}
</script>
