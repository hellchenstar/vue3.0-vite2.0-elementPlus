<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-15 17:20:47
 * @Description: file content
-->
<template>
	<div class="content">
		<div class="menuHeader">
			<el-button type="primary" @click="addOrEdit">新增模块</el-button>
		</div>
		<el-table :data="menuList" style="width: 100%; margin-bottom: 20px" row-key="url" border>
			<el-table-column prop="title" label="菜单名称"> </el-table-column>
			<el-table-column prop="url" label="菜单地址"> </el-table-column>
			<el-table-column prop="address" label="操作">
				<template #default="scope">
					<el-button @click="addOrEdit(scope.row)" type="primary" size="mini">新增菜单</el-button>
					<el-button type="primary" size="mini" @click="addOrEdit(scope.row)">编辑</el-button>
					<el-button type="danger" size="mini">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-dialog :title="title" v-model="infoDialog">
			<el-form :model="form">
				<el-form-item label="父级菜单" :label-width="formLabelWidth" v-if="showParentMenu">
					<el-select v-model="form.region" placeholder="请选择父级菜单">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="菜单名称" :label-width="formLabelWidth">
					<el-input v-model="form.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="菜单地址" :label-width="formLabelWidth">
					<el-input v-model="form.url" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="菜单图标" :label-width="formLabelWidth">
					<el-input v-model="form.icon" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="closeDia">取 消</el-button>
					<el-button type="primary" @click="submit">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>
<script>
import { reactive, toRefs, onMounted } from "vue"
import { menuApi } from "@/request/api/index.js"
export default {
	setup() {
		const state = reactive({
			menuList: [],
			title: "",
			infoDialog: false,
			form: {},
			showParentMenu: false,
			formLabelWidth: "100px",
		})
		const getMenuList = () => {
			menuApi.getMenuList().then((res) => {
				state.menuList = res.data
			})
		}
		const addOrEdit = (row) => {
			console.log(row)
			state.infoDialog = true
			if (row) {
				// 编辑
				state.title = "编辑"
			} else {
				// 新增
				state.title = "新增"
			}
			console.log(row)
		}
		const closeDia = () => {
			state.infoDialog = false
		}
		const submit = () => {
			state.infoDialog = false
		}
		onMounted(() => {
			getMenuList()
		})
		return {
			...toRefs(state),
			addOrEdit,
			closeDia,
			submit,
		}
	},
}
</script>
<style lang="scss" scoped>
.content {
	width: 100%;
	height: 100%;
	background: #fff;
	padding: 5px;
	.menuHeader {
		padding: 10px 0;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
}
</style>
