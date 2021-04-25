<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-25 18:59:36
 * @Description: file content
-->
<template>
	<div class="module">
		<div class="canlendarPanel">
			<div class="canlendar-header">
				<p class="pre">
					<span @click="changeDate('preYear')">
						<icon class="icon" name="preYear" />
					</span>
					<span @click="changeDate('preMonth')">
						<icon class="icon" name="preMonth" />
					</span>
				</p>
				<p class="currenDate">{{ `${year}年${month}月` }}</p>
				<p class="next">
					<span @click="changeDate('nextMonth')">
						<icon class="icon" name="nextMonth" />
					</span>
					<span @click="changeDate('nextYear')">
						<icon class="icon" name="nextYear" />
					</span>
				</p>
			</div>
			<div class="canlendar-main">
				<ul class="main-header">
					<li v-for="(item, index) in weekArr" :key="index">
						{{ item }}
					</li>
				</ul>
				<ul class="main">
					<li v-for="inx in weekDay" class="ohterMonth" :key="inx + new Date()">
						<span>{{ preMonthSize() - weekDay + inx }}</span>
					</li>

					<li v-for="index in monthList[month - 1]" :class="{ currentDay: index === day }" :key="index + new Date()">
						<span> {{ index }}</span>
					</li>
					<li v-for="index in lastWeekDay" class="disabled" :key="index + new Date()">{{ index }}</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
import { onBeforeMount, reactive, toRefs } from "vue"
export default {
	setup() {
		// 获得今天的日期
		const state = reactive({
			weekArr: [],
			monthList: [], //十二个月，每个月的天数
			weekDay: "",
			lastWeekDay: "",
			year: "",
			month: "",
			day: "",
		})
		// 上一个月有多少天
		const preMonthSize = () => {
			return state.month - 1 === 0 ? 31 : state.monthList[state.month - 2]
		}
		const getCurrentDate = () => {
			let date = new Date()
			state.year = date.getFullYear()
			state.month = date.getMonth() + 1
			state.day = date.getDate()
		}
		// 根据年月日获得为星期几
		const getWeekDay = (year, month, day) => {
			return new Date(`${year}/${month}/${day}`).getDay()
		}
		const initDate = () => {
			// 处理闰年的二月份为29天的问题
			if ((state.year % 4 === 0 && state.year % 100 !== 0) || state.year % 400 === 0) {
				state.monthList[1] = 29
			} else {
				state.monthList[1] = 28
			}
			// 获得指定年月的1号是星期几
			const firstDay = getWeekDay(state.year, state.month, 1)
			// 在1号前面填充多少个上个月的日期
			state.weekDay = firstDay === 7 ? 0 : firstDay
			// 获得最后一天是星期几，往后填充多少个
			const remineDay = getWeekDay(state.year, state.month, state.monthList[state.month - 1])
			state.lastWeekDay = remineDay === 7 ? 6 : 6 - remineDay
		}
		const changeDate = (type) => {
			switch (type) {
				case "preYear":
					state.year -= 1
					break
				case "preMonth":
					// 当前月份为1月， 上一个月分为12月，年份减1
					if (state.month === 1) {
						state.month = 12
						state.year -= 1
					} else {
						state.month -= 1
					}
					break
				case "nextYear":
					state.year += 1
					break
				case "nextMonth":
					// 当前月份为12月， 下个月分为1月，年份加1
					if (state.month === 12) {
						state.month = 1
						state.year += 1
					} else {
						state.month += 1
					}
					break
				default:
					break
			}
		}
		onBeforeMount(() => {
			state.weekArr = ["日", "一", "二", "三", "四", "五", "六"]
			state.monthList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
			getCurrentDate()
			initDate()
		})
		return {
			...toRefs(state),
			preMonthSize,
			changeDate,
		}
	},
}
</script>
<style lang="scss" scoped>
li {
	list-style: none;
	text-align: center;
	border: 1px solid #eee;
}
.canlendarPanel {
	width: 100%;
	height: 100%;
	border-bottom: 3px solid #eee;
	display: flex;
	flex-direction: column;
	.canlendar-header {
		line-height: 30px;
		background: #eee;
		display: flex;
		flex-direction: row;
		justify-content: center;
		.currenDate {
			margin: 0 20px;
			font-size: 16px;
		}
		.icon {
			width: 12px;
			height: 12px;
		}
	}
	.canlendar-main {
		flex: 1;
		display: flex;
		flex-direction: column;
		.main-header {
			display: flex;
			line-height: 30px;
			color: #333;
			li {
				flex: 1;
			}
		}
		ul.main {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			padding-bottom: 10px;
			font-size: 14px;
			li {
				width: 14.2%;
				position: relative;
				line-height: 25px;
				cursor: pointer;
				height: 50px;
			}
			.ohterMonth {
				color: #333;
				background: #ccc;
				cursor: default;
			}
			.currentDay {
				background: #e6f6ff;
			}
		}
	}
}
</style>
