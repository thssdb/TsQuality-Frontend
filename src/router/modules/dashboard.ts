import { RouteRecordRaw } from 'vue-router'
import { Layout } from '../constants'

const routeName = 'dashboard'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    name: routeName,
    component: Layout,
  },
]

export default routes
