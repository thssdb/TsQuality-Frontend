<template>
  <n-flex justify="space-between" class="mt-4 w-full">
    <n-text>
      {{ t('analysis.detail.timeseries.time_overview.count') + count }}
    </n-text>
    <n-text>
      {{ t('analysis.detail.timeseries.time_overview.min_time') + minTime }}
    </n-text>
    <n-text>
      {{ t('analysis.detail.timeseries.time_overview.max_time') + maxTime }}
    </n-text>
  </n-flex>
</template>

<script setup lang="ts">
import { computed, onUpdated, ref } from 'vue'
import { getTimeseriesTimeOverview } from '@/api/analysis/detail'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  path: {
    type: String,
    required: true,
  },
})

const { t } = useI18n()
let count = ref(0n)
let minTimestamp = ref(0n)
let maxTimestamp = ref(0n)

const minTime = computed(() => {
  return minTimestamp.value
    ? new Date(Number(minTimestamp.value)).toLocaleString()
    : ''
})
const maxTime = computed(() => {
  return maxTimestamp.value
    ? new Date(Number(maxTimestamp.value)).toLocaleString()
    : ''
})

onUpdated(async () => {
  if (props.path?.endsWith('.')) {
    return
  }
  const res = await getTimeseriesTimeOverview(props.path)
  console.log(res)
  count.value = res.data.count
  minTimestamp.value = res.data.minTimestamp
  maxTimestamp.value = res.data.maxTimestamp
})
</script>

<style scoped lang="less"></style>
