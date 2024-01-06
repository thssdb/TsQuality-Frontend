<template>
  <n-card :title="$t('analysis.detail.data_distribution.chart.title')">
    <template #header-extra>
      <n-icon size="36">
        <download-outlined />
      </n-icon>
    </template>
    <v-chart
      autoresize
      :option="option"
      :style="{
        width: chartWidth,
        height: chartHeight,
      }"
    />
  </n-card>
</template>

<script setup lang="ts">
import { setupECharts } from '@/utils/lib/echarts'
import { useI18n } from 'vue-i18n'
import { DownloadOutlined } from '@vicons/antd'
import VChart from 'vue-echarts'
import { chartHeight, chartWidth } from '@/pages/analysis/detail/constants'
import { ref } from 'vue'

setupECharts()

const { t } = useI18n()

const option = ref({
  title: {
    left: 'center',
  },
  xAxis: {
    type: 'category',
    data: [
      '4.6-4.7',
      '4.7-4.8',
      '4.8-4.9',
      '4.9-5.0',
      '5.0-5.1',
      '5.2-5.3',
      '5.4-5.5',
      '5.5-5.6',
    ],
  },
  yAxis: {
    name: t('analysis.detail.data_distribution.chart.yaxis.name'),
  },
  series: [
    {
      type: 'bar',
      data: [30, 210, 1502, 1312, 2401, 1439, 1496, 1901],
    },
  ],
  tooltip: {
    show: true,
  },
})
</script>
