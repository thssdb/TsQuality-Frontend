<template>
  <n-flex vertical align="center">
    <n-h2>{{ t('dashboard.pre_aggregation.progress.title') }}</n-h2>
    <n-progress type="circle" :percentage="percentage" />
  </n-flex>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineProps({
  percentage: {
    type: Number,
    required: true,
  },
})

const { t } = useI18n()
</script>
