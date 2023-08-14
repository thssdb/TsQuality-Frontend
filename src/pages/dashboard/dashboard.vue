<template>
  <div>
    <n-grid
      cols="1 s:2 m:3 l:4 xl:4 2xl:4"
      responsive="screen"
      :x-gap="12"
      :y-gap="8"
    >
      <n-grid-item>
        <n-card
          hoverable
          size="small"
          :title="$t('dashboard.total_count.time_series.title')"
          :bordered="false"
          :segmented="{ content: true, footer: true }"
        >
          <template #header-extra>
            <n-tag type="success">
              {{ $t('dashboard.total_count.time_series.tag') }}
            </n-tag>
          </template>

          <div class="px-1 py-1">
            <n-skeleton
              v-if="aggregateInfoLoading"
              style="width: 100%"
              size="medium"
            />
            <div v-else class="text-3xl">
              {{ aggregateInfo.time_series_num }}
            </div>
          </div>
        </n-card>
      </n-grid-item>

      <n-grid-item>
        <n-card
          hoverable
          size="small"
          :title="$t('dashboard.total_count.device.title')"
          :bordered="false"
          :segmented="{ content: true, footer: true }"
        >
          <template #header-extra>
            <n-tag type="info">
              {{ $t('dashboard.total_count.device.tag') }}
            </n-tag>
          </template>

          <div class="px-1 py-1">
            <n-skeleton
              v-if="aggregateInfoLoading"
              style="width: 100%"
              size="medium"
            />
            <div v-else class="text-3xl">{{ aggregateInfo.device_num }}</div>
          </div>
        </n-card>
      </n-grid-item>

      <n-grid-item>
        <n-card
          hoverable
          size="small"
          :title="$t('dashboard.total_count.database.title')"
          :bordered="false"
          :segmented="{ content: true, footer: true }"
        >
          <template #header-extra>
            <n-tag type="warning">
              {{ $t('dashboard.total_count.database.tag') }}
            </n-tag>
          </template>

          <div class="px-1 py-1">
            <n-skeleton
              v-if="aggregateInfoLoading"
              style="width: 100%"
              size="medium"
            />
            <div v-else class="text-3xl">{{ aggregateInfo.database_num }}</div>
          </div>
        </n-card>
      </n-grid-item>

      <n-grid-item>
        <n-card
          hoverable
          size="small"
          :title="$t('dashboard.total_count.analysis.title')"
          :bordered="false"
          :segmented="{ content: true, footer: true }"
        >
          <template #header-extra>
            <n-tag type="error">
              {{ $t('dashboard.total_count.analysis.tag') }}
            </n-tag>
          </template>

          <div class="px-1 py-1">
            <n-skeleton
              v-if="aggregateInfoLoading"
              style="width: 100%"
              size="medium"
            />
            <div v-else class="text-3xl">{{ aggregateInfo.analysis_num }}</div>
          </div>
        </n-card>
      </n-grid-item>
    </n-grid>

    <n-card class="mt-4">
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
import TimeSeriesCount from './components/TimeSeriesCount.vue'
import HistoryTask from '../history/components/HistoryTask.vue'
import { getIoTDBAggregateInfo, getTSDataSize } from '@/api/dashboard'
import { use } from 'echarts'

/////////////////////////////////////////////
// page lifecycle function code segment start
onMounted(async () => {
  getAggregateData()
  getTSData()
})
// page lifecycle function code segment start
/////////////////////////////////////////////

/////////////////////////////////////////////
// aggregate info related code segment start
type AggregateInfo = {
  time_series_num: number
  device_num: number
  database_num: number
  analysis_num: number
}

let aggregateInfoLoading = ref(true)
const aggregateInfo = ref<AggregateInfo>({
  time_series_num: 0,
  device_num: 0,
  database_num: 0,
  analysis_num: 0,
})

const getAggregateData = () => {
  getIoTDBAggregateInfo()
    .then((res: any) => {
      aggregateInfo.value = res.data
      aggregateInfoLoading.value = false
    })
    .catch((err) => {
      console.log(err)
      aggregateInfoLoading.value = false
    })
}
// aggregate info related code segment end
/////////////////////////////////////////////

/////////////////////////////////////////////
// timeseries info related code segment start
interface TsInfo {
  names: [string] | []
  dataSizes: [number] | []
}

let tsData = ref<TsInfo>({
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
/////////////////////////////////////////////

const i18n = useI18n()
</script>

<style scoped>
.chart {
  display: flex;
  flex-direction: column;
}
</style>
