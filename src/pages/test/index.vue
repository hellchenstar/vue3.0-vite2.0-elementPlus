<!--
 * @Author: chenx
 * @Descripttion: 
 * @Date: 2021-10-15 15:16:52
 * @LastEditors: chenx
 * @LastEditTime: 2022-03-12 09:56:23
-->
<template>
			<p>{{ aaa }}===</p>
	<el-select
		v-model="value"
		multiple
		filterable
		remote
		reserve-keyword
		placeholder="请输入关键词"
		:remote-method="remoteMethod"
		:loading="loading"
	>
		<el-option
			v-for="item in options"
			:key="item.value"
			:label="item.label"
			:value="item.value"
		>
		</el-option>
	</el-select>
</template>
<script>
export default {
	data() {
		return {
			aaa: "",
			options: [],
			value: [],
			list: [],
			loading: false,
			states: [
				"Alabama",
				"Alaska",
				"Arizona",
				"Arkansas",
				"California",
				"Colorado",
				"Connecticut",
				"Delaware",
				"Florida",
				"Georgia",
				"Hawaii",
				"Idaho",
				"Illinois",
				"Indiana",
				"Iowa",
				"Kansas",
				"Kentucky",
				"Louisiana",
				"Maine",
				"Maryland",
				"Massachusetts",
				"Michigan",
				"Minnesota",
				"Mississippi",
				"Missouri",
				"Montana",
				"Nebraska",
				"Nevada",
				"New Hampshire",
				"New Jersey",
				"New Mexico",
				"New York",
				"North Carolina",
				"North Dakota",
				"Ohio",
				"Oklahoma",
				"Oregon",
				"Pennsylvania",
				"Rhode Island",
				"South Carolina",
				"South Dakota",
				"Tennessee",
				"Texas",
				"Utah",
				"Vermont",
				"Virginia",
				"Washington",
				"West Virginia",
				"Wisconsin",
				"Wyoming"
			]
		}
	},
	mounted() {
		console.log(this.list)
		this.list = this.states.map(item => {
			return { value: `value:${item}`, label: `label:${item}` }
		})
	},
	methods: {
		remoteMethod(query) {
			console.log(query)
			this.aaa = query
			if (query !== "") {
				this.loading = true
				setTimeout(() => {
					this.loading = false
					this.options = this.list.filter(item => {
						return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
					})
				}, 200)
			} else {
				this.options = []
			}
		}
	}
}
</script>
