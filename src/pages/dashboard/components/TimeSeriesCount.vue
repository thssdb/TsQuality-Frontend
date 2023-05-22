<template>
  <v-chart autoresize :option="option" :style="{ width, height }" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { use } from 'echarts/core'
import { SVGRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { TitleComponent, GridComponent } from 'echarts/components'
import VChart from 'vue-echarts'

use([SVGRenderer, BarChart, TitleComponent, GridComponent])

const height = '300px'
const width = '100%'

const option = ref<any>({
  title: {
    left: 'center',
    text: '各时间序列数据量',
  },
  xAxis: {},
  yAxis: {
    inverse: true,
    data: [
      'root.sg1.d1.s1',
      'root.sg1.d1.s2',
      'root.sg1.d2.s2',
      'root.sg1.d2.s2',
      'root.sg2.d1.s1',
    ],
  },
  series: [
    {
      name: '数据量',
      type: 'bar',
      data: [23178, 20134, 15691, 10062, 8535],
    },
  ],
})
</script>
