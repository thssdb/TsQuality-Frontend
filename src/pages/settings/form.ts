import { FormItemRule, FormRules } from 'naive-ui'
import { reactive } from 'vue'
import i18n from '@/locales'
import { useIoTDBConfigStore } from '@/stores/iotdbConfig'

const iotdbConfigStore = useIoTDBConfigStore()

export function defaultFormValue() {
  return Object.assign({}, iotdbConfigStore.config)
}
export const formValue = reactive(defaultFormValue())

const { t } = i18n.global
export const rules: FormRules = {
  host: [
    {
      required: true,
      trigger: 'change',
      message: () => t('settings.configuration.items.host.error'),
    },
  ],
  port: [
    {
      trigger: 'change',
      validator(_: FormItemRule, value: string) {
        if (!value) {
          return new Error(t('settings.configuration.items.port.error.empty'))
        }
        if (!/^\d*$/.test(value)) {
          return new Error(
            t('settings.configuration.items.port.error.not_a_integer'),
          )
        }
        if (Number(value) < 1024 || Number(value) > 65535) {
          return new Error(t('settings.configuration.items.port.error.range'))
        }
        return true
      },
    },
  ],
  username: [
    {
      required: true,
      trigger: 'change',
    },
  ],
  password: [
    {
      required: true,
      trigger: 'change',
    },
  ],
}
