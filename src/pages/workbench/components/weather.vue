<!--
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2022-03-14 12:13:18
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

							<div style="font-size: 14px">{{ weatherInfo.weather }}(实时)</div>
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
						<div>{{ `${getCurrentDay(parseInt(item.week))}` }}</div>
						<div>{{ `${item.date}` }}</div>
					</div>
					<div class="icon">
						<i class="icon helltianqi weatherIcon" v-if="item.dayWeather.indexOf('多云') !== -1"></i>
						<i class="icon hellxiaoyu weatherIcon" v-if="item.dayWeather.indexOf('小雨') !== -1"></i>
						<i class="icon hellxiaoyu weatherIcon" v-if="item.dayWeather.indexOf('阵雨') !== -1"></i>
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

<script setup>
import { onBeforeMount, reactive, ref } from 'vue'
import { weatherKey } from '@/utils/config.js'
import chineseLunar from 'chinese-lunar'
import dayjs from 'dayjs'

function loadAMapLoader() {
  if (typeof window !== 'undefined' && window.AMapLoader) return Promise.resolve(window.AMapLoader)
  return new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = 'https://cdn.jsdelivr.net/npm/@amap/amap-jsapi-loader@1.0.1/dist/index.js'
    s.async = true
    s.onload = () => resolve(window.AMapLoader || window.AMap || { load: () => Promise.reject(new Error('AMapLoader not found')) })
    s.onerror = reject
    document.head.appendChild(s)
  })
}

const currentDate = ref('')
const weatherInfo = reactive({
  weather: '',
  temperature: '',
  windDirection: '',
  windPower: '',
  humidity: '',
  forecasts: [],
})

function getCurrentDay(week) {
  const map = { 1: '周一', 2: '周二', 3: '周三', 4: '周四', 5: '周五', 6: '周六', 7: '周日' }
  return map[week] || ''
}

function initAmap() {
  loadAMapLoader().then((AMapLoader) => {
    AMapLoader.load({
      key: weatherKey,
      version: '2.0',
      extensions: 'all',
      plugins: ['AMap.Weather'],
    })
      .then((AMap) => {
        const weather = new AMap.Weather()
        weather.getLive('西安市', (err, data) => {
          if (!err && data) {
            weatherInfo.weather = data.weather ?? ''
            weatherInfo.temperature = data.temperature ?? ''
            weatherInfo.windDirection = data.windDirection ?? ''
            weatherInfo.windPower = data.windPower ?? ''
            weatherInfo.humidity = data.humidity ?? ''
          } else {
            weatherInfo.weather = '获取天气信息失败,请稍后再试'
          }
        })
        weather.getForecast('西安市', (err, data) => {
          if (!err && data) weatherInfo.forecasts = data.forecasts || []
        })
      })
      .catch((e) => console.log(e))
  })
}

onBeforeMount(() => {
  window.WIDGET = {
    CONFIG: {
      layout: '1',
      width: '450',
      height: '150',
      background: '1',
      dataColor: 'FFFFFF',
      key: '373cce0854064c2c9b54132775106d84',
    },
  }
  initAmap()
  const curDate = chineseLunar.solarToLunar(new Date())
  const dayName = chineseLunar.dayName(curDate.day - 1)
  const monthName = chineseLunar.monthName(curDate.month)
  currentDate.value = `${dayjs().format('YYYY-MM-DD')} 农历${monthName}${dayName}`
})
</script>
<style lang="scss" scoped>
.weatherContainer {
	position: relative;
	width: 700px;
	height: 100%;
	color: #fff;
	padding: 40px 10px 10px 10px;
	border-radius: 10px;
	display: flex;
	background: #56ccf2; /* fallback for old browsers */
	background: linear-gradient(rgb(86, 204, 242), rgb(47, 128, 237));
	.curDate {
		position: absolute;
		top: 0;
		left: 0;
		padding: 10px;
		color: #fff;
		text-shadow: 1px 1px 1px #555;
		font-size: 14px;
	}
	.showcase {
		width: 150px;
		height: calc(100%);
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
