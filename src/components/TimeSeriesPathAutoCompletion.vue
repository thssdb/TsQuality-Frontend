<template>
  <!--  <n-input-group>-->
  <n-auto-complete
    v-model:value="tsPath"
    clearable
    :options="autoCompleteOptions"
    :placeholder="$t('dashboard.latest_data.path.placeholder')"
    @update:value="onUpdate"
  />
  <!--  </n-input-group>-->
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { getLatestTimeSeriesPaths } from '@/api/dashboard'

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

async function onUpdate(value: string | null) {
  if (value == null) {
    return
  }
  emit('select', value)
  if (!value.startsWith('root')) {
    return
  }
  // TODO: do not update if value doesn't change
  const res = await getLatestTimeSeriesPaths(value)
  tsPaths.value = res.data
}
</script>
