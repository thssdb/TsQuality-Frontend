<template>
  <div>
    <n-card class="mt-4">
      <DashboardHeader
        :aggregation-info="aggregationInfo"
        :is-aggregation-info-loading="aggregationInfoLoading"
      />
    </n-card>

    <TimeSeriesLineChart class="mt-2" />

    <DQOverviewTable class="mt-2" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getIoTDBAggregationInfo, getIoTDBConfigId } from '@/api/dashboard'
import { useIoTDBConfigStore } from '@/stores/iotdbConfig'

import DashboardHeader from './components/DashboardHeader.vue'
import { AggregationInfo } from '@/models/dataQuality'
import DQOverviewTable from './components/dq-overview-table/DQOverviewTable.vue'
import TimeSeriesLineChart from '@/pages/dashboard/components/TimeSeriesLineChart.vue'

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
const aggregationInfo = ref(new AggregationInfo())
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
  await getAggregationData()
})
</script>

<style scoped></style>
