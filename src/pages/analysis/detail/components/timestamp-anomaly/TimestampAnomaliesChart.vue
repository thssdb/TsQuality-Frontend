<template>
  <n-card
    class="mt-4"
    :title="$t('analysis.detail.timestamp_anomaly.chart.title')"
  >
    <template #header-extra>
      <n-input-number
        v-model:value="request.interval"
        clearable
        :placeholder="$t('analysis.detail.timestamp_anomaly.standard_interval')"
        :validator="intervalValidator"
      />
      <n-select
        v-model:value="request.method"
        class="w-36 ml-4"
        :options="methodOptions"
        @update:value="handleMethodValueUpdated"
      >
      </n-select>
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
import { TimestampAnomalyRequestDto } from '@/models/timestampAnomaly'
import { timestampAnomalyQuery } from '@/api/analysis/detail'
import {
  CHART_FONT_SIZE,
  GRID_OPTIONS,
  ORIGINAL_DATA_LINE_COLOR,
  REPAIRED_DATA_LINE_COLOR,
  X_AXIS_LABEL_FORMATTER,
} from '@/common/constants'
import { TimeSeriesDataPointDto } from '#/dto'

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

const request = reactive<TimestampAnomalyRequestDto>(
  new TimestampAnomalyRequestDto(),
)
const methodOptions = ref<SelectOption[]>([
  { label: 'Median', value: 'median' },
  { label: 'Mode', value: 'mode' },
  { label: 'Cluster', value: 'cluster' },
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
    name: t('analysis.detail.timestamp_anomaly.chart.yaxis.name'),
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
      name: t('analysis.detail.timestamp_anomaly.original_data'),
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
      name: t('analysis.detail.timestamp_anomaly.repaired_data'),
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
  request.method = 'Median'
})

function intervalValidator(x: number): boolean {
  return Number.isInteger(x) && x > 0
}

function handleMethodValueUpdated(value: string) {
  console.log(value)
}

async function query() {
  setupRequest()
  const res = await timestampAnomalyQuery(request)
  originalData.value = res.data.originalData.map(
    (item: TimeSeriesDataPointDto) => [item.timestamp, item.value],
  )
  repairedData.value = res.data.repairedData.map(
    (item: TimeSeriesDataPointDto) => [item.timestamp, item.value],
  )
}

function setupRequest() {
  request.path = props.path
  request.startTimestamp = props.startTimestamp
  request.endTimestamp = props.endTimestamp
}
</script>
