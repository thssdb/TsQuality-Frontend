<template>
  <div>
    <div class="layout-upper">
      <n-card>
        <n-grid x-gap="12" responsive="screen" cols="2 s:1 m:2 l:2 xl:2 2xl:2">
          <n-grid-item>
            <n-card>
              <n-tabs type="line" animated>
                <n-tab-pane
                  name="tab-day"
                  :tab="$t('analysis.overview.aggregation.data_size.tabs.day')"
                >
                  <v-chart
                    autoresize
                    :option="countChartOption"
                    :style="{ width: chartWidth, height: chartHeight }"
                  />
                  <v-chart
                    autoresize
                    :option="metricChartOption"
                    :style="{ width: chartWidth, height: chartHeight }"
                  />
                </n-tab-pane>
                <n-tab-pane
                  name="tab-month"
                  :tab="
                    $t('analysis.overview.aggregation.data_size.tabs.month')
                  "
                >
                  <v-chart
                    autoresize
                    :option="countChartOption"
                    :style="{ width: chartWidth, height: chartHeight }"
                  />
                  <v-chart
                    autoresize
                    :option="metricChartOption"
                    :style="{ width: chartWidth, height: chartHeight }"
                  />
                </n-tab-pane>
                <n-tab-pane
                  name="tab-year"
                  :tab="$t('analysis.overview.aggregation.data_size.tabs.year')"
                >
                  <v-chart
                    autoresize
                    :option="countChartOption"
                    :style="{ width: chartWidth, height: chartHeight }"
                  />
                  <v-chart
                    autoresize
                    :option="metricChartOption"
                    :style="{ width: chartWidth, height: chartHeight }"
                  />
                </n-tab-pane>
              </n-tabs>
            </n-card>
          </n-grid-item>

          <n-grid-item>
            <n-card>
              <n-tabs type="line" animated>
                <n-tab-pane
                  name="tab-result"
                  :tab="$t('analysis.overview.pie_chart.title')"
                >
                  <n-grid x-gap="12" y-gap="8" responsive="screen" cols="1">
                    <n-grid-item>
                      <!-- <v-chart autoresize :option="proportionChartOption" :style="{ width: chartWidth, height: chartHeight }" />
                                        </n-grid-item>

                                        <n-grid-item>
                                            <v-chart autoresize :option="proportionChartOption" :style="{ width: chartWidth, height: chartHeight }" />
                                        </n-grid-item>

                                        <n-grid-item>
                                            <v-chart autoresize :option="proportionChartOption" :style="{ width: chartWidth, height: chartHeight }" />
                                        </n-grid-item>

                                        <n-grid-item> -->
                      <v-chart
                        autoresize
                        :option="proportionChartOption"
                        :style="{ width: '100%', height: '600px' }"
                      />
                    </n-grid-item>
                  </n-grid>
                </n-tab-pane>
              </n-tabs>
            </n-card>
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
import { MetricEnum } from '@/enums/metricEnum'
import { BarChart, PieChart } from 'echarts/charts'
import {
  DatasetComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  VisualMapComponent,
} from 'echarts/components'
import { use } from 'echarts/core'
import { SVGRenderer } from 'echarts/renderers'
import { NButton } from 'naive-ui'
import { h, ref } from 'vue'
import VChart from 'vue-echarts'
import { useI18n } from 'vue-i18n'

use([
  BarChart,
  PieChart,
  SVGRenderer,
  TitleComponent,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DatasetComponent,
  VisualMapComponent,
])

const i18n = useI18n()

const chartHeight = '300px'
const chartWidth = '100%'

const countChartOption = ref<any>({
  title: {
    left: 'center',
    text: i18n.t('analysis.overview.aggregation.data_size.bar_chart.title'),
  },
  xAxis: {
    data: ['11.15', '11.16', '11.17', '11.18', '11.19', '11.20', '11.21'],
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      name: i18n.t('analysis.overview.aggregation.data_size.bar_chart.title'),
      data: [30, 210, 1502, 1312, 2401, 1439, 1496],
    },
  ],
  tooltip: {
    show: true,
  },
})

const metricChartOption = ref<any>({
  title: {
    left: 'center',
    text: i18n.t('analysis.overview.aggregation.data_quality.bar_chart.title'),
  },
  xAxis: {
    data: ['11.15', '11.16', '11.17', '11.18', '11.19', '11.20', '11.21'],
  },
  yAxis: {},
  legend: {
    show: true,
    top: 'bottom',
  },
  series: [
    {
      type: 'bar',
      name: i18n.t('global.data_quality.metrics.completeness'),
      data: [0.02, 0.13, 0.44, 0.38, 0.69, 0.42, 0.47],
    },
    {
      type: 'bar',
      name: i18n.t('global.data_quality.metrics.consistency'),
      data: [0.02, 0.13, 0.44, 0.38, 0.69, 0.42, 0.47],
    },
    {
      type: 'bar',
      name: i18n.t('global.data_quality.metrics.timeliness'),
      data: [0.02, 0.13, 0.44, 0.38, 0.69, 0.42, 0.47],
    },
    {
      type: 'bar',
      name: i18n.t('global.data_quality.metrics.validity'),
      data: [0.02, 0.13, 0.44, 0.38, 0.69, 0.42, 0.47],
    },
  ],
  tooltip: {
    show: true,
  },
})

const proportionChartOption = ref<any>({
  legend: {},
  tooltip: {},
  // visualMap: {
  //     type: 'continuous',
  //     min: 0,
  //     max: 1,
  // },
  // color: ['#9bddaa', '#b0bf99', '#e9ff00', '#d98278', '#ed6367'],
  label: {
    show: false,
    position: 'center',
  },
  labelLine: {
    show: false,
  },
  dataset: {
    source: [
      [
        'metirc',
        MetricEnum.COMPLETENESS,
        MetricEnum.CONSISTENCY,
        MetricEnum.TIMELINESS,
        MetricEnum.VALIDITY,
      ],
      ['[0.0-0.6)', 0.2, 0.4, 0.1, 0.1],
      ['[0.6-0.7)', 0.3, 0.2, 0.4, 0.1],
      ['[0.7-0.8)', 0.1, 0.3, 0.2, 0.4],
      ['[0.8-0.9)', 0.1, 0.1, 0.3, 0.2],
      ['[0.9-1.0]', 0.4, 0.1, 0.1, 0.3],
    ],
  },
  series: [
    {
      type: 'pie',
      radius: ['25%', '35%'],
      center: ['25%', '30%'],
      encode: {
        itemName: 0,
        value: MetricEnum.COMPLETENESS,
      },
    },
    {
      type: 'pie',
      radius: ['25%', '35%'],
      center: ['75%', '30%'],
      encode: {
        itemName: 0,
        value: MetricEnum.CONSISTENCY,
      },
    },
    {
      type: 'pie',
      radius: ['25%', '35%'],
      center: ['25%', '75%'],
      encode: {
        itemName: 0,
        value: MetricEnum.TIMELINESS,
      },
    },
    {
      type: 'pie',
      radius: ['25%', '35%'],
      center: ['75%', '75%'],
      encode: {
        itemName: 0,
        value: MetricEnum.VALIDITY,
      },
    },
  ],
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
        { default: () => i18n.t('analysis.overview.table.columns.action.view') }
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
