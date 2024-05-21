<template>
  <div>
    <n-flex justify="space-around" size="large">
      <TimeSeriesPathAutoCompletion
        style="flex: 1"
        @select="handleTsPathSelection"
      />
      <TimeSeriesTimeRangePicker
        style="flex: 1"
        @clear="handleTimeRangeClear"
        @select="handleTimeRangeSelection"
      />
      <n-select
        style="flex: 1"
        :options="selectOptions"
        @update:value="handleTimePeriodTypeSelection"
      />
      <n-button type="primary" @click="query">
        {{ t('global.others.query') }}
      </n-button>
    </n-flex>

    <n-flex justify="center" size="large">
      <TimeSeriesTimeOverview :path="path" />
    </n-flex>

    <div class="mt-4">
      <n-card>
        <n-grid x-gap="12" responsive="screen" cols="2 s:1 m:2 l:2 xl:2 2xl:2">
          <n-grid-item>
            <DQAggregationChart :data="dqChartData" />
          </n-grid-item>

          <n-grid-item>
            <DQDistributionChart :distribution="dqDistribution" />
          </n-grid-item>
        </n-grid>
      </n-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import DQDistributionChart from '@/pages/analysis/overview/components/DQDistributionChart.vue'
import {
  DQAggregationDetailItem,
  DQAggregationDetailItemBuilder,
} from '@/models/dqAggregationDetailItem'
import TimeSeriesTimeRangePicker from '@/components/TimeSeriesTimeRangePicker.vue'
import TimeSeriesPathAutoCompletion from '@/components/TimeSeriesPathAutoCompletion.vue'
import { useI18n } from 'vue-i18n'
import {
  getDataSizeDistribution,
  getDQAggregationDetail,
} from '@/api/analysis/overview'
import { AggregateDqRequestDto } from '@/models/dataQuality'
import { SelectOption } from 'naive-ui'
import { TimePeriodType } from '@/models/timePeriodType'
import DQAggregationChart from '@/pages/analysis/overview/components/DQAggregationChart.vue'
import { MetricEnum } from '@/enums/metricEnum'
import { DQDistribution, DQDistributionItem } from '@/models/dqDistribution'
import TimeSeriesTimeOverview from '@/components/TimeSeriesTimeOverview.vue'

const { t } = useI18n()

const selectOptions = reactive<Array<SelectOption>>(initSelectOptions())
const currentType = ref<string>(TimePeriodType.YEAR.toString())
function initSelectOptions() {
  const options: Array<SelectOption> = []
  for (const type of Object.values(TimePeriodType)) {
    options.push({
      label: t(`analysis.overview.aggregation.time_period.${type}`),
      value: type,
    })
  }
  return options
}

async function handleTimePeriodTypeSelection(value: string) {
  currentType.value = value
}

const path = ref('')
const startTimestamp = ref<number>(0)
const endTimestamp = ref<number>(0)

function handleTsPathSelection(value: string) {
  path.value = value
}

function handleTimeRangeClear() {
  startTimestamp.value = 0
  endTimestamp.value = 0
}

const dqData = reactive(new Map<string, number[]>())
const dsData = reactive(new Map<string, number>())

const dqDigits = 3
const dqChartData = computed(() => {
  const result: DQAggregationDetailItem[] = []
  dqData.forEach((value, key) => {
    result.push(
      new DQAggregationDetailItemBuilder()
        .setTime(key)
        .setDataSize(dsData.get(key) ?? 0)
        .setCompleteness(+value[0].toFixed(dqDigits))
        .setConsistency(+value[1].toFixed(dqDigits))
        .setTimeliness(+value[2].toFixed(dqDigits))
        .setValidity(+value[3].toFixed(dqDigits))
        .build(),
    )
  })
  return result
})
const dqDistribution = computed(() => {
  return dqDetailToDQDistribution(dqChartData.value)
})

function dqDetailToDQDistribution(
  detail: DQAggregationDetailItem[],
): DQDistribution {
  const items = new Map<MetricEnum, DQDistributionItem>()
  const completenessData = detail.map((item) => item.completeness)
  const consistencyData = detail.map((item) => item.consistency)
  const timelinessData = detail.map((item) => item.timeliness)
  const validityData = detail.map((item) => item.validity)
  items.set(MetricEnum.COMPLETENESS, new DQDistributionItem(completenessData))
  items.set(MetricEnum.CONSISTENCY, new DQDistributionItem(consistencyData))
  items.set(MetricEnum.TIMELINESS, new DQDistributionItem(timelinessData))
  items.set(MetricEnum.VALIDITY, new DQDistributionItem(validityData))
  return new DQDistribution(items)
}

function handleTimeRangeSelection(range: [number, number]) {
  startTimestamp.value = range[0]
  endTimestamp.value = range[1]
}

const dqRequest = reactive(new AggregateDqRequestDto())
async function query() {
  setDqRequest()
  const dqResult = await getDQAggregationDetail(dqRequest)
  const dsResult = await getDataSizeDistribution(dqRequest)

  dqData.clear()
  Object.entries(dqResult.data).forEach(([key, value]) => {
    dqData.set(key, value)
  })
  Object.entries(dsResult.data).forEach(([key, value]) => {
    dsData.set(key, value)
  })
}

function setDqRequest() {
  dqRequest.path = path.value
  dqRequest.type = currentType.value
  dqRequest.startTimestamp = startTimestamp.value
  dqRequest.endTimestamp = endTimestamp.value
}
</script>
