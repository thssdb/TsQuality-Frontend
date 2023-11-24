<template>
  <n-card :title="$t('dashboard.overview_table.title')">
    <n-data-table :columns="columns" :data="data" />
  </n-card>
</template>

<script setup lang="ts">
import { createColumns, getData } from './table'
import { useMessage } from 'naive-ui'
import { DQOverviewItem } from '@/models/dataQuality'

defineProps({
  rows: {
    type: Array<DQOverviewItem>,
    default: [],
  },
})

const message = useMessage()
const columns = createColumns({
  click(row: DQOverviewItem) {
    message.info(`Click ${row.name}`)
  },
})
const data = getData()
</script>
