<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2022-03-14 13:10:23
 * @Description: file content
-->
<template>
  <div class="module">
    <div class="container">
      <h3 class="title">
        vue-quill-editor编辑器
        <a href="https://www.kancloud.cn/liuwave/quill/1409423">https://www.kancloud.cn/liuwave/quill/1409423</a>
      </h3>
      <div id="editor">
        <Quill v-model="state.content" :options="options" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { Quill } from 'quill'

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ header: 1 }, { header: 2 }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ direction: 'rtl' }],
  [{ size: ['small', false, 'large', 'huge'] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ['clean'],
  ['image', 'video'],
]

const options = {
  readOnly: false,
  theme: 'snow',
  modules: {
    toolbar: toolbarOptions,
  },
}

const state = reactive({
  content: '',
})
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
}
.title {
  width: 100%;
  height: 40px;
  padding: 10px 0;
  box-sizing: border-box;
}
#editor {
  width: 100%;
  min-height: 400px;
  max-height: calc(100% - 100px);
  box-sizing: border-box;
  :deep(.ql-container) {
    width: 100%;
    height: calc(100% - 60px);
    overflow-y: auto;
  }
}
</style>
