<template>
  <n-date-picker
    size="large"
    clearable
    type="datetimerange"
    @clear="onClear"
    @confirm="onConfirm"
  />
</template>

<script setup lang="ts">
const emit = defineEmits<{
  clear: []
  select: [range: [number, number]]
}>()

function onClear() {
  emit('clear')
}

function onConfirm(range: [number, number]) {
  emit('select', range)
}
</script>
