<template>
  <div>
    <n-card class="mt-4">
      <DashboardHeader
        :aggregation-info="aggregationInfo"
        :is-aggregation-info-loading="aggregationInfoLoading"
      />

      <!--      <div v-if="tsDataLoading">-->
      <!--        <n-skeleton v-for="n in tsDataPagination.pageSize" text size="small" />-->
      <!--      </div>-->

      <!--      <div v-else class="chart">-->
      <!--        <n-pagination-->
      <!--          style="align-self: flex-end"-->
      <!--          :page="tsDataPagination.page"-->
      <!--          :page-count="tsDataPagination.pageCount"-->
      <!--          @update:page="handleTSDataPageChange"-->
      <!--        />-->
      <!--      </div>-->
    </n-card>

    <TimeSeriesLineChart class="mt-2" />

    <DQOverviewTable class="mt-2" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
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
const aggregationInfo = ref<AggregationInfo>(new AggregationInfo())
const getAggregationData = async () => {
  try {
    const res = await getIoTDBAggregationInfo(iotdbConfigStore.config.id)
    aggregationInfo.value = res.data
  } catch (err) {
    console.log(err)
  } finally {
    aggregationInfoLoading.value = false
  }
}

interface TsInfo {
  names: [string] | []
  dataSizes: [number] | []
}

const tsData = ref<TsInfo>({
  names: [],
  dataSizes: [],
})
const tsDataLoading = ref(true)
const tsDataPagination = reactive({
  page: 1,
  pageCount: 0,
  pageSize: 5,
  itemCount: 0,
})

// const getTSData = async (pageIndex: number = tsDataPagination.page) => {
//   tsDataLoading.value = true
//   try {
//     const res = await getTSDataSize({
//       page_index: pageIndex,
//       page_size: tsDataPagination.pageSize,
//     })
//     tsDataLoading.value = false
//     tsDataPagination.page = res.data.page_index
//     tsDataPagination.itemCount = res.data.total
//     tsDataPagination.pageCount = res.data.page_count
//     tsData.value = {
//       names: res.data.info.map((x: any) => x.name),
//       dataSizes: res.data.info.map((x: any) => x.data_size),
//     }
//   } catch (err) {
//     console.log(err)
//   }
// }

onMounted(async () => {
  if (iotdbConfigStore.config.id === -1) {
    await getIcId()
  }
  await getAggregationData()
  // await getTSData()
})

// function handleTSDataPageChange(currentPage: number) {
//   if (tsDataLoading.value) {
//     // still loading ts data, ignore page change event
//     return
//   }
//   getTSData(currentPage)
// }
</script>

<style scoped>
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.chart {
  display: flex;
  flex-direction: column;
}
</style>
