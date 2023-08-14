import { App } from 'vue'
import { createPinia } from 'pinia'

export function setupStore(app: App) {
  const pinia = createPinia()
  app.use(pinia)
}
