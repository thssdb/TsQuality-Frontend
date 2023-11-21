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
        class="mb-8"
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
import { useI18n } from 'vue-i18n'
import { onMounted, reactive, ref } from 'vue'
import { AirplaneOutline } from '@vicons/ionicons5'
import TimeSeriesCount from './components/TimeSeriesCount.vue'
import HistoryTask from '../history/components/HistoryTask.vue'
import {
  getIoTDBConfigId,
  getIoTDBAggregateInfo,
  getTSDataSize,
} from '@/api/dashboard'
import { useIotdbConfigStore } from '@/stores/iotdbConfig'
import { Result } from '@/utils/axios/types'
import DashboardHeader from '@/pages/dashboard/components/DashboardHeader.vue'

/// //////////////////////////////////////////
// page lifecycle function code segment start
const iotdbConfigStore = useIotdbConfigStore()
onMounted(async () => {
  if (iotdbConfigStore.icid === -1) {
    await getIcId()
  }
  getAggregationData()
  getTSData()
})
// page lifecycle function code segment start
/// //////////////////////////////////////////

/// //////////////////////////////////////////
// iotdb config related code segment start
const getIcId = async () => {
  try {
    const res = await getIoTDBConfigId(iotdbConfigStore.getIc())
    iotdbConfigStore.icid = (res as Result).data
  } catch (err) {
    iotdbConfigStore.icid = 1
    console.log(err)
  }
}
/// //////////////////////////////////////////

/// //////////////////////////////////////////
// aggregation info related code segment start
const aggregationInfoLoading = ref(true)
const aggregationInfo = ref({
  num_time_series: 0,
  num_devices: 0,
  num_databases: 0,
  num_analysis: 0,
})

const getAggregationData = () => {
  getIoTDBAggregateInfo(iotdbConfigStore.icid)
    .then((res: any) => {
      aggregationInfo.value = res.data
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      aggregationInfoLoading.value = false
    })
}
// aggregate info related code segment end
/// //////////////////////////////////////////

/// //////////////////////////////////////////
// timeseries info related code segment start
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

const getTSData = (page_index: number = tsDataPagination.page) => {
  tsDataLoading.value = true
  getTSDataSize({
    page_index,
    page_size: tsDataPagination.pageSize,
  })
    .then((res: any) => {
      tsDataLoading.value = false
      tsDataPagination.page = res.data.page_index
      tsDataPagination.itemCount = res.data.total
      tsDataPagination.pageCount = res.data.page_count
      tsData.value = {
        names: res.data.info.map((x: any) => x.name),
        dataSizes: res.data.info.map((x: any) => x.data_size),
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

function handleTSDataPageChange(currentPage: number) {
  if (tsDataLoading.value) {
    // still loading ts data, ignore page change event
    return
  }
  getTSData(currentPage)
}
// timeseries info related code segment end
/// //////////////////////////////////////////

const i18n = useI18n()
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
