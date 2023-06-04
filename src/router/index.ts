import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import { App } from 'vue'
import { PageEnum } from '../enums/pageEnum'
import { RouteEnum } from '@/enums/routeEnum'
import { Layout } from './constants'

export const RootRoute: RouteRecordRaw = {
  path: '/',
  name: RouteEnum.ROOT,
  redirect: PageEnum.HOME,
}

export const RedirectRoute: RouteRecordRaw = {
  path: '/redirect',
  name: RouteEnum.REDIRECT,
  component: Layout,
  children: [
    {
      path: '/redirect/:path(.*)',
      name: RouteEnum.REDIRECT,
      component: () => import('@/pages/redirect/index.vue'),
    },
  ],
}

export const DashboardRoute: RouteRecordRaw = {
  path: '/dashboard',
  name: RouteEnum.DASHBOARD,
  redirect: '/dashboard/console',
  component: Layout,
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
  component: Layout,
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
  component: Layout,
  children: [
    {
      path: 'overview',
      name: RouteEnum.ANALYZE_DETAIL,
      // component: () => import('../pages/analysis/overview/overview.vue'),
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
  component: Layout,
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
  component: Layout,
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
  RedirectRoute,
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
