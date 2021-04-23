<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-23 15:17:11
 * @Description: file content
-->
<template>
	<div class="weatherContainer">
		<div class="curDate">
			{{ currentDate }}
		</div>
		<div class="showcase">
			<a class="canvas" id="sunny">
				<div class="icon">
					<i class="icon helltianqi weatherIcon" v-if="weatherInfo.weather.indexOf('多云') !== -1"></i>
					<i class="icon hellxiaoyu weatherIcon" v-if="weatherInfo.weather.indexOf('小雨') !== -1"></i>
					<i class="icon hellxue weatherIcon" v-if="weatherInfo.weather.indexOf('雪') !== -1"></i>
					<i class="icon hellyintian weatherIcon" v-if="weatherInfo.weather.indexOf('阴') !== -1"></i>
					<i class="icon hellleidian weatherIcon" v-if="weatherInfo.weather.indexOf('雷') !== -1"></i>
					<i class="icon hellqing weatherIcon" v-if="weatherInfo.weather.indexOf('晴') !== -1"></i>
					<i class="icon helltianqi-wu weatherIcon" v-if="weatherInfo.weather.indexOf('雾') !== -1"></i>
					<i class="icon hellziyuan weatherIcon" v-if="weatherInfo.weather.indexOf('大雨') !== -1"></i>
				</div>
				<div class="detail">
					<div class="detail_temperature">
						<div class="temperature">{{ weatherInfo.temperature }}</div>
						<div class="desc">
							<div>℃</div>
							<div>{{ weatherInfo.weather }}</div>
						</div>
					</div>
					<div class="other">
						<div>风向：{{ weatherInfo.windDirection }}</div>
						<div>风力：{{ weatherInfo.windPower }}</div>
						<div>湿度：{{ weatherInfo.humidity }}</div>
					</div>
				</div>
			</a>
		</div>
		<!-- 预报未来4天天气 -->
		<div class="future_weather">
			<div class="showcase" v-for="(item, index) in weatherInfo.forecasts" :key="index">
				<a class="canvas" id="sunny">
					<div class="date">
						<div>{{ `星期${item.week}` }}</div>
						<div>{{ `${item.date}` }}</div>
					</div>
					<div class="icon">
						<i class="icon helltianqi weatherIcon" v-if="item.dayWeather.indexOf('多云') !== -1"></i>
						<i class="icon hellxiaoyu weatherIcon" v-if="item.dayWeather.indexOf('小雨') !== -1"></i>
						<i class="icon hellxue weatherIcon" v-if="item.dayWeather.indexOf('雪') !== -1"></i>
						<i class="icon hellyintian weatherIcon" v-if="item.dayWeather.indexOf('阴') !== -1"></i>
						<i class="icon hellleidian weatherIcon" v-if="item.dayWeather.indexOf('雷') !== -1"></i>
						<i class="icon hellqing weatherIcon" v-if="item.dayWeather.indexOf('晴') !== -1"></i>
						<i class="icon helltianqi-wu weatherIcon" v-if="item.dayWeather.indexOf('雾') !== -1"></i>
						<i class="icon hellziyuan weatherIcon" v-if="item.dayWeather.indexOf('大雨') !== -1"></i>
					</div>
					<div class="detail">
						<div class="detail_temperature">
							<div class="temperature">{{ item.dayTemp }}</div>
							<div class="desc">
								<div>℃</div>
								<div>{{ item.dayWeather }}</div>
							</div>
						</div>
						<div class="other">
							<div>风向：{{ item.dayWindDir }}</div>
							<div>风力：{{ item.dayWindPower }}</div>
						</div>
					</div>
				</a>
			</div>
		</div>
	</div>
</template>

<script>
import { onBeforeMount, reactive, toRefs } from "vue"

import AMapLoader from "@amap/amap-jsapi-loader"
import { weatherKey } from "@/utils/config.js"
import moment from "moment"
export default {
	setup() {
		const mapInfo = reactive({
			map: "",
			currentDate: "",
			weatherInfo: {
				weather: "",
				forecasts: [],
			},
		})
		const initAmap = () => {
			AMapLoader.load({
				key: weatherKey, // 申请好的Web端开发者Key，首次调用 load 时必填
				version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
				extensions: "all",
				plugins: ["AMap.Weather"], //插件列表
			})
				.then((AMap) => {
					let weather = new AMap.Weather()
					// 获取实时天气
					weather.getLive("西安市", (err, data) => {
						if (!err) {
							mapInfo.weatherInfo.msg = ""
							mapInfo.weatherInfo = data
						} else {
							mapInfo.weatherInfo.msg = "获取天气信息失败,请稍后再试"
						}
					})
					// 获取未来4天天气预报
					weather.getForecast("西安市", (err, data) => {
						if (!err) {
							mapInfo.weatherInfo.forecasts = data.forecasts
						}
					})
				})

				.catch((e) => {
					console.log(e)
				})
		}
		onBeforeMount(() => {
			window.WIDGET = {
				CONFIG: {
					layout: "1",
					width: "450",
					height: "150",
					background: "1",
					dataColor: "FFFFFF",
					key: "373cce0854064c2c9b54132775106d84",
				},
			}
			mapInfo.currentDate = `${moment().format("YYYY-MM-YY")}  星期${moment().format("d")}`
			initAmap()
		})
		return {
			...toRefs(mapInfo),
			initAmap,
		}
	},
}
</script>
<style lang="scss" scoped>
.weatherContainer {
	width: 100%;
	height: 100%;
	color: #fff;
	padding: 0 10px 10px 10px;
	border-radius: 10px;
	display: flex;
	background: #56ccf2; /* fallback for old browsers */
	background: linear-gradient(rgb(86, 204, 242), rgb(47, 128, 237));
	.curDate {
		padding: 10px;
		color: #fff;
		text-shadow: 1px 1px 1px #555;
		font-size: 18px;
	}
	.showcase {
		width: 150px;
		height: calc(100%);
		padding: 10px 0;
		border-right: 1px solid #fff;
	}

	.future_weather {
		width: calc(100% - 150px);
		height: 100%;
		display: flex;
		font-size: 14px;
		.showcase {
			width: 150px;
			height: calc(100% - 20px);
			padding: 10px 0;
			border-right: 1px solid #fff;
			.date {
				text-align: center;
			}

			.icon {
				width: 100%;
				text-align: center;
				.weatherIcon {
					font-size: 60px;
				}
			}

			.detail {
				display: flex;
				justify-content: center;
				flex-direction: column;

				.detail_temperature {
					display: flex;
					padding-left: 20px;
					align-items: center;
					.temperature {
						font-size: 32px;
						line-height: 64px;
						font-family: Arial;
						text-shadow: 1px 1px 1px #555;
					}
					.desc {
						margin-left: 5px;
					}
				}
				.other {
					padding-left: 30px;
				}
			}
		}
		.showcase:last-child {
			border: none;
		}
	}
}

.icon {
	width: 100%;
	text-align: center;
	.weatherIcon {
		font-size: 100px;
	}
}
.detail {
	display: flex;
	justify-content: center;
	flex-direction: column;

	.detail_temperature {
		display: flex;
		padding-left: 20px;
		align-items: center;
		.temperature {
			font-size: 48px;
			line-height: 64px;
			font-family: Arial;
			text-shadow: 1px 1px 1px #555;
		}
		.desc {
			margin-left: 5px;
		}
	}
	.other {
		padding-left: 30px;
	}
}
</style>
