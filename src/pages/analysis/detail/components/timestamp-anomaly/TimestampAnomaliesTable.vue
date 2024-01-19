<template>
  <n-card :title="$t('analysis.detail.timestamp_anomaly.table.title')">
    <template #header-extra>
      <n-input-number
        v-model:value="interval"
        clearable
        :placeholder="
          $t(
            'analysis.detail.timestamp_anomaly.table.time_interval.placeholder',
          )
        "
        :validator="intervalValidator"
      />
      <n-select
        v-model:value="method"
        class="w-36 ml-4"
        :options="options"
        @update:value="handleMethodValueUpdated"
      >
      </n-select>
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
  originalTimestamp: bigint
  repairedTimestamp: bigint
}

const { t } = useI18n()

const interval = ref<number>()
function intervalValidator(x: number): boolean {
  return Number.isInteger(x) && x > 0
}

const method = ref<string>('median')
const options = ref<SelectOption[]>([
  { label: 'Median', value: 'median' },
  { label: 'Mode', value: 'mode' },
  { label: 'Cluster', value: 'cluster' },
])
function handleMethodValueUpdated(value: string) {
  console.log(value)
}

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
