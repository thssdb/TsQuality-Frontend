<template>
  <div>
    <n-flex justify="space-around" size="large">
      <TimeSeriesPathAutoCompletion
        style="flex: 1"
        @select="handleTsPathSelection"
      />
      <n-flex justify="space-around" size="large" style="flex: 1">
        <TimeSeriesTimeRangePicker
          style="flex: 1"
          @clear="handleTimeRangeClear"
          @select="handleTimeRangeSelection"
        />
      </n-flex>
    </n-flex>

    <TimestampAnomaliesChart
      :path="path"
      :start-timestamp="startTimestamp"
      :end-timestamp="endTimestamp"
    />
    <ValueAnomaliesChart />
  </div>
</template>

<script setup lang="ts">
import { setupECharts } from '@/utils/lib/echarts'
import TimestampAnomaliesChart from './components/timestamp-anomaly/TimestampAnomaliesChart.vue'
import ValueAnomaliesChart from './components/value-anomaly/ValueAnomaliesChart.vue'
import TimeSeriesTimeRangePicker from '@/components/TimeSeriesTimeRangePicker.vue'
import TimeSeriesPathAutoCompletion from '@/components/TimeSeriesPathAutoCompletion.vue'
import { ref } from 'vue'

setupECharts()

const path = ref('')
const startTimestamp = ref<number>(0)
const endTimestamp = ref<number>(0)

function handleTsPathSelection(value: string) {
  path.value = value
}

function handleTimeRangeClear() {
  startTimestamp.value = 0
  endTimestamp.value = 0
}

function handleTimeRangeSelection(range: [number, number]) {
  startTimestamp.value = range[0]
  endTimestamp.value = range[1]
}
</script>
