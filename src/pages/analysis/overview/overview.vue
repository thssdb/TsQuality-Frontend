<template>
  <div>
    <div class="layout-upper">
      <n-card>
        <n-grid x-gap="12" responsive="screen" cols="2 s:1 m:2 l:2 xl:2 2xl:2">
          <n-grid-item>
            <Header @change="handleDQDataChangeEvent" />
          </n-grid-item>

          <n-grid-item>
            <DQDistributionChart :distribution="dqDistribution" />
          </n-grid-item>
        </n-grid>
      </n-card>
    </div>

    <div class="layout-bottom">
      <n-card class="mt-4" :title="$t('analysis.overview.table.title')">
        <n-data-table
          striped
          :bordered="false"
          :columns="columns"
          :data="analysisResults"
        />
      </n-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NButton } from 'naive-ui'
import { h, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { EChartsOption } from 'echarts'
import Header from '@/pages/analysis/overview/components/OverviewPageHeader.vue'
import { DQDistribution } from '@/models/dqDistribution'
import DQDistributionChart from '@/pages/analysis/overview/components/DQDistributionChart.vue'

const i18n = useI18n()

const dqDistribution = ref<DQDistribution>(DQDistribution.default())

function handleDQDataChangeEvent(data: DQDistribution) {
  dqDistribution.value = data
}

const proportionChartOption = ref<EChartsOption>({
  legend: {},
  tooltip: {},
  label: {
    show: false,
    position: 'center',
  },
  labelLine: {
    show: false,
  },
  dataset: {},
})

type Row = {
  no: number
  time: string
  completeness: number
  consistency: number
  timeliness: number
  validity: number
}

const columns = [
  {
    title: 'No',
    key: 'no',
    align: 'center',
  },
  {
    title: i18n.t('analysis.overview.table.columns.time'),
    key: 'time',
    align: 'center',
  },
  {
    title: i18n.t('global.data_quality.metrics.completeness'),
    key: 'completeness',
    align: 'center',
  },
  {
    title: i18n.t('global.data_quality.metrics.consistency'),
    key: 'consistency',
    align: 'center',
  },
  {
    title: i18n.t('global.data_quality.metrics.timeliness'),
    key: 'timeliness',
    align: 'center',
  },
  {
    title: i18n.t('global.data_quality.metrics.validity'),
    key: 'validity',
  },
  {
    title: i18n.t('analysis.overview.table.columns.action'),
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
          default: () => i18n.t('analysis.overview.table.columns.action.view'),
        },
      )
    },
  },
]

const analysisResults: Row[] = [
  {
    no: 1,
    time: '11.15',
    completeness: 0.91,
    consistency: 0.83,
    timeliness: 0.64,
    validity: 0.72,
  },
  {
    no: 2,
    time: '11.16',
    completeness: 0.91,
    consistency: 0.83,
    timeliness: 0.64,
    validity: 0.72,
  },
  {
    no: 3,
    time: '11.17',
    completeness: 0.91,
    consistency: 0.83,
    timeliness: 0.64,
    validity: 0.72,
  },
  {
    no: 4,
    time: '11.18',
    completeness: 0.91,
    consistency: 0.83,
    timeliness: 0.64,
    validity: 0.72,
  },
  {
    no: 5,
    time: '11.19',
    completeness: 0.91,
    consistency: 0.83,
    timeliness: 0.64,
    validity: 0.72,
  },
  {
    no: 6,
    time: '11.20',
    completeness: 0.91,
    consistency: 0.83,
    timeliness: 0.64,
    validity: 0.72,
  },
  {
    no: 7,
    time: '11.21',
    completeness: 0.91,
    consistency: 0.83,
    timeliness: 0.64,
    validity: 0.72,
  },
]
</script>
