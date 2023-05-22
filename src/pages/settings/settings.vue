<template>
  <div>
    <div>
      <n-card title="系统设置">
        可设置Apache IoTDB默认连接地址、默认用户名/密码等信息。
      </n-card>
    </div>

    <n-card class="mt-4" title="配置项">
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
            :model="formValue"
            :label-width="120"
          >
            <n-form-item label="IoTDB地址" path="host">
              <n-input v-model:value="formValue.host" placeholder="IoTDB地址" />
            </n-form-item>
            <n-form-item label="IoTDB端口" path="port">
              <n-input v-model:value="formValue.port" placeholder="IoTDB端口" />
            </n-form-item>
            <n-form-item label="IoTDB用户名" path="username">
              <n-input
                v-model:value="formValue.username"
                placeholder="IoTDB用户名"
              />
            </n-form-item>
            <n-form-item label="IoTDB密码" path="password">
              <n-input
                v-model:value="formValue.password"
                placeholder="IoTDB密码"
              />
            </n-form-item>

            <div style="margin-left: 120px">
              <n-space>
                <n-button type="primary" @click="formSubmit">提交</n-button>
                <n-button @click="resetForm">重置</n-button>
              </n-space>
            </div>
          </n-form>
        </n-grid-item>
      </n-grid>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { FormRules, useMessage } from 'naive-ui'
import { ref, unref } from 'vue'

const formRef = ref<any>(null)

const rules = ref<FormRules>({
  host: {
    required: true,
    type: 'string',
    message: '请输入IoTDB地址',
  },
  port: {
    required: true,
    type: 'number',
    message: '请输入IoTDB端口号',
  },
  username: {
    required: true,
    type: 'string',
    message: '请输入IoTDB用户名',
  },
  password: {
    required: true,
    type: 'string',
    message: '请输入IoTDB用户密码',
  },
})

let formValue = ref<any>({
  host: 'localhost',
  port: '6667',
  username: 'root',
  password: 'root',
})

const message = useMessage()

const formSubmit = () => {
  formRef.value.validate((errors: any) => {
    if (!errors) {
      message.success('验证成功')
    } else {
      message.error('验证失败，请填写完整信息')
    }
  })
}

const defaultValue = () => ({
  host: 'localhost',
  port: 6667,
  username: 'root',
  password: 'root',
})

function resetForm() {
  formRef.value.restoreValidation()
  formValue = Object.assign(unref(formValue), defaultValue())
}
</script>
