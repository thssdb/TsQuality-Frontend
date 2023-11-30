<template>
  <div class="logo">
    <img :src="config.logo" alt="" class="ml-3.5" />
    <h2 v-show="!collapsed" class="title">{{ config.title }}</h2>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { websiteConfig } from '@/config/website.config'

const config = ref(websiteConfig)

defineProps({
  collapsed: Boolean,
})
</script>

<style lang="less" scoped>
.logo {
  display: flex;
  align-items: center;
  height: 64px;
  line-height: 64px;
  overflow: hidden;
  white-space: nowrap;

  img {
    width: auto;
    height: 32px;
  }

  .title {
    margin: 0;
  }
}
</style>
