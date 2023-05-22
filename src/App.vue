<template>
  <AppProvider>
    <RouterView />
  </AppProvider>
</template>

<script lang="ts" setup>
import AppProvider from '@/components/Application/Application.vue'
</script>

<style lang="less">
@import './styles/index.less';
</style>
