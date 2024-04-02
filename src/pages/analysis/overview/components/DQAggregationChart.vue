<template>
  <v-chart
    autoresize
    :option="dataSizeBarChartOption"
    :style="{ width, height }"
  />
  <v-chart
    autoresize
    :option="dataQualityBarChartOption"
    :style="{ width, height }"
  />
</template>

<script setup lang="ts">
import VChart from 'vue-echarts'
import { setupECharts } from '@/utils/lib/echarts'
import { computed, PropType, reactive } from 'vue'
import { EChartsOption } from 'echarts'
import { useI18n } from 'vue-i18n'
import { DQAggregationDetailItem } from '@/models/dqAggregationDetailItem'
import { CHART_FONT_SIZE, X_AXIS_LABEL_FORMATTER } from '@/common/constants'

const props = defineProps({
  data: {
    type: Object as PropType<DQAggregationDetailItem[]>,
    required: true,
  },
})

setupECharts()

const { t } = useI18n()

const width = '100%'
const height = '40vh'

const dataSizeXAxisData = computed(() => {
  return props.data?.map((item) => item.time) ?? []
})
const dataSizeYAxisData = computed(() => {
  return props.data?.map((item) => item.dataSize) ?? []
})
const dataSizeBarChartOption = reactive<EChartsOption>({
  title: {
    left: 'center',
    text: t('analysis.overview.aggregation.data_size.bar_chart.title'),
    textStyle: {
      fontSize: CHART_FONT_SIZE,
    },
  },
  xAxis: {
    data: dataSizeXAxisData as unknown as string[],
    axisLabel: {
      fontSize: CHART_FONT_SIZE,
      formatter: X_AXIS_LABEL_FORMATTER,
    },
  },
  yAxis: {
    nameTextStyle: {
      fontSize: CHART_FONT_SIZE,
    },
    axisLabel: {
      fontSize: CHART_FONT_SIZE,
    },
  },
  series: {
    type: 'bar',
    name: t('analysis.overview.aggregation.data_size.bar_chart.title'),
    data: dataSizeYAxisData as unknown as number[],
  },
  grid: {
    left: '2%',
    right: '2%',
    containLabel: true,
  },
  tooltip: {
    show: true,
    textStyle: {
      fontSize: CHART_FONT_SIZE,
    },
  },
})

const dataQualityXAxisData = computed(() => {
  return props.data?.map((item) => item.time) ?? []
})
const dataQualityYAxisData = computed(() => {
  return (
    props.data?.map((item) => {
      return {
        completeness: item.completeness,
        consistency: item.consistency,
        timeliness: item.timeliness,
        validity: item.validity,
      }
    }) ?? []
  )
})
const completenessData = computed(() => {
  return dataQualityYAxisData.value.map((item) => item.completeness)
})
const consistencyData = computed(() => {
  return dataQualityYAxisData.value.map((item) => item.consistency)
})
const timelinessData = computed(() => {
  return dataQualityYAxisData.value.map((item) => item.timeliness)
})
const validityData = computed(() => {
  return dataQualityYAxisData.value.map((item) => item.validity)
})
const dataQualityBarChartOption = reactive<EChartsOption>({
  title: {
    left: 'center',
    text: t('analysis.overview.aggregation.data_quality.bar_chart.title'),
    textStyle: {
      fontSize: CHART_FONT_SIZE,
    },
  },
  xAxis: {
    data: dataQualityXAxisData as unknown as string[],
    axisLabel: {
      fontSize: CHART_FONT_SIZE,
      formatter: X_AXIS_LABEL_FORMATTER,
    },
  },
  yAxis: {
    axisLabel: {
      fontSize: CHART_FONT_SIZE,
    },
  },
  series: [
    {
      type: 'bar',
      name: t('global.data_quality.metrics.completeness'),
      data: completenessData as unknown as object[],
    },
    {
      type: 'bar',
      name: t('global.data_quality.metrics.consistency'),
      data: consistencyData as unknown as object[],
    },
    {
      type: 'bar',
      name: t('global.data_quality.metrics.timeliness'),
      data: timelinessData as unknown as object[],
    },
    {
      type: 'bar',
      name: t('global.data_quality.metrics.validity'),
      data: validityData as unknown as object[],
    },
  ],
  tooltip: {
    show: true,
    textStyle: {
      fontSize: CHART_FONT_SIZE,
    },
  },
  grid: {
    containLabel: true,
  },
  legend: {
    y: 'bottom',
    show: true,
    textStyle: {
      fontSize: CHART_FONT_SIZE,
    },
  },
})
</script>
