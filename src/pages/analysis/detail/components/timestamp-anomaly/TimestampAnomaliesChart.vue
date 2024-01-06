<template>
  <n-card
    class="mt-4"
    :title="$t('analysis.detail.timestamp_anomaly.chart.title')"
  >
    <template #header-extra>
      <n-icon :size="downloadIconSize">
        <download-outlined />
      </n-icon>
    </template>
    <v-chart
      autoresize
      :option="option"
      :style="{ width: chartWidth, height: chartHeight }"
    />
  </n-card>
</template>

<script setup lang="ts">
import {
  chartHeight,
  chartWidth,
  downloadIconSize,
} from '@/pages/analysis/detail/constants'
import { DownloadOutlined } from '@vicons/antd'
import VChart from 'vue-echarts'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import { EChartsOption } from 'echarts'

const { t } = useI18n()

const option = ref<EChartsOption>({
  title: {
    left: 'center',
  },
  xAxis: {
    type: 'category',
    data: [
      '13:13',
      '13:14',
      '13:15',
      '13:16',
      '13:17',
      '13:18',
      '13:19',
      '13:20',
    ],
  },
  yAxis: {
    name: t('analysis.detail.timestamp_anomaly.chart.yaxis.name'),
  },
  series: [
    {
      type: 'line',
      data: [30, 210, 1502, 1312, 2401, 1439, 1496, 1901],
    },
    {
      type: 'line',
      data: [40, 10, 102, 1812, 1401, 1439, 1496, 1701],
    },
  ],
  tooltip: {
    show: true,
  },
})
</script>
