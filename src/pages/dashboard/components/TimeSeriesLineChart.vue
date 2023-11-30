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
    <v-chart
      autoresize
      :option="chartOption"
      :style="{ width, height }"
      class="flex-grow"
    />
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

const width = '100%'
const height = '50vh'
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
    axisLabel: {
      formatter: '{yyyy}-{MM}-{dd}',
    },
  },
  yAxis: {
    type: 'value',
  },
  grid: {
    left: '2%',
    right: '2%',
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

const tsPath = ref(null)
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
  const res = await getLatestTimeSeriesPaths(iotdbConfigStore.config.id, value)
  tsPaths.value = res.data
}
async function tsPathSelected(value: string) {
  path.value = value
  await getTSData()
}

async function getTSData() {
  try {
    const res = await getTimeSeriesRecentData(
      iotdbConfigStore.config.id,
      path.value,
    )
    console.log(res)
    path.value = res.data.path
    data.value = res.data.points.map((item: TimeSeriesDataPointDto) => [
      item.timestamp,
      item.value,
    ])
  } catch (err) {
    console.log(err)
  }
}

const iotdbConfigStore = useIoTDBConfigStore()
onMounted(async () => {
  await getTSData()
})
</script>
