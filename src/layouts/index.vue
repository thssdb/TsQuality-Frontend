<template>
  <n-layout class="layout" position="absolute" has-sider>
    <n-layout-sider
      class="layout-sider"
      show-trigger="bar"
      position="static"
      collapse-mode="width"
      :width="200"
      :collapsed="collapsed"
      :collapsed-width="64"
      :native-scrollbar="false"
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <Logo :collapsed="collapsed" />
      <ASideMenu v-model:collapsed="collapsed" />
    </n-layout-sider>

    <n-layout>
      <n-layout-header position="static">
        <PageHeader v-model:collapsed="collapsed" />
      </n-layout-header>

      <n-layout-content class="layout-content">
        <div class="mt-3">
          <MainView />
        </div>
      </n-layout-content>

      <n-back-top :right="50" />
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Logo } from './components/app-logo'
import { ASideMenu } from './components/side-menu'
import { PageHeader } from './components/page-header'
import { MainView } from './components/page-content'

const collapsed = ref<boolean>(false)
</script>

<style lang="less" scoped>
.layout {
  &-sider {
    z-index: 3;
    min-height: 100vh;
    position: relative;
    box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
  }

  &-content {
    padding: 0 10px 10px;
    min-height: 100vh;
    background: #f5f7f9;
  }
}
</style>
