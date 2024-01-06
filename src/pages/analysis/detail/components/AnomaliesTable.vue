<template>
  <n-grid cols="s:1 m:2" responsive="screen" :x-gap="gridItemXGap">
    <n-grid-item :span="1">
      <TimestampAnomaliesTable class="mt-4" />
    </n-grid-item>
    <n-grid-item :span="1">
      <ValueAnomaliesTable class="mt-4" />
    </n-grid-item>
  </n-grid>
</template>

<script setup lang="ts">
import ValueAnomaliesTable from '@/pages/analysis/detail/components/value-anomaly/ValueAnomaliesTable.vue'
import TimestampAnomaliesTable from '@/pages/analysis/detail/components/timestamp-anomaly/TimestampAnomaliesTable.vue'

const gridItemXGap = 12
</script>
