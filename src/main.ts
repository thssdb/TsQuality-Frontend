import './styles/tailwind.css'
import { createApp } from 'vue'
import naive from 'naive-ui'
import App from './App.vue'
import { setupRouter } from './router'
import { setupLocale } from './locales'
import { setupStore } from './stores'

function bootstrap() {
  const app = createApp(App)

  app.use(naive)

  setupLocale(app)
  setupRouter(app)
  setupStore(app)

  app.mount('#app')
}

bootstrap()
