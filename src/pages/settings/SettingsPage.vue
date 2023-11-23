<template>
  <div>
    <div>
      <n-card :title="$t('settings.system.title')">
        {{ $t('settings.system.description') }}
      </n-card>
    </div>

    <n-card class="mt-4" :title="$t('settings.configuration.title')">
      <n-grid cols="1 s:1 m:3 l:3 xl:3 2xl:3" responsive="screen">
        <n-grid-item offset="0 s:0 m:1 l:1 xl:1 2xl:1">
          <n-form
            ref="formRef"
            size="large"
            class="py-8"
            show-require-mark
            responsive="screen"
            label-placement="left"
            cols="1 s:1 m:3 l:3 xl:3 2xl:3"
            :label-width="120"
            :model="formValue"
            :rules="rules"
          >
            <n-form-item
              path="host"
              :label="$t('settings.configuration.items.host.title')"
            >
              <n-input
                v-model:value="formValue.host"
                :placeholder="
                  $t('settings.configuration.items.host.placeholder')
                "
              />
            </n-form-item>
            <n-form-item
              first
              path="port"
              :label="$t('settings.configuration.items.port.title')"
            >
              <n-input
                v-model:value="formValue.port"
                :placeholder="
                  $t('settings.configuration.items.port.placeholder')
                "
              />
            </n-form-item>
            <n-form-item
              path="username"
              :label="$t('settings.configuration.items.username.title')"
            >
              <n-input
                v-model:value="formValue.username"
                :placeholder="
                  $t('settings.configuration.items.username.placeholder')
                "
              />
            </n-form-item>
            <n-form-item
              path="password"
              :label="$t('settings.configuration.items.password.title')"
            >
              <n-input
                v-model:value="formValue.password"
                :placeholder="
                  $t('settings.configuration.items.password.placeholder')
                "
              />
            </n-form-item>

            <div style="margin-left: 120px">
              <n-space>
                <n-button type="primary" @click="formSubmit">{{
                  $t('settings.configuration.buttons.submit')
                }}</n-button>
                <n-button @click="resetForm">{{
                  $t('settings.configuration.buttons.reset')
                }}</n-button>
              </n-space>
            </div>
          </n-form>
        </n-grid-item>
      </n-grid>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { NForm, useMessage } from 'naive-ui'
import { ref } from 'vue'
import { defaultFormValue, formValue, rules } from './form'
import { useI18n } from 'vue-i18n'
import { useIoTDBConfigStore } from '@/stores/iotdbConfig'

const { t } = useI18n()
const message = useMessage()
const formRef = ref<InstanceType<typeof NForm> | null>(null)
let iotdbConfigStore = useIoTDBConfigStore()

const formSubmit = () => {
  formRef.value
    ?.validate()
    .then(() => {
      Object.assign(iotdbConfigStore.config, formValue)
      message.success(t('settings.configuration.validation.success'))
    })
    .catch(() => {
      message.error(t('settings.configuration.validation.error'))
    })
}

function resetForm() {
  formRef.value?.restoreValidation()
  Object.assign(formValue, defaultFormValue())
}
</script>
