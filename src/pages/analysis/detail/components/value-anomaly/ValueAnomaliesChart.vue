<template>
  <n-card class="mt-4" :title="$t('analysis.detail.value_anomaly.chart.title')">
    <template #header-extra>
      <n-input
        v-model:value="request.args"
        class="w-64"
        autosize
        style="min-width: 60%"
        :placeholder="
          $t('analysis.detail.value_anomaly.chart.args.placeholder')
        "
      />
      <n-select
        v-model:value="request.method"
        class="w-36 ml-4"
        :options="methodOptions"
      />
      <n-button class="ml-4" type="primary" @click="query">
        {{ $t('global.others.query') }}
      </n-button>
    </template>
    <v-chart
      autoresize
      :option="option"
      :style="{ width: chartWidth, height: chartHeight }"
    />
  </n-card>
</template>

<script setup lang="ts">
import { chartHeight, chartWidth } from '@/pages/analysis/detail/constants'
import VChart from 'vue-echarts'
import { useI18n } from 'vue-i18n'
import { onMounted, reactive, ref } from 'vue'
import { EChartsOption } from 'echarts'
import { SelectOption } from 'naive-ui'
import { ValueAnomalyRequestDto } from '@/models/anomaly'
import { valueAnomalyQuery } from '@/api/analysis/detail'
import {
  CHART_FONT_SIZE,
  ORIGINAL_DATA_LINE_COLOR,
  REPAIRED_DATA_LINE_COLOR,
  X_AXIS_LABEL_FORMATTER,
} from '@/common/constants'
import { ValueAnomalyResponseItemDto } from '#/dto'

const props = defineProps({
  path: {
    type: String,
    default: '',
  },
  startTimestamp: {
    type: Number,
    default: 0,
  },
  endTimestamp: {
    type: Number,
    default: 0,
  },
})

const { t } = useI18n()

const request = reactive(new ValueAnomalyRequestDto())
const methodOptions = ref<SelectOption[]>([
  { label: 'Screen', value: 'Screen' },
  { label: 'LsGreedy', value: 'LsGreedy' },
])

const originalData = ref<Array<[bigint, number]>>([])
const repairedData = ref<Array<[bigint, number]>>([])

const option = ref<EChartsOption>({
  title: {
    left: 'center',
  },
  xAxis: {
    type: 'time',
    axisLabel: {
      fontSize: CHART_FONT_SIZE,
      formatter: X_AXIS_LABEL_FORMATTER,
    },
  },
  yAxis: {
    nameTextStyle: {
      fontSize: CHART_FONT_SIZE,
    },
    axisLabel: {
      fontSize: CHART_FONT_SIZE,
    },
    name: t('analysis.detail.value_anomaly.chart.yaxis.name'),
  },
  grid: {
    left: '2%',
    right: '1%',
    bottom: '2%',
    top: '10%',
    containLabel: true,
  },
  legend: {
    show: true,
    textStyle: {
      fontSize: CHART_FONT_SIZE,
    },
  },
  series: [
    {
      name: t('analysis.detail.anomaly.original_data'),
      type: 'line',
      data: originalData as unknown as object[],
      itemStyle: {
        color: ORIGINAL_DATA_LINE_COLOR,
      },
      lineStyle: {
        color: ORIGINAL_DATA_LINE_COLOR,
      },
    },
    {
      name: t('analysis.detail.anomaly.repaired_data'),
      type: 'line',
      data: repairedData as unknown as object[],
      itemStyle: {
        color: REPAIRED_DATA_LINE_COLOR,
      },
      lineStyle: {
        color: REPAIRED_DATA_LINE_COLOR,
      },
    },
  ],
  dataZoom: {
    type: 'inside',
    filterMode: 'filter',
    xAxisIndex: [0],
  },
  tooltip: {
    show: true,
  },
})

onMounted(() => {
  request.method = 'Screen'
})

async function query() {
  setupRequest()
  const res = await valueAnomalyQuery(request)
  console.log(res)
  originalData.value = res.data.data.map(
    (item: ValueAnomalyResponseItemDto) => {
      return [item.timestamp, item.original]
    },
  )
  repairedData.value = res.data.data.map(
    (item: ValueAnomalyResponseItemDto) => {
      return [item.timestamp, item.repaired]
    },
  )
  console.log(originalData.value)
  console.log(repairedData.value)
}

function setupRequest() {
  request.path = props.path
  request.startTimestamp = props.startTimestamp
  request.endTimestamp = props.endTimestamp
}
</script>
