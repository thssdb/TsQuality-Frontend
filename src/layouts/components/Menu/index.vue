<template>
  <n-menu
    :mode="mode"
    :indent="36"
    :options="menus"
    :collapsed="collapsed"
    :collapsed-width="64"
    :collapsed-icon-size="20"
    :value="seletedKeys"
    @update:value="clickMenuItem"
  />
</template>

<script lang="ts" setup>
import { MenuOption, NIcon } from 'naive-ui'
import { Component, h, onMounted, reactive, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import {
  DashboardOutlined,
  BranchesOutlined,
  PieChartOutlined,
  UserOutlined,
  SettingOutlined,
} from '@vicons/antd'
import { RouteEnum } from '@/enums/routeEnum'

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

defineProps({
  mode: {
    type: String,
    default: 'vertical',
  },
  collapsed: {
    type: Boolean,
  },
  location: {
    type: String,
    default: 'left',
  },
})

const emit = defineEmits<{
  (e: 'clickMenuItem', key: string): void
  (e: 'update:collapsed', collapsed: boolean): void
}>()

const route = useRoute()
const router = useRouter()
const menuItems = ref<any[]>([])
const seletedKeys = ref<string>(route.name as string)

const matched = route.matched
const matchedKeys =
  matched && matched.length ? matched.map((item) => item.name) : []
const state = reactive({
  openKeys: matchedKeys,
})
const menus: MenuOption[] = [
  {
    key: RouteEnum.DASHBOARD,
    label: '仪表盘',
    icon: renderIcon(DashboardOutlined),
  },
  {
    key: RouteEnum.HISTORY,
    label: '历史分析',
    icon: renderIcon(BranchesOutlined),
  },
  {
    key: RouteEnum.ANALYZE,
    label: '时序分析',
    icon: renderIcon(PieChartOutlined),
    children: [
      {
        key: RouteEnum.ANALYZE_OVERVIEW,
        label: '概览分析',
      },
      {
        key: RouteEnum.ANALYZE_DETAIL,
        label: '详细分析',
      },
    ],
  },
  {
    key: RouteEnum.USER,
    label: '用户管理',
    icon: renderIcon(UserOutlined),
  },
  {
    key: RouteEnum.SETTINGS,
    label: '系统设置',
    icon: renderIcon(SettingOutlined),
  },
]

function clickMenuItem(key: string) {
  seletedKeys.value = key
  router.push({ name: key })
  emit('clickMenuItem', key)
}

watch(
  () => route.fullPath,
  () => {
    updateMenu()
  }
)

function updateMenu() {
  seletedKeys.value = route.name as string
}

onMounted(() => {
  updateMenu()
})
</script>
