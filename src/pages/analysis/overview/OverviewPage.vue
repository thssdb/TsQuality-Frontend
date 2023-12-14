<template>
  <div>
    <div class="layout-upper">
      <n-card>
        <n-grid x-gap="12" responsive="screen" cols="2 s:1 m:2 l:2 xl:2 2xl:2">
          <n-grid-item>
            <Header @change="handleDQDataChangeEvent" />
          </n-grid-item>

          <n-grid-item>
            <DQDistributionChart :distribution="dqDistribution" />
          </n-grid-item>
        </n-grid>
      </n-card>
    </div>

    <div class="layout-bottom">
      <DQTable :dq-detail="dqDetail" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Header from '@/pages/analysis/overview/components/OverviewPageHeader.vue'
import { DQDistribution } from '@/models/dqDistribution'
import DQDistributionChart from '@/pages/analysis/overview/components/DQDistributionChart.vue'
import DQTable from '@/pages/analysis/overview/components/DQTable.vue'
import { DQAggregationDetailItem } from '@/models/dqAggregationDetailItem'

const dqDistribution = ref<DQDistribution>(DQDistribution.default())
const dqDetail = ref<DQAggregationDetailItem[]>([])

function handleDQDataChangeEvent(
  distribution: DQDistribution,
  detail: DQAggregationDetailItem[],
) {
  dqDistribution.value = distribution
  dqDetail.value = detail
}
</script>
