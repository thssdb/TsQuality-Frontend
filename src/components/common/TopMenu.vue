<template>
  <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
</template>

<script lang="ts">
import { defineComponent, h, ref, Component } from 'vue'
import { topMenuList } from '../../utils/config'

export default defineComponent({
  setup() {
    return {
      activeKey: ref<string | null>(null),
      menuOptions: topMenuList,
    }
  },
})
</script>
