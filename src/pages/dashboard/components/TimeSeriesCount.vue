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

const props = defineProps({
  names: {
    type: Array,
    default: [],
  },
  dataSizes: {
    type: Array,
    default: [],
  },
})

use([SVGRenderer, BarChart, TitleComponent, GridComponent, TooltipComponent])

const width = '100%'
const height = '300px'
const option = ref<any>({
  title: {
    left: 'center',
    text: '各时间序列数据量',
  },
  xAxis: {},
  yAxis: {
    inverse: true,
    data: props.names,
  },
  series: [
    {
      name: '数据量',
      type: 'bar',
      data: props.dataSizes,
    },
  ],
  tooltip: {
    show: true,
  },
})
</script>
