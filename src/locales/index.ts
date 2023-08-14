import { App } from 'vue'
import { createI18n } from 'vue-i18n'
import en from './lang/en'
import zh from './lang/zh'

export const defaultLang = 'en'

const text = {
  en: {
    ...en,
  },
  zh: {
    ...zh,
  },
}

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: defaultLang,
  messages: text,
})

export default i18n

export function setupLocale(app: App) {
  app.use(i18n)
}
