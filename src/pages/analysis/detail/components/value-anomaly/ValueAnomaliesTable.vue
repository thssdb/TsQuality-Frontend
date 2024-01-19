<template>
  <n-card :title="$t('analysis.detail.value_anomaly.table.title')">
    <template #header-extra>
      <n-input
        v-model:value="args"
        class="w-64"
        autosize
        style="min-width: 60%"
        :placeholder="
          $t('analysis.detail.value_anomaly.table.args.placeholder')
        "
      />
      <n-select v-model:value="method" class="w-36 ml-4" :options="options" />
    </template>
    <n-data-table striped :bordered="false" :columns="columns" :data="data" />
  </n-card>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import { SelectOption } from 'naive-ui'

type Row = {
  no: number
  timestamp: bigint
  originalValue: number
  repairedValue: number
}

const { t } = useI18n()

const args = ref<string>('')

const method = ref<string>('IQR')
const options = ref<SelectOption[]>([
  { label: 'IQR', value: 'IQR' },
  { label: 'KSigma', value: 'KSigma' },
  { label: 'LOF', value: 'LOF' },
  { label: 'Range', value: 'Range' },
  { label: 'TwoSidedFilter', value: 'TwoSidedFilter' },
  { label: 'Outlier', value: 'Outlier' },
])

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
