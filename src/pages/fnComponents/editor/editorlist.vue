<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-10-21 17:48:51
 * @Description: file content
-->
<template>
  <div class="module">
    <div>
      <h3>
        vue-quill-editor编辑器<a
          href="https://www.kancloud.cn/liuwave/quill/1409423"
          >https://www.kancloud.cn/liuwave/quill/1409423</a
        >
      </h3>
      <div>
        <quill-editor
          v-model="content"
          ref="myQuillEditor"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)"
        >
        </quill-editor>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue"
// require styles
import "quill/dist/quill.core.css"
import "quill/dist/quill.snow.css"
import "quill/dist/quill.bubble.css"
import { quillEditor } from "vue-quill-editor"

export default {
  components: {
    quillEditor
  },
  setup() {
    const state = reactive({
      content: ""
    })
    const onEditorBlur = e => {
      console.log(e)
			state.content = "我有焦点了"
    }
    const onEditorFocus = e => {
      console.log(e)
			state.content = "失去焦点了"
    }
    const onEditorReady = e => {
      console.log(e)
			state.content = "准备好了"
    }
    return { state, onEditorBlur, onEditorFocus, onEditorReady }
  }
}
</script>
