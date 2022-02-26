<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2022-02-26 14:22:13
 * @Description: file content
-->
<template>
  <div class="module">
    <div class="module_header">
      <el-button type="primary" @click="addOrEdit()">新增模块</el-button>
    </div>
    <el-table
      :data="menuList"
      style="width: 100%; margin-bottom: 20px"
      row-key="url"
      border
    >
      <el-table-column prop="name" label="菜单名称"> </el-table-column>
      <el-table-column prop="url" label="菜单地址"> </el-table-column>
      <el-table-column prop="icon" label="菜单图标">
        <template #default="scope">
          <i :class="`icon hell${scope.row.icon}`"> </i>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            v-if="scope.row.level === 1"
            @click="addOrEdit(scope.row, 'add')"
            type="primary"
            size="mini"
            >新增菜单</el-button
          >
          <el-button
            type="primary"
            size="mini"
            @click="addOrEdit(scope.row, 'edit')"
            >编辑</el-button
          >
          <el-button type="danger" size="mini" @click="delMenu(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="title" v-model="infoDialog">
      <el-form :model="menuInfo" ref="menuForm">
        <el-form-item
          label="父级菜单"
          :label-width="formLabelWidth"
          v-if="showParentMenu"
        >
          <el-select v-model="menuInfo.parentId" placeholder="请选择父级菜单">
            <el-option
              v-for="item in menuList"
              :key="item.url"
              :label="item.name"
              :value="item.id"
            ></el-option>
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
          <el-button type="primary" @click="submit" :loading="submitLoading"
            >确 定</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { reactive, toRefs, onMounted, ref, unref } from 'vue'
import { useStore } from 'vuex'
import { menuApi } from '@/request/api/index.js'
import { ElMessage } from 'element-plus'
import { makeTreeData } from '@/utils/utils.js'
export default {
  setup() {
    // 登录逻辑

    const state = reactive({
      menuList: [],
      title: '',
      infoDialog: false,
      menuInfo: {
        id: '',
        parentId: '',
        name: '',
        url: '',
        icon: '',
        level: 1,
      },
      submitLoading: false,
      iconDisabled: false,
      urlDisabled: false,
      showParentMenu: false,
      formLabelWidth: '100px',
    })
    // 更新菜单

    const getMenuList = () => {
      menuApi.getMenuList().then((res) => {
        state.menuList = makeTreeData(res.data, null)
      })
    }
    // 新增、编辑
    const addOrEdit = (row, type) => {
      state.infoDialog = true
      if (row) {
        if (type === 'add') {
          state.title = '新增菜单'
          state.showParentMenu = true
          state.urlDisabled = false
          state.iconDisabled = true
          state.menuInfo = {
            parentId: row.id,
            id: '',
            name: '',
            url: '',
            icon: '',
            level: 2,
          }
        } else {
          state.title = '编辑菜单'
          state.showParentMenu = false
          state.iconDisabled = false
          state.menuInfo = {
            parentId: row.parentId,
            id: row.id,
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
        state.title = '新增模块'
        state.menuInfo = {
          id: '',
          parentId: '',
          name: '',
          url: '',
          icon: '',
          level: 1,
        }
      }
    }
    const delMenu = (id) => {
      menuApi.delMenu(id).then((res) => {
        if (res.code === 200) {
          ElMessage.success(res.msg)
          getMenuList()
          // 更新左侧菜单
          setIsReloadMenu()
        }
      })
    }
    const closeDia = () => {
      state.infoDialog = false
      state.submitLoading = false
    }
    // 更新左侧菜单
    const vuex = useStore()
    const setIsReloadMenu = () => {
      vuex.commit('setIsReloadMenu', true)
    }
    const menuForm = ref(null)
    const submit = () => {
      let str = state.menuInfo.id ? 'editMenu' : 'addMenu'
      state.submitLoading = true
      const form = unref(menuForm)
      form.validate((valid) => {
        if (valid) {
          menuApi[str](state.menuInfo)
            .then((res) => {
              state.infoDialog = false
              state.submitLoading = false
              ElMessage.success(res.msg)
              getMenuList()
              // 更新左侧菜单
              setIsReloadMenu()
            })
            .catch((err) => {
              state.infoDialog = false
              state.submitLoading = false
            })
          //
        } else {
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
      delMenu,
      closeDia,
      submit,
    }
  },
}
</script>
