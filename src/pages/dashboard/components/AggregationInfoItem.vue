<template>
  <n-card
    hoverable
    size="small"
    :title="title"
    :segmented="{ content: true, footer: true }"
  >
    <template #header-extra>
      <n-tag :type="tagType">
        {{ tag }}
      </n-tag>
    </template>

    <div class="px-1 py-1">
      <n-skeleton v-if="isLoading" style="width: 100%" size="medium" />
      <div v-else class="text-3xl">
        {{ content }}
      </div>
    </div>
  </n-card>
</template>

<script setup lang="ts">
import { type PropType } from 'vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
  tagType: {
    type: String as PropType<
      'default' | 'error' | 'primary' | 'info' | 'success' | 'warning'
    >,
    required: true,
  },
  tag: {
    type: String,
    default: '',
  },
  content: {
    type: Number,
    default: 0,
  },
  isLoading: {
    type: Boolean,
    required: true,
  },
})
</script>
