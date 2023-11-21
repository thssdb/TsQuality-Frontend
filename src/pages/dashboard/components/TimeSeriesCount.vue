<template>
  <v-chart autoresize :option="option" :style="{ width, height }" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { use } from 'echarts/core'
import { SVGRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import {
  TitleComponent,
  GridComponent,
  TooltipComponent,
} from 'echarts/components'
import VChart from 'vue-echarts'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  names: {
    type: Array,
    default: () => [],
  },
  dataSizes: {
    type: Array,
    default: () => [],
  },
})

use([SVGRenderer, BarChart, TitleComponent, GridComponent, TooltipComponent])

const width = '100%'
const height = '300px'
const i18n = useI18n()
const option = ref<any>({
  title: {
    left: 'center',
    text: i18n.t('dashboard.bar_chart.title'),
  },
  xAxis: {},
  yAxis: {
    inverse: true,
    data: props.names,
  },
  series: [
    {
      name: i18n.t('dashboard.bar_chart.tooltip'),
      type: 'bar',
      data: props.dataSizes,
    },
  ],
  tooltip: {
    show: true,
  },
})
</script>
