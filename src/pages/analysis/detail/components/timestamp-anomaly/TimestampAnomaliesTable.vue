<template>
  <n-card :title="$t('analysis.detail.timestamp_anomaly.table.title')">
    <n-data-table striped :bordered="false" :columns="columns" :data="data" />
  </n-card>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

type Row = {
  no: number
  originalTimestamp: bigint
  repairedTimestamp: bigint
}

const { t } = useI18n()

const columns = [
  {
    title: 'No',
    key: 'no',
    align: 'center',
  },
  {
    title: t('analysis.detail.timestamp_anomaly.table.columns.original'),
    key: 'originalTimestamp',
    align: 'center',
  },
  {
    title: t('analysis.detail.timestamp_anomaly.table.columns.repaired'),
    key: 'repairedTimestamp',
    align: 'center',
  },
]

const data: Row[] = [
  {
    no: 1,
    originalTimestamp: BigInt(1620000000003),
    repairedTimestamp: BigInt(1620000000000),
  },
  {
    no: 2,
    originalTimestamp: BigInt(1630000000004),
    repairedTimestamp: BigInt(1630000000000),
  },
  {
    no: 3,
    originalTimestamp: BigInt(1640000000005),
    repairedTimestamp: BigInt(1640000000000),
  },
  {
    no: 4,
    originalTimestamp: BigInt(1650000000006),
    repairedTimestamp: BigInt(1650000000000),
  },
  {
    no: 5,
    originalTimestamp: BigInt(1660000000007),
    repairedTimestamp: BigInt(1660000000000),
  },
]
</script>
