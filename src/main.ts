import './styles/tailwind.css'
import { createApp } from 'vue'
import naive from 'naive-ui'
import App from './App.vue'
import { setupRouter } from './router'
import './mock/mock'

function bootstrap() {
  const app = createApp(App)

  app.use(naive)

  setupRouter(app)

  app.mount('#app')
}

bootstrap()
