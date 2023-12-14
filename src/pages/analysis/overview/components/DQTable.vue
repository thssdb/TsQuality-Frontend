<template>
  <n-card class="mt-4" :title="$t('analysis.overview.table.title')">
    <n-data-table striped :bordered="false" :columns="columns" :data="data" />
  </n-card>
</template>

<script setup lang="ts">
import { computed, h, PropType } from 'vue'
import { NButton } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import { DQAggregationDetailItem } from '@/models/dqAggregationDetailItem'

const props = defineProps({
  dqDetail: {
    type: Object as PropType<DQAggregationDetailItem[]>,
    required: true,
  },
})

type Row = {
  no: number
  time: string
  completeness: number
  consistency: number
  timeliness: number
  validity: number
}

const { t } = useI18n()

const columns = [
  {
    title: 'No',
    key: 'no',
    align: 'center',
  },
  {
    title: t('analysis.overview.table.columns.time'),
    key: 'time',
    align: 'center',
  },
  {
    title: t('global.data_quality.metrics.completeness'),
    key: 'completeness',
    align: 'center',
  },
  {
    title: t('global.data_quality.metrics.consistency'),
    key: 'consistency',
    align: 'center',
  },
  {
    title: t('global.data_quality.metrics.timeliness'),
    key: 'timeliness',
    align: 'center',
  },
  {
    title: t('global.data_quality.metrics.validity'),
    key: 'validity',
  },
  {
    title: t('analysis.overview.table.columns.action'),
    key: 'action',
    render() {
      return h(
        NButton,
        {
          strong: true,
          tertiary: true,
          size: 'small',
        },
        {
          default: () => t('analysis.overview.table.columns.action.view'),
        },
      )
    },
  },
]

const data = computed<Row[]>(
  () =>
    props.dqDetail?.map((item: DQAggregationDetailItem, index: number) => {
      return {
        no: index + 1,
        time: item.time,
        completeness: item.completeness,
        consistency: item.consistency,
        timeliness: item.timeliness,
        validity: item.validity,
      }
    }),
)
</script>
