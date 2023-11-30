<template>
  <n-menu
    :mode="mode"
    :indent="36"
    :options="menus"
    :collapsed="collapsed"
    :collapsed-width="64"
    :collapsed-icon-size="20"
    :value="selectedKeys"
    @update:value="clickMenuItem"
  />
</template>

<script lang="ts" setup>
import { MenuOption, NIcon } from 'naive-ui'
import { Component, h, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  DashboardOutlined,
  PieChartOutlined,
  SettingOutlined,
  UserOutlined,
} from '@vicons/antd'
import { RouteEnum } from '@/enums/routeEnum'
import { useI18n } from 'vue-i18n'

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
const selectedKeys = ref<string>(route.name as string)

const i18n = useI18n()
const menus = ref<MenuOption[]>([
  {
    key: RouteEnum.DASHBOARD,
    label: i18n.t('menu.dashboard'),
    icon: renderIcon(DashboardOutlined),
  },
  {
    key: RouteEnum.ANALYZE,
    label: i18n.t('menu.analysis'),
    icon: renderIcon(PieChartOutlined),
    children: [
      {
        key: RouteEnum.ANALYZE_OVERVIEW,
        label: i18n.t('menu.analysis.overview'),
      },
      {
        key: RouteEnum.ANALYZE_DETAIL,
        label: i18n.t('menu.analysis.detail'),
      },
    ],
  },
  {
    key: RouteEnum.USER,
    label: i18n.t('menu.users'),
    icon: renderIcon(UserOutlined),
  },
  {
    key: RouteEnum.SETTINGS,
    label: i18n.t('menu.settings'),
    icon: renderIcon(SettingOutlined),
  },
])

function clickMenuItem(key: string) {
  selectedKeys.value = key
  router.push({ name: key })
  emit('clickMenuItem', key)
}

watch(
  () => route.fullPath,
  () => {
    updateMenu()
  },
)

function updateMenu() {
  selectedKeys.value = route.name as string
}

onMounted(() => {
  updateMenu()
})
</script>
