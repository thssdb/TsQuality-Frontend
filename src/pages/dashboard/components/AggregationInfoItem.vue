<template>
  <n-card
    hoverable
    size="small"
    :title="title"
    :segmented="{ content: true, footer: true }"
  >
    <template v-if="tag !== ''" #header-extra>
      <n-tag :type="tagType">
        {{ tag }}
      </n-tag>
    </template>

    <div class="px-1 py-1">
      <n-skeleton v-if="isLoading" style="width: 100%" size="medium" />
      <div v-else class="text-3xl">
        <n-number-animation
          :duration="1500"
          :from="0"
          :to="content"
          :precision="precision"
          :show-separator="showSeparator"
        />
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
    default: 'default',
  },
  tag: {
    type: String,
    default: '',
  },
  content: {
    type: Number,
    default: 0,
  },
  precision: {
    type: Number,
    default: 0,
  },
  showSeparator: {
    type: Boolean,
    default: false,
  },
  isLoading: {
    type: Boolean,
    required: true,
  },
})
</script>
