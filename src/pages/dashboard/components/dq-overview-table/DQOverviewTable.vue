<template>
  <n-card :title="$t('dashboard.overview_table.title')">
    <n-data-table :columns="columns" :data="data" />
  </n-card>
</template>

<script setup lang="ts">
import { createColumns } from './table'
import { useMessage } from 'naive-ui'
import { DQOverviewItem, DQOverviewItemBuilder } from '@/models/dataQuality'
import { getTimeSeriesOverview } from '@/api/dashboard'
import { useIoTDBConfigStore } from '@/stores/iotdbConfig'
import { onMounted, ref } from 'vue'
import { DQOverviewDto } from '#/dto'

defineProps({
  rows: {
    type: Array<DQOverviewItem>,
    default: [],
  },
})

const message = useMessage()
const iotdbConfigStore = useIoTDBConfigStore()
const columns = createColumns({
  click(row: DQOverviewItem) {
    message.info(`Click ${row.name}`)
  },
})
const data = ref<Array<DQOverviewItem>>([])

onMounted(async () => {
  try {
    const res = await getTimeSeriesOverview(iotdbConfigStore.config.id)
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
})
</script>
