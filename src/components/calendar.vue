<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-06-01 11:50:32
 * @Description: 日期组件
-->

<template>
	<div class="module">
		<div class="canlendarPanel">
			<div class="canlendar-header">
				<p class="pre">
					<span @click="changeDate('preYear')">
						<i class="el-icon-d-arrow-left" name="preYear" />
					</span>
					<span @click="changeDate('preMonth')">
						<i class="el-icon-arrow-left" name="preMonth" />
					</span>
				</p>
				<p class="currenDate">{{ `${year}年${month}月` }}</p>
				<p class="next">
					<span @click="changeDate('nextMonth')">
						<i class="el-icon-arrow-right" name="nextMonth" />
					</span>
					<span @click="changeDate('nextYear')">
						<i class="el-icon-d-arrow-right" name="nextYear" />
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
					<!-- 上个月多出的时间显示 -->
					<li v-for="inx in weekDay" class="ohterMonth" :class="{ avtive: inx === day }" :key="inx" @click="clickDate(year, month - 1, preMonthSize() - weekDay + inx)">
						<div>{{ preMonthSize() - weekDay + inx }}</div>
						<slot name="last"></slot>
					</li>
					<!-- 当月时间显示 -->
					<li v-for="item in monthList[month - 1]" class="currentMonth" :class="{ currentDay: item === day }" :key="item" @click="clickDate(year, month, item)">
						<div class="currentMonthDay">{{ item }}</div>
						<slot name="now"></slot>
					</li>
					<!-- 下个月时间显示 -->
					<li v-for="index in lastWeekDay" class="ohterMonth" :key="index" @click="clickDate(year, month + 1, index)">
						<div>{{ index }}</div>
						<slot name="next"></slot>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
import { onBeforeMount, reactive, toRefs } from "vue"
export default {
	setup(props, { emit }) {
		// 获得今天的日期
		const state = reactive({
			weekArr: ["日", "一", "二", "三", "四", "五", "六"],
			monthList: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], //十二个月，每个月的天数
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
		// 获取当前日期
		const getCurrentDate = () => {
			let date = new Date()
			state.year = date.getFullYear()
			state.month = date.getMonth() + 1
			state.day = date.getDate()
			let curDate = {
				year: state.year,
				month: state.month,
				day: state.day,
			}
			emit("getCurrentDate", curDate)
		}
		// 根据年月日获得为当前时间为星期几
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
			// 获得最后一天是星期几，往后填充多少个,如果小于6，则多加7天
			const remineDay = getWeekDay(state.year, state.month, state.monthList[state.month - 1])
			state.lastWeekDay = remineDay === 7 ? 6 : 6 - remineDay
		}
		// 切换月份年份
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
			initDate()
		}
		const clickDate = (year, month, day) => {
			let date = {
				year,
				month,
				day,
			}
			emit("getCurrentDate", date)
		}
		onBeforeMount(() => {
			getCurrentDate()
			initDate()
		})
		return {
			...toRefs(state),
			preMonthSize,
			changeDate,
			clickDate,
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
		line-height: 40px;
		height: 40px;
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
		height: calc(100% - 40px);
		flex: 1;
		display: flex;
		flex-direction: column;
		.main-header {
			height: 40px;
			display: flex;

			line-height: 40px;
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
				height: 80px;
				width: calc(100% / 7);
				position: relative;
				line-height: 25px;
				cursor: pointer;
				color: #666;
				padding: 5px;
			}
			li:hover {
				background: #bfe8ff;
			}
			li:visited {
				background: #bfe8ff;
			}
			.currentMonth {
				background: #ecfcff;
				.currentMonthDay {
					font-size: 20px;
					font-weight: 600;
				}
			}
			.ohterMonth {
				background: rgb(255, 255, 255);
				cursor: default;
			}
			.currentDay {
				background: #bfe8ff;
			}
		}
	}
}
</style>
