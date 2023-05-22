<template>
  <RouterView>
    <template #default="{ Component, route }">
      <transition mode="out-in" appear>
        <component :is="Component" :key="route.fullPath" />
      </transition>
    </template>
  </RouterView>
</template>

<script setup lang="ts"></script>

<style scoped></style>
