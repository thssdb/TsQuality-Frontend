<template>
  <n-card :title="$t('dashboard.latest_data.title')">
    <n-input-group>
      <n-auto-complete
        v-model:value="tsPath"
        class="mb-4"
        clearable
        :options="autoCompleteOptions"
        :placeholder="$t('dashboard.latest_data.path.placeholder')"
        @update:value="tsPathUpdated"
        @select="tsPathSelected"
      />
    </n-input-group>
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
import {
  getLatestTimeSeriesPaths,
  getTimeSeriesRecentData,
} from '@/api/dashboard'
import { TimeSeriesDataPointDto } from '#/dto'

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
      fontSize: 15,
      formatter: {
        year: '{yyyy}-{MM}-{dd}',
        month: '{MM}-{dd}',
        day: '{MM}-{dd}',
        hour: '{HH}:{mm}',
        minute: '{HH}:{mm}',
        second: '{HH}:{mm}:{ss}',
        // '{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}'
      },
    },
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      fontSize: 15,
    },
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
const tsPath = ref('')
const tsPaths = ref<string[]>([])
const autoCompleteOptions = computed(() => {
  return tsPaths.value.map((item) => ({
    label: item,
    value: item,
  }))
})
async function tsPathUpdated(value: string | null) {
  if (value === null || !value.startsWith('root')) {
    return
  }
  // TODO: do not update if value doesn't change
  const res = await getLatestTimeSeriesPaths(value)
  tsPaths.value = res.data
}
async function tsPathSelected(value: string) {
  path.value = value
  await getTSData()
}

async function getTSData() {
  try {
    const res = await getTimeSeriesRecentData(path.value, numPoints)
    path.value = res.data.path
    tsPath.value = res.data.path
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
