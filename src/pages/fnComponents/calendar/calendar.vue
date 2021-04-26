<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-26 14:31:24
 * @Description: file content
-->
<template>
	<div class="module">
		<Calendar style="height: 85%" @getCurrentDate="getCurrentDate"> </Calendar>
		<div>点击日期返回: {{ date }}</div>
		<div>当前日期: {{ `${date.year} - ${date.month} - ${date.day}` }}</div>
	</div>
</template>
<script>
import Calendar from "@/components/calendar.vue"
import { reactive, toRefs } from "vue"
export default {
	components: {
		Calendar,
	},
	setup() {
		const state = reactive({
			date: {},
		})
		const getCurrentDate = (val) => {
			state.date = val
		}
		return {
			...toRefs(state),
			getCurrentDate,
		}
	},
}
</script>
