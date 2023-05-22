import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import { App } from 'vue'
import { PageEnum } from '../enums/pageEnum'
import { RouteEnum } from '@/enums/routeEnum'

export const RootRoute: RouteRecordRaw = {
  path: '/',
  name: RouteEnum.ROOT,
  redirect: PageEnum.HOME,
}

export const DashboardRoute: RouteRecordRaw = {
  path: '/dashboard',
  name: RouteEnum.DASHBOARD,
  redirect: '/dashoard/console',
  component: () => import('../layouts/index.vue'),
  children: [
    {
      path: 'console',
      name: RouteEnum.DASHBOARD,
      component: () => import('../pages/dashboard/dashboard.vue'),
    },
  ],
}

export const HistoryRoute: RouteRecordRaw = {
  path: '/history',
  name: RouteEnum.HISTORY,
  redirect: '/history/index',
  component: () => import('../layouts/index.vue'),
  children: [
    {
      path: 'index',
      name: RouteEnum.HISTORY,
      component: () => import('../pages/history/history.vue'),
    },
  ],
}

export const AnalyzeRoute: RouteRecordRaw = {
  path: '/analyze',
  name: RouteEnum.ANALYZE,
  redirect: '/analyze/overview',
  component: () => import('../layouts/index.vue'),
  children: [
    {
      path: 'overview',
      name: RouteEnum.ANALYZE_DETAIL,
      component: () => import('../pages/analysis/overview/overview.vue'),
    },
    {
      path: 'detail',
      name: RouteEnum.ANALYZE_OVERVIEW,
      component: () => import('../pages/analysis/detail/detail.vue'),
    },
  ],
}

export const UserRoute: RouteRecordRaw = {
  path: '/user',
  name: PageEnum.USER,
  redirect: '/user/index',
  component: () => import('../layouts/index.vue'),
  children: [
    {
      path: 'index',
      name: RouteEnum.USER,
      component: () => import('../pages/user/user.vue'),
    },
  ],
}

export const SettingsRoute: RouteRecordRaw = {
  path: '/settings',
  name: PageEnum.SETTINGS,
  redirect: '/settings/index',
  component: () => import('../layouts/index.vue'),
  children: [
    {
      path: 'index',
      name: RouteEnum.SETTINGS,
      component: () => import('../pages/settings/settings.vue'),
    },
  ],
}

export const constantRouter: any[] = [
  RootRoute,
  DashboardRoute,
  HistoryRoute,
  AnalyzeRoute,
  UserRoute,
  SettingsRoute,
]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRouter,
  strict: true,
})

export function setupRouter(app: App) {
  app.use(router)
}

export default router
