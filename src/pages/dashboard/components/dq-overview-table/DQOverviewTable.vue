<template>
  <n-card :title="$t('dashboard.overview_table.title')">
    <n-select
      v-model:value="dqType"
      class="mb-4"
      :options="options"
      @update:value="handleSelectValueUpdated"
    />
    <n-data-table :columns="columns" :data="data" />
  </n-card>
</template>

<script setup lang="ts">
import { createColumns } from './table'
import { SelectOption, useMessage } from 'naive-ui'
import { DQOverviewItem, DQOverviewItemBuilder } from '@/models/dataQuality'
import { getDataQualityOverview } from '@/api/dashboard'
import { useIoTDBConfigStore } from '@/stores/iotdbConfig'
import { onMounted, ref } from 'vue'
import { DQOverviewDto } from '#/dto'

defineProps({
  rows: {
    type: Array<DQOverviewItem>,
    default: [],
  },
})

const dqType = ref<string>('time-series')
const options = ref<SelectOption[]>([
  { label: 'Time Series', value: 'time-series' },
  { label: 'Devices', value: 'devices' },
  { label: 'Databases', value: 'databases' },
])
function handleSelectValueUpdated(value: string) {
  getOverview(value)
}

const message = useMessage()
const iotdbConfigStore = useIoTDBConfigStore()
const columns = createColumns({
  click(row: DQOverviewItem) {
    message.info(`Click ${row.name}`)
  },
})
const data = ref<DQOverviewItem[]>([])

async function getOverview(type: string = 'time-series') {
  try {
    const res = await getDataQualityOverview(iotdbConfigStore.config.id, type)
    data.value = res.data.map((x: DQOverviewDto, index: number) => {
      return new DQOverviewItemBuilder()
        .setId(index + 1)
        .setDataSize(x.cnt)
        .setName(x.path)
        .setCompleteness(x.completeness)
        .setConsistency(x.consistency)
        .setTimeliness(x.timeliness)
        .setValidity(x.validity)
        .build()
    })
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  await getOverview()
})
</script>
