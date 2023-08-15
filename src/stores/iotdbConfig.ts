import { defineStore } from 'pinia'

export const useIotdbConfigStore = defineStore('iotdbConfig', {
  state: () => {
    return {
      icid: -1,
      host: 'localhost',
      port: 6667,
      username: 'root',
      password: 'root',
    }
  },
  actions: {
    setIcId(configId: number) {
      this.icid = configId
    },
    setIc(ic: IotDBConfig) {
      this.host = ic.host
      this.port = ic.port
      this.username = ic.username
      this.password = ic.password
    },
    getIc(): IotDBConfig {
      return {
        host: this.host,
        port: this.port,
        username: this.username,
        password: this.password,
      }
    },
  },
})
