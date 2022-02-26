<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2022-02-26 11:06:28
 * @Description: file content
-->
<template>
  <div>
    <MdEditor v-model="value" @onChange="changeValue" />
  </div>
</template>
<script>
import { ref, onMounted } from 'vue'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
export default {
  components: {
    MdEditor,
  },
  setup() {
    const value = ref('')
    const changeValue = (val) => {
      console.log(val)
    }

    onMounted(() => {
      // console.log(value)
    })
    return {
      value,
      changeValue,
    }
  },
}
</script>
