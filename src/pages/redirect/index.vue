<template>
  <n-empty :show-icon="false" :show-description="false" />
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
onBeforeMount(() => {
  const { params, query } = route
  const { path } = params
  router.replace({
    path: '/' + path,
    query,
  })
})
</script>
