import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useIoTDBConfigStore = defineStore(
  'iotdbConfig',
  () => {
    const config: IoTDBConfig = reactive({
      id: -1,
      host: 'localhost',
      port: '6667',
      username: 'root',
      password: 'root',
    })
    return { config }
  },
  {
    persist: true,
  },
)
