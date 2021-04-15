<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-15 20:48:32
 * @Description: file content
-->
<template>
	<div class="content">
		<div class="menuHeader">
			<el-button type="primary" @click="addOrEdit">新增模块</el-button>
		</div>
		<el-table :data="menuList" style="width: 100%; margin-bottom: 20px" row-key="url" border>
			<el-table-column prop="name" label="菜单名称"> </el-table-column>
			<el-table-column prop="url" label="菜单地址"> </el-table-column>
			<el-table-column label="操作">
				<template #default="scope">
					<el-button @click="addOrEdit(scope.row, 'add')" type="primary" size="mini">新增菜单</el-button>
					<el-button type="primary" size="mini" @click="addOrEdit(scope.row, 'edit')">编辑</el-button>
					<el-button type="danger" size="mini">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-dialog :title="title" v-model="infoDialog">
			<el-form :model="menuInfo" ref="menuForm">
				<el-form-item label="父级菜单" :label-width="formLabelWidth" v-if="showParentMenu">
					<el-select v-model="menuInfo.parentId" placeholder="请选择父级菜单">
						<el-option v-for="item in menuList" :key="item.url" :label="item.name" :value="item._id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="菜单名称" :label-width="formLabelWidth">
					<el-input v-model="menuInfo.name"></el-input>
				</el-form-item>
				<el-form-item label="菜单地址" :label-width="formLabelWidth">
					<el-input v-model="menuInfo.url" :disabled="urlDisabled"></el-input>
				</el-form-item>
				<el-form-item label="菜单图标" :label-width="formLabelWidth">
					<el-input v-model="menuInfo.icon" :disabled="iconDisabled"></el-input>
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
import { reactive, toRefs, onMounted, ref, unref } from "vue"
import { menuApi } from "@/request/api/index.js"
import { ElMessage } from "element-plus"
export default {
	setup() {
		// 登录逻辑

		const state = reactive({
			menuList: [],
			title: "",
			infoDialog: false,
			menuInfo: {
				id: "",
				parentId: "",
				name: "",
				url: "",
				icon: "",
			},
			submitLoading: false,
			iconDisabled: false,
			urlDisabled: false,
			showParentMenu: false,
			formLabelWidth: "100px",
		})
		const getMenuList = () => {
			menuApi.getMenuList().then((res) => {
				state.menuList = res.data
			})
		}
		const addOrEdit = (row, type) => {
			console.log(row._id)
			state.infoDialog = true
			if (row) {
				if (type === "add") {
					state.title = "新增菜单"
					state.showParentMenu = true
					state.urlDisabled = false
					state.iconDisabled = true
					state.menuInfo = {
						parentId: row._id,
						id: "",
						name: "",
						url: "",
						icon: "",
						level: 2,
					}
				} else {
					state.title = "编辑菜单"
					state.showParentMenu = false
					state.menuInfo = {
						parentId: row.parentId,
						id: row._id,
						name: row.name,
						url: row.url,
						icon: row.icon,
						level: row.level,
					}
				}
			} else {
				state.showParentMenu = false
				state.iconDisabled = false
				state.urlDisabled = false
				// 新增
				state.title = "新增模块"
				state.menuInfo = {
					id: "",
					parentId: "",
					name: "",
					url: "",
					icon: "",
					level: 1,
				}
			}
		}
		const closeDia = () => {
			state.infoDialog = false
			state.submitLoading = true
		}

		const menuForm = ref(null)
		const submit = () => {
			let str = state.menuInfo.id ? "editMenu" : "addMenu"
			state.submitLoading = true
			const form = unref(menuForm)
			form.validate((valid) => {
				if (valid) {
					menuApi[str](state.menuInfo)
						.then((res) => {
							state.infoDialog = false
							state.submitLoading = false
							ElMessage.success("新增成功")
							getMenuList()
						})
						.catch((err) => {
							state.infoDialog = false
							state.submitLoading = false
						})
					//
				} else {
					console.log("error submit!!")
					return false
				}
			})
		}
		onMounted(() => {
			getMenuList()
		})
		return {
			...toRefs(state),
			menuForm,
			getMenuList,
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
