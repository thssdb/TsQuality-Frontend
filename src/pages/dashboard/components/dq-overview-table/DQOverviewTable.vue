<template>
  <n-card :title="$t('dashboard.overview_table.title')">
    <n-select
      v-model:value="dqType"
      class="mb-4"
      :options="options"
      @update:value="handleSelectValueUpdated"
    />
    <n-data-table
      remote
      :loading="loading"
      :columns="columns"
      :data="data"
      :pagination="pagination"
      @update-page="handlePageChange"
    />
  </n-card>
</template>

<script setup lang="ts">
import { createColumns } from './table'
import { SelectOption, useMessage } from 'naive-ui'
import { getDataQualityOverview } from '@/api/dashboard'
import { onMounted, reactive, ref } from 'vue'
import { DQOverviewStatDto } from '#/dto'
import { DQOverviewItem, DQOverviewItemBuilder } from '@/models/dqOverviewItem'
import { useI18n } from 'vue-i18n'

defineProps({
  rows: {
    type: Array<DQOverviewItem>,
    default: [],
  },
})

const { t } = useI18n()
const dqType = ref<string>('time-series')
const options = ref<SelectOption[]>([
  {
    label: t('dashboard.overview_table.selection.timeseries'),
    value: 'time-series',
  },
  { label: t('dashboard.overview_table.selection.devices'), value: 'devices' },
  {
    label: t('dashboard.overview_table.selection.databases'),
    value: 'databases',
  },
])
const loading = ref(false)
const pagination = reactive({
  itemCount: 0,
  pageSize: 5,
  page: 1,
  showSizePicker: true,
  onChange: (page: number) => {
    pagination.page = page
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize
    pagination.page = 1
  },
})
function handleSelectValueUpdated() {
  getOverview()
}

function handlePageChange(page: number) {
  pagination.page = page
  getOverview()
}

const message = useMessage()
const columns = createColumns({
  click(row: DQOverviewItem) {
    message.info(`Click ${row.name}`)
  },
})
const data = ref<DQOverviewItem[]>([])

function rounded(n: number): number {
  return Math.round(n * 1000) / 1000
}

async function getOverview() {
  try {
    loading.value = true
    const res = await getDataQualityOverview(
      dqType.value,
      pagination.pageSize,
      pagination.page,
    )
    pagination.itemCount = res.data.totalCount
    data.value = res.data.stats.map((x: DQOverviewStatDto, index: number) => {
      return new DQOverviewItemBuilder()
        .setId((pagination.page - 1) * pagination.pageSize + index + 1)
        .setDataSize(x.cnt)
        .setName(x.path)
        .setCompleteness(rounded(x.completeness))
        .setConsistency(rounded(x.consistency))
        .setTimeliness(rounded(x.timeliness))
        .setValidity(rounded(x.validity))
        .build()
    })
    console.log(data.value)
  } catch (err) {
    console.log(err)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await getOverview()
})
</script>
