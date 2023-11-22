<template>
  <div class="empty" v-if="iotdbConfigStore.icid === -1">
    <n-empty
      :description="$t('global.empty_iotdb_config.description')"
      class="mt-24"
    >
      <template #icon>
        <n-icon>
          <AirplaneOutline />
        </n-icon>
      </template>
    </n-empty>
    <div class="mt-10">
      <n-button type="primary">
        {{ $t('dashboard.empty.button.name') }}
      </n-button>
    </div>
  </div>
  <div v-else>
    <n-card class="mt-4">
      <DashboardHeader
        :aggregation-info="aggregationInfo"
        :is-aggregation-info-loading="aggregationInfoLoading"
      />

      <div v-if="tsDataLoading">
        <n-skeleton v-for="n in tsDataPagination.pageSize" text size="small" />
      </div>

      <div class="chart" v-else>
        <TimeSeriesCount v-bind="tsData" />
        <n-pagination
          style="align-self: flex-end"
          :page="tsDataPagination.page"
          :page-count="tsDataPagination.pageCount"
          @update:page="handleTSDataPageChange"
        />
      </div>
    </n-card>

    <HistoryTask />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { AirplaneOutline } from '@vicons/ionicons5'
import TimeSeriesCount from './components/TimeSeriesCount.vue'
import HistoryTask from '../history/components/HistoryTask.vue'
import {
  getIoTDBConfigId,
  getIoTDBAggregationInfo,
  getTSDataSize,
} from '@/api/dashboard'
import { useIotdbConfigStore } from '@/stores/iotdbConfig'
import DashboardHeader from './components/DashboardHeader.vue'
import { AggregationInfo } from '#/dataQuality'

const iotdbConfigStore = useIotdbConfigStore()
const getIcId = async () => {
  try {
    const res = await getIoTDBConfigId(iotdbConfigStore.getIc())
    iotdbConfigStore.icid = res
  } catch (err) {
    iotdbConfigStore.icid = 1
    console.log(err)
  }
}

const aggregationInfoLoading = ref(true)
const aggregationInfo = ref<AggregationInfo>({
  numDataPoints: 0,
  numTimeSeries: 0,
  numDevices: 0,
  numDatabases: 0,
  completeness: 0,
  consistency: 0,
  timeliness: 0,
  validity: 0,
})
const getAggregationData = async () => {
  try {
    const res = await getIoTDBAggregationInfo(iotdbConfigStore.icid)
    aggregationInfo.value = res
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

const getTSData = async (pageIndex: number = tsDataPagination.page) => {
  tsDataLoading.value = true
  try {
    const res = await getTSDataSize({
      page_index: pageIndex,
      page_size: tsDataPagination.pageSize,
    })
    tsDataLoading.value = false
    tsDataPagination.page = res.data.page_index
    tsDataPagination.itemCount = res.data.total
    tsDataPagination.pageCount = res.data.page_count
    tsData.value = {
      names: res.data.info.map((x: any) => x.name),
      dataSizes: res.data.info.map((x: any) => x.data_size),
    }
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  if (iotdbConfigStore.icid === -1) {
    await getIcId()
  }
  await getAggregationData()
  // await getTSData()
})

function handleTSDataPageChange(currentPage: number) {
  if (tsDataLoading.value) {
    // still loading ts data, ignore page change event
    return
  }
  getTSData(currentPage)
}
// timeseries info related code segment end
/// //////////////////////////////////////////
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
