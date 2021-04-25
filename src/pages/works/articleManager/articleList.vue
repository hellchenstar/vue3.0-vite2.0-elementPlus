<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-25 17:13:50
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
		<el-dialog :title="diaTitle" v-model="infoDialog">
			<el-form :model="form" ref="articleForm">
				<el-form-item label="文章标题" :label-width="formLabelWidth">
					<el-input v-model="form.title"></el-input>
				</el-form-item>
				<el-form-item label="作者" :label-width="formLabelWidth">
					<el-input v-model="form.author"></el-input>
				</el-form-item>
				<el-form-item label="签名" :label-width="formLabelWidth">
					<el-input v-model="form.sign"></el-input>
				</el-form-item>
				<el-form-item label="文章内容" :label-width="formLabelWidth">
					<el-input v-model="form.content"></el-input>
				</el-form-item>
				<el-form-item :label-width="formLabelWidth">
					<el-button @click="closeDia">取 消</el-button>
					<el-button type="primary" @click="submit" :loading="submitLoading">确 定</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>
<script>
import { reactive, toRefs } from "vue"
export default {
	setup() {
		const formLabelWidth = "100px"
		const state = reactive({
			dataList: [],
			diaTitle: "",
			infoDialog: false,
			submitLoading: false,
			form: {
				title: "",
				author: "",
				sign: "",
				content: "",
			},
		})
		const getArticleList = () => {}
		const addOrEdit = () => {
			state.infoDialog = true
		}
		const closeDia = () => {
			state.infoDialog = false
		}
		const submit = () => {
			state.infoDialog = false
		}
		return {
			...toRefs(state),
			addOrEdit,
			formLabelWidth,
			getArticleList,
			closeDia,
		}
	},
}
</script>
