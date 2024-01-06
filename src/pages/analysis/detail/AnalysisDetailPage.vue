<template>
  <DataDistributionChart />
  <AnomaliesTable />
  <TimestampAnomaliesChart />
  <ValueAnomaliesChart />
</template>

<script setup lang="ts">
import { setupECharts } from '@/utils/lib/echarts'
import DataDistributionChart from './components/DataDistributionChart.vue'
import TimestampAnomaliesChart from './components/timestamp-anomaly/TimestampAnomaliesChart.vue'
import ValueAnomaliesChart from './components/value-anomaly/ValueAnomaliesChart.vue'
import AnomaliesTable from './components/AnomaliesTable.vue'

setupECharts()
</script>
