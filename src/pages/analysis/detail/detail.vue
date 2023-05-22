<template>
  <div>
    <n-card title="数据分布">
      <template #header-extra>
        <n-icon size="36">
          <download-outlined />
        </n-icon>
      </template>
      <v-chart autoresize :option="barChartOption" :style="{ width, height }" />
    </n-card>

    <n-card title="异常修复">
      <template #header-extra>
        <n-icon size="36">
          <download-outlined />
        </n-icon>
      </template>
      <v-chart
        autoresize
        :option="lineChartOption"
        :style="{ width, height }"
      />
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { DownloadOutlined } from '@vicons/antd'
import { BarChart, LineChart } from 'echarts/charts'
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components'
import { use } from 'echarts/core'
import { SVGRenderer } from 'echarts/renderers'
import { EChartsOption } from 'echarts/types/dist/shared'
import { ref } from 'vue'
import VChart from 'vue-echarts'

use([
  BarChart,
  LineChart,
  SVGRenderer,
  TitleComponent,
  GridComponent,
  TooltipComponent,
  LegendComponent,
])

const height = '300px'
const width = '100%'

const barChartOption = ref<EChartsOption>({
  title: {
    left: 'center',
    text: '数据分布',
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
    name: '数据点数',
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

const lineChartOption = ref<any>({
  title: {
    left: 'center',
    text: '异常修复',
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
    name: '数据值',
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
})
</script>
