<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2022-03-28 18:03:22
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
      <el-table-column prop="name" label="菜单名称" />
      <el-table-column prop="url" label="菜单地址" />
      <el-table-column prop="isDel" label="禁用状态">
        <template #default="scope">
          <el-tag :type="scope.row.disabled ? 'success' : 'danger'">
            {{ scope.row.disabled ? '已启用' : '已禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="icon" label="菜单图标">
        <template #default="scope">
          <i :class="`icon hell${scope.row.icon}`" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            v-if="scope.row.level === 1"
            type="primary"
            size="small"
            @click="addOrEdit(scope.row, 'add')"
          >
            新增菜单
          </el-button>
          <el-button
            type="primary"
            size="small"
            @click="addOrEdit(scope.row, 'edit')"
          >
            编辑
          </el-button>
          <el-button
            :type="scope.row.disabled ? 'danger' : 'success'"
            size="small"
            :loading="submitLoading"
            @click="changeMenuStatus(scope.row.disabled, scope.row.id)"
          >
            {{ scope.row.disabled ? '禁用' : '启用' }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="infoDialog" :title="title">
      <el-form ref="menuFormRef" :model="menuInfo">
        <el-form-item
          v-if="showParentMenu"
          label="父级菜单"
          :label-width="formLabelWidth"
        >
          <el-select v-model="menuInfo.parentId" placeholder="请选择父级菜单">
            <el-option
              v-for="item in menuList"
              :key="item.url"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="菜单名称" :label-width="formLabelWidth">
          <el-input v-model="menuInfo.name" />
        </el-form-item>
        <el-form-item label="菜单地址" :label-width="formLabelWidth">
          <el-input v-model="menuInfo.url" :disabled="urlDisabled" />
        </el-form-item>
        <el-form-item label="菜单图标" :label-width="formLabelWidth">
          <el-input v-model="menuInfo.icon" :disabled="iconDisabled" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <el-button @click="closeDia">取 消</el-button>
          <el-button type="primary" :loading="submitLoading" @click="submit">
            确 定
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref, unref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { menuApi } from '@/request/api/index.js'
import { ElMessage } from 'element-plus'
import { makeTreeData } from '@/utils/utils.js'

const store = useStore()
const menuFormRef = ref(null)

const menuList = ref([])
const title = ref('')
const infoDialog = ref(false)
const menuInfo = reactive({
  id: '',
  parentId: '',
  name: '',
  url: '',
  icon: '',
  level: 1,
  disabled: 1,
})
const submitLoading = ref(false)
const iconDisabled = ref(false)
const urlDisabled = ref(false)
const showParentMenu = ref(false)
const formLabelWidth = '100px'

function getMenuList() {
  menuApi.getMenuList().then((res) => {
    menuList.value = makeTreeData(res.data, null)
  })
}

function setIsReloadMenu() {
  store.commit('setIsReloadMenu', true)
}

function addOrEdit(row, type) {
  infoDialog.value = true
  if (row) {
    if (type === 'add') {
      title.value = '新增菜单'
      showParentMenu.value = true
      iconDisabled.value = true
      urlDisabled.value = false
      Object.assign(menuInfo, {
        parentId: row.id,
        id: '',
        name: '',
        url: '',
        icon: '',
        level: 2,
        disabled: 1,
      })
    } else {
      title.value = '编辑菜单'
      showParentMenu.value = false
      urlDisabled.value = false
      iconDisabled.value = !!row.parentId
      Object.assign(menuInfo, {
        parentId: row.parentId,
        id: row.id,
        name: row.name,
        url: row.url,
        icon: row.icon,
        level: row.level,
        disabled: row.disabled,
      })
    }
  } else {
    showParentMenu.value = false
    iconDisabled.value = false
    urlDisabled.value = false
    title.value = '新增模块'
    Object.assign(menuInfo, {
      id: '',
      parentId: '',
      name: '',
      url: '',
      icon: '',
      level: 1,
      disabled: 1,
    })
  }
}

function changeMenuStatus(val, id) {
  menuApi.changeMenuStatus({ id, disabled: val ? 0 : 1 }).then((res) => {
    if (res.code === 200) {
      ElMessage.success(res.msg)
      getMenuList()
      setIsReloadMenu()
    }
  })
}

function closeDia() {
  infoDialog.value = false
  submitLoading.value = false
}

function submit() {
  const str = menuInfo.id ? 'editMenu' : 'addMenu'
  submitLoading.value = true
  const form = unref(menuFormRef)
  form?.validate((valid) => {
    if (valid) {
      menuApi[str](menuInfo)
        .then((res) => {
          infoDialog.value = false
          submitLoading.value = false
          ElMessage.success(res.msg)
          getMenuList()
          setIsReloadMenu()
        })
        .catch(() => {
          infoDialog.value = false
          submitLoading.value = false
        })
    } else {
      submitLoading.value = false
    }
  })
}

onMounted(() => {
  getMenuList()
})
</script>

<style lang="scss" scoped>
.module_header {
  margin-bottom: 10px;
}
</style>
