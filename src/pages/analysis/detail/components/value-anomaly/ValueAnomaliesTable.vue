<template>
  <n-card :title="$t('analysis.detail.value_anomaly.table.title')">
    <n-data-table striped :bordered="false" :columns="columns" :data="data" />
  </n-card>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

type Row = {
  no: number
  timestamp: bigint
  originalValue: number
  repairedValue: number
}

const { t } = useI18n()

const columns = [
  {
    title: 'no',
    key: 'no',
    align: 'center',
  },
  {
    title: t('analysis.detail.value_anomaly.table.columns.timestamp'),
    key: 'timestamp',
    align: 'center',
  },
  {
    title: t('analysis.detail.value_anomaly.table.columns.original'),
    key: 'originalValue',
    align: 'center',
  },
  {
    title: t('analysis.detail.value_anomaly.table.columns.repaired'),
    key: 'repairedValue',
    align: 'center',
  },
]

const data: Row[] = [
  {
    no: 1,
    timestamp: BigInt(1620000000003),
    originalValue: 1.23,
    repairedValue: 1.23,
  },
  {
    no: 2,
    timestamp: BigInt(1630000000004),
    originalValue: 2.34,
    repairedValue: 2.34,
  },
  {
    no: 3,
    timestamp: BigInt(1640000000005),
    originalValue: 3.45,
    repairedValue: 3.45,
  },
  {
    no: 4,
    timestamp: BigInt(1650000000006),
    originalValue: 4.56,
    repairedValue: 4.56,
  },
  {
    no: 5,
    timestamp: BigInt(1660000000007),
    originalValue: 5.67,
    repairedValue: 5.67,
  },
]
</script>
