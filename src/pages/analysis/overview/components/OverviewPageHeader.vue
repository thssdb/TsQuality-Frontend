<template>
  <n-card>
    <n-tabs type="line" animated @update:value="handleTabChange">
      <!-- NOTICE: here `display-directive` must be set to `show:lazy` -->
      <!-- otherwise the last two charts will collapse to 100px*100px  -->
      <n-tab-pane
        display-directive="show:lazy"
        :name="DQAggregationType.DAY"
        :tab="$t('analysis.overview.aggregation.data_size.tabs.day')"
      >
        <DQAggregationChart
          :type="DQAggregationType.DAY"
          :data="data.get(DQAggregationType.DAY)?.detail ?? []"
          @load="handleLoadEvent"
        />
      </n-tab-pane>
      <n-tab-pane
        display-directive="show:lazy"
        :name="DQAggregationType.MONTH"
        :tab="$t('analysis.overview.aggregation.data_size.tabs.month')"
      >
        <DQAggregationChart
          :type="DQAggregationType.MONTH"
          :data="data.get(DQAggregationType.MONTH)?.detail ?? []"
          @load="handleLoadEvent"
        />
      </n-tab-pane>
      <n-tab-pane
        display-directive="show:lazy"
        :name="DQAggregationType.YEAR"
        :tab="$t('analysis.overview.aggregation.data_size.tabs.year')"
      >
        <DQAggregationChart
          :type="DQAggregationType.YEAR"
          :data="data.get(DQAggregationType.YEAR)?.detail ?? []"
          @load="handleLoadEvent"
        />
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<script setup lang="ts">
import DQAggregationChart from './DQAggregationChart.vue'
import { DQAggregationType } from '@/models/dqAggregationType'
import { DQDistribution, DQDistributionItem } from '@/models/dqDistribution'
import {
  DQAggregationDetailItem,
  DQAggregationDetailItemBuilder,
} from '@/models/dqAggregationDetailItem'
import { ref } from 'vue'
import { getDQAggregationDetail } from '@/api/analysis/overview'
import { DQAggregationDetailItemDto } from '#/dto'
import { MetricEnum } from '@/enums/metricEnum'

type TabData = {
  distribution: DQDistribution
  detail: DQAggregationDetailItem[]
}

const emits = defineEmits<{
  change: [type: DQDistribution, DQAggregationDetailItem[]]
}>()

const initData = () => {
  const map = new Map<DQAggregationType, TabData>()
  for (const type of Object.values(DQAggregationType)) {
    map.set(type, {
      distribution: DQDistribution.default(),
      detail: [],
    })
  }
  return map
}

const data = ref(initData())

async function handleLoadEvent(type: DQAggregationType) {
  await getDQAggregationData(type)
  emitChangeEvent(type)
}

function handleTabChange(name: string) {
  emitChangeEvent(name as DQAggregationType)
}

function emitChangeEvent(name: DQAggregationType) {
  emits(
    'change',
    data.value.get(name)?.distribution ?? DQDistribution.default(),
    data.value.get(name)?.detail ?? [],
  )
}

const valueDigits = 3
async function getDQAggregationData(type: DQAggregationType) {
  try {
    const res = await getDQAggregationDetail(type)
    const detail = res.data.map((item: DQAggregationDetailItemDto) =>
      new DQAggregationDetailItemBuilder()
        .setTime(item.time)
        .setDataSize(item.dataSize)
        .setCompleteness(+item.completeness.toFixed(valueDigits))
        .setConsistency(+item.consistency.toFixed(valueDigits))
        .setTimeliness(+item.timeliness.toFixed(valueDigits))
        .setValidity(+item.validity.toFixed(valueDigits))
        .build(),
    )
    const distribution = dqDetailToDQDistribution(detail)
    data.value.set(type, {
      distribution,
      detail,
    })
  } catch (err) {
    console.log(err)
  }
}

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
</script>
