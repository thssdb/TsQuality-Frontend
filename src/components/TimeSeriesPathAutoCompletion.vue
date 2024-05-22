<template>
  <n-auto-complete
    v-model:value="tsPath"
    size="large"
    clearable
    :options="autoCompleteOptions"
    :placeholder="$t('dashboard.latest_data.path.placeholder')"
    @update:value="onUpdate"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { getLatestTimeSeriesPaths } from '@/api/dashboard'
import { isValidTimeSeriesPrefix } from '@/common/timeseries_util'

const emit = defineEmits<{
  select: [path: string]
}>()

const tsPath = ref('')
const tsPaths = ref<string[]>([])
const autoCompleteOptions = computed(() => {
  return tsPaths.value?.map((item) => ({
    label: item,
    value: item,
  }))
})

async function onUpdate(value: string) {
  if (!isValidTimeSeriesPrefix(value)) {
    return
  }
  emit('select', value)
  const res = await getLatestTimeSeriesPaths(value)
  tsPaths.value = res.data
}
</script>
