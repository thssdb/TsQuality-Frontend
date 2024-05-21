<template>
  <n-card :title="$t('dashboard.latest_data.title')">
    <TimeSeriesPathAutoCompletion @select="tsPathSelected" />
    <n-flex justify="center">
      <v-chart autoresize :option="chartOption" :style="{ width, height }" />
    </n-flex>
  </n-card>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import VChart from 'vue-echarts'
import { useI18n } from 'vue-i18n'
import { setupECharts } from '@/utils/lib/echarts'
import { EChartsOption } from 'echarts'
import { useIoTDBConfigStore } from '@/stores/iotdbConfig'
import { getTimeSeriesRecentData } from '@/api/dashboard'
import { TimeSeriesDataPointDto } from '#/dto'
import TimeSeriesPathAutoCompletion from '@/components/TimeSeriesPathAutoCompletion.vue'
import { CHART_FONT_SIZE, X_AXIS_LABEL_FORMATTER } from '@/common/constants'

setupECharts()

const iotdbConfigStore = useIoTDBConfigStore()

const width = '100%'
const height = '40vh'
const { t } = useI18n()
const path = ref<string>('')
const data = ref<Array<[bigint, number]>>([])
const title = computed(() => `${t('dashboard.line_chart.title')} ${path.value}`)

const chartOption = reactive<EChartsOption>({
  title: {
    left: 'center',
    // inside a reactive object, any ref value will be unwrapped automatically
    // thus, use `path` directly, instead of `path.value`, or it will be `undefined`
    // here, `as unknown as string` is used to avoid type error:
    // `Type 'Computed<string>' is not assignable to type 'string'.`
    text: title as unknown as string,
  },
  xAxis: {
    type: 'time',
    interval: 3600,
    axisLabel: {
      formatter: X_AXIS_LABEL_FORMATTER,
    },
  },
  yAxis: {
    type: 'value',
  },
  grid: {
    left: '1%',
    right: '1%',
    bottom: '2%',
    top: '8%',
    containLabel: true,
  },
  series: [
    {
      type: 'line',
      // `as unknown as string` is used to avoid type error
      name: path as unknown as string,
      data: data as unknown as Array<object>, // same as above
    },
  ],
  tooltip: {
    show: true,
  },
})

const numPoints = 100 // display the latest 100 data points
async function tsPathSelected(value: string) {
  path.value = value
  await getTSData()
}

async function getTSData() {
  try {
    const res = await getTimeSeriesRecentData(path.value, numPoints)
    path.value = res.data.path
    data.value = res.data.points.map((item: TimeSeriesDataPointDto) => [
      item.timestamp,
      item.value,
    ])
  } catch (err) {
    console.log(err)
  }
}
iotdbConfigStore.$subscribe((_, state) => {
  if (state.config.id === -1) {
    return
  }
  getTSData()
})

onMounted(async () => {
  await getTSData()
})
</script>
