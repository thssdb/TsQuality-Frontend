<template>
  <div>
    <div v-if="percentage != 100">
      <PreAggregationProgress :percentage="percentage" />
    </div>
    <div v-else>
      <n-card class="mt-4">
        <DashboardHeader
          :aggregation-info="aggregationInfo"
          :is-aggregation-info-loading="aggregationInfoLoading"
        />
      </n-card>

      <TimeSeriesLineChart class="mt-2" />

      <DQOverviewTable class="mt-2" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  getIoTDBAggregationInfo,
  getIoTDBConfigId,
  getPreAggregationProgress,
} from '@/api/dashboard'
import { useIoTDBConfigStore } from '@/stores/iotdbConfig'

import DashboardHeader from './components/DashboardHeader.vue'
import { AggregationInfo } from '@/models/dataQuality'
import DQOverviewTable from './components/dq-overview-table/DQOverviewTable.vue'
import TimeSeriesLineChart from '@/pages/dashboard/components/TimeSeriesLineChart.vue'
import PreAggregationProgress from '@/pages/dashboard/components/PreAggregationProgress.vue'

let percentage = ref(0)

let iotdbConfigStore = useIoTDBConfigStore()
const getIcId = async () => {
  try {
    const res = await getIoTDBConfigId(iotdbConfigStore.config)
    iotdbConfigStore.config.id = res.data
  } catch (err) {
    console.log(err)
  }
}

const aggregationInfoLoading = ref(true)
const aggregationInfo = ref(new AggregationInfo(0, 0, 0, 0))
const getAggregationData = async () => {
  try {
    const res = await getIoTDBAggregationInfo()
    aggregationInfo.value = res.data
  } catch (err) {
    console.log(err)
  } finally {
    aggregationInfoLoading.value = false
  }
}

onMounted(async () => {
  if (iotdbConfigStore.config.id === -1) {
    await getIcId()
  }
  while (percentage.value != 100) {
    const res = await getPreAggregationProgress()
    percentage.value =
      +Number(res.data.processedFileCount / res.data.totalFileCount).toFixed(
        3,
      ) * 100
    setTimeout(() => {}, 1000)
  }
  await getAggregationData()
})
</script>

<style scoped></style>
