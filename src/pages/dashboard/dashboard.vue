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
              v-if="aggregationInfoLoading"
              style="width: 100%"
              size="medium"
            />
            <div v-else class="text-3xl">
              {{ aggregationInfo.num_time_series }}
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
              v-if="aggregationInfoLoading"
              style="width: 100%"
              size="medium"
            />
            <div v-else class="text-3xl">{{ aggregationInfo.num_devices }}</div>
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
              v-if="aggregationInfoLoading"
              style="width: 100%"
              size="medium"
            />
            <div v-else class="text-3xl">
              {{ aggregationInfo.num_databases }}
            </div>
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
              v-if="aggregationInfoLoading"
              style="width: 100%"
              size="medium"
            />
            <div v-else class="text-3xl">
              {{ aggregationInfo.num_analysis }}
            </div>
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
import {
  getIoTDBConfigId,
  getIoTDBAggregateInfo,
  getTSDataSize,
} from '@/api/dashboard'
import { useIotdbConfigStore } from '@/stores/iotdbConfig'
import { AirplaneOutline } from '@vicons/ionicons5'
import { Result } from '@/utils/axios/types'

/////////////////////////////////////////////
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
/////////////////////////////////////////////

/////////////////////////////////////////////
// iotdb config related code segment start
const getIcId = async () => {
  try {
    const res = await getIoTDBConfigId(iotdbConfigStore.getIc())
    iotdbConfigStore.icid = (res as Result).data
  } catch (err) {
    console.log(err)
  }
}
/////////////////////////////////////////////

/////////////////////////////////////////////
// aggregation info related code segment start
type AggregationInfo = {
  num_time_series: number
  num_devices: number
  num_databases: number
  num_analysis: number
}

let aggregationInfoLoading = ref(true)
const aggregationInfo = ref<AggregationInfo>({
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
