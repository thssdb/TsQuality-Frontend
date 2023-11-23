import { defineStore } from 'pinia'
import { reactive } from 'vue'

// export const useIotdbConfigStore = defineStore('iotdbConfig', {
//   state: () => {
//     return {
//       id: -1,
//       host: 'localhost',
//       port: 6667,
//       username: 'root',
//       password: 'root',
//     }
//   },
//   actions: {
//     setIc(config: IoTDBConfig) {},
//     getIc(): IoTDBConfig {
//       return {
//         id: this.id,
//         host: this.host,
//         port: this.port,
//         username: this.username,
//         password: this.password,
//       }
//     },
//   },
// })

export const useIoTDBConfigStore = defineStore(
  'iotdbConfig',
  () => {
    const config = reactive({
      id: -1,
      host: 'localhost',
      port: 6667,
      username: 'root',
      password: 'root',
    })
    return { config }
  },
  {
    persist: true,
  },
)
