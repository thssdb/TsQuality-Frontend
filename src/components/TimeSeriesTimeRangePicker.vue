<template>
  <n-date-picker
    clearable
    type="datetimerange"
    @clear="onClear"
    @confirm="onConfirm"
  />
</template>

<script setup lang="ts">
const emit = defineEmits<{
  clear: []
  select: [range: [number, number] | null]
}>()

function onClear() {
  emit('clear')
}

function onConfirm(range: [number, number]) {
  emit('select', range)
}
</script>
