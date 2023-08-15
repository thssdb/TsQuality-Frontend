import { App } from 'vue'
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

export function setupStore(app: App) {
  const pinia = createPinia()
  pinia.use(persist)
  app.use(pinia)
}
