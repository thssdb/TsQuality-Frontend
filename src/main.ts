import './styles/tailwind.css'
import { createApp } from 'vue'
import naive from 'naive-ui'
import App from './App.vue'
import { setupRouter } from './router'
import './mock/mock'
import { setupLocale } from './locales'

function bootstrap() {
  const app = createApp(App)

  app.use(naive)

  setupLocale(app)
  setupRouter(app)

  app.mount('#app')
}

bootstrap()
