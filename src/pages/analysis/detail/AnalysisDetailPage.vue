<template>
  <div>
    <n-card :title="$t('analysis.detail.bar_chart.title')">
      <template #header-extra>
        <n-icon size="36">
          <download-outlined />
        </n-icon>
      </template>
      <v-chart
        autoresize
        :option="barChartOption"
        :style="{
          width: Constants.ChartWidth,
          height: Constants.ChartHeight,
        }"
      />
    </n-card>

    <n-grid
      class="mb-6"
      cols="s:1 m:2"
      responsive="screen"
      :x-gap="Constants.TableXGap"
    >
      <n-grid-item :span="1">
        <TimestampAnomaliesTable />
      </n-grid-item>
      <n-grid-item :span="1">
        <ValueAnomaliesTable />
      </n-grid-item>
    </n-grid>

    <n-card :title="$t('analysis.detail.line_chart.title')">
      <template #header-extra>
        <n-icon size="36">
          <download-outlined />
        </n-icon>
      </template>
      <v-chart
        autoresize
        :option="lineChartOption"
        :style="{ width: Constants.ChartWidth, height: Constants.ChartHeight }"
      />
    </n-card>
    <n-card :title="$t('analysis.detail.line_chart.title')">
      <template #header-extra>
        <n-icon size="36">
          <download-outlined />
        </n-icon>
      </template>
      <v-chart
        autoresize
        :option="lineChartOption"
        :style="{ width: Constants.ChartWidth, height: Constants.ChartHeight }"
      />
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { DownloadOutlined } from '@vicons/antd'
import { ref } from 'vue'
import VChart from 'vue-echarts'
import { useI18n } from 'vue-i18n'
import TimestampAnomaliesTable from '@/pages/analysis/detail/components/TimestampAnomaliesTable.vue'
import ValueAnomaliesTable from '@/pages/analysis/detail/components/ValueAnomaliesTable.vue'
import { EChartsOption } from 'echarts'
import { setupECharts } from '@/utils/lib/echarts'

setupECharts()

const { t } = useI18n()

enum Constants {
  ChartWidth = '100%',
  ChartHeight = '300px',
  TableXGap = 12,
}

const barChartOption = ref({
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
    name: t('analysis.detail.bar_chart.yaxis.name'),
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

const lineChartOption = ref<EChartsOption>({
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
    name: t('analysis.detail.line_chart.yaxis.name'),
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
