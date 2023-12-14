<template>
  <n-card>
    <n-tabs type="line" animated>
      <!-- NOTICE: here `display-directive` must be set to `show:lazy` -->
      <!-- otherwise the last two charts will collapse to 100px*100px  -->
      <n-tab-pane
        display-directive="show:lazy"
        :name="DQAggregationType.DAY"
        :tab="$t('analysis.overview.aggregation.data_size.tabs.day')"
      >
        <DQAggregationChart
          :type="DQAggregationType.DAY"
          @change="handleChangeEvent"
        />
      </n-tab-pane>
      <n-tab-pane
        display-directive="show:lazy"
        :name="DQAggregationType.MONTH"
        :tab="$t('analysis.overview.aggregation.data_size.tabs.month')"
      >
        <DQAggregationChart
          :type="DQAggregationType.MONTH"
          @change="handleChangeEvent"
        />
      </n-tab-pane>
      <n-tab-pane
        display-directive="show:lazy"
        :name="DQAggregationType.YEAR"
        :tab="$t('analysis.overview.aggregation.data_size.tabs.year')"
      >
        <DQAggregationChart
          :type="DQAggregationType.YEAR"
          @change="handleChangeEvent"
        />
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<script setup lang="ts">
import DQAggregationChart from './DQAggregationChart.vue'
import { DQAggregationType } from '@/models/dqAggregationType'
import { DQDistribution } from '@/models/dqDistribution'
import { DQAggregationDetailItem } from '@/models/dqAggregationDetailItem'

const emits = defineEmits<{
  change: [type: DQDistribution, DQAggregationDetailItem[]]
}>()

function handleChangeEvent(
  dqDistribution: DQDistribution,
  dqDetail: DQAggregationDetailItem[],
) {
  emits('change', dqDistribution, dqDetail)
}
</script>
