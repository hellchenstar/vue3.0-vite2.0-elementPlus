<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-26 15:25:41
 * @Description: file content
-->
<template>
	<div class="module">
		<el-row type="flex" justify="space-between">
			<el-col :span="21">
				<el-row type="flex">
					<el-col :span="6">
						<div class="search_item">
							<label>名称：</label>
							<el-input v-model="params.name"></el-input>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="search_item">
							<label>作者：</label>
							<el-input v-model="params.author"></el-input>
						</div>
					</el-col>
				</el-row>
			</el-col>
			<el-col :span="3" style="text-align: right">
				<el-button type="primary" @click="addOrEdit">新增</el-button>
			</el-col>
		</el-row>
		<el-table :data="dataList" row-key="id" border>
			<el-table-column prop="name" label="名称"> </el-table-column>
			<el-table-column prop="author" label="作者"> </el-table-column>
			<el-table-column label="操作">
				<template #default="scope">
					<el-button @click="preview(scope.row, 'add')" type="primary" size="mini">预览</el-button>
					<el-button type="primary" size="mini" @click="addOrEdit(scope.row, 'edit')">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-dialog :title="diaTitle" v-model="infoDialog">
			<el-form :model="form" ref="articleForm" :rule="rules">
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
		const formLabelWidth = "120px"
		const rules = {
			name: [{ trigger: "blur", message: "请输入名称", required: true }],
			author: [{ trigger: "blur", message: "请输入作者", required: true }],
			content: [{ trigger: "blur", message: "请输入作者", required: true }],
		}
		const state = reactive({
			dataList: [],
			params: {
				pageSize: "",
				pageNo: "",
				name: "",
			},
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
		const addOrEdit = (row) => {
			state.infoDialog = true
		}
		const preview = (row) => {}
		const closeDia = () => {
			state.infoDialog = false
		}
		const submit = () => {
			state.infoDialog = false
		}
		return {
			...toRefs(state),
			formLabelWidth,
			rules,
			addOrEdit,
			preview,
			closeDia,
			submit,
		}
	},
}
</script>
<style lang="scss" scoped>
.search_item {
	display: flex;
	align-items: center;
	margin-right: 10px;
	margin-bottom: 10px;
	label {
		width: 60px;
	}
}
</style>
