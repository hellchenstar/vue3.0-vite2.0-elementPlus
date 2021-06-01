<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-06-01 11:55:14
 * @Description: file content
-->
<template>
	<div class="module">
		<Calendar style="height: 85%" @getCurrentDate="getCurrentDate">
			<!-- v-slot可以缩写为# -->
			<!-- <template v-slot:last> 上个月 </template> -->
			<template #last> 上个月 </template>

			<template v-slot:now> 这个月 </template>
			<template v-slot:next> 下个月 </template>
		</Calendar>
		<div>点击日期返回: {{ date }}</div>
		<div>当前日期: {{ `${date.year} - ${date.month} - ${date.day}` }}</div>
	</div>
</template>
<script>
import Calendar from "@/components/calendar.vue"
import { reactive, toRefs, onMounted } from "vue"
export default {
	components: {
		Calendar,
	},
	setup() {
		const state = reactive({
			date: {
				year: "",
				month: "",
				day: "",
			},
		})
		const getCurrentDate = (val) => {
			state.date = val ? val : state.date
		}
		onMounted(() => {
			getCurrentDate()
		})
		return {
			...toRefs(state),
			getCurrentDate,
		}
	},
}
</script>
