import { defineStore } from 'pinia'

export const useIotdbConfigStore = defineStore('iotdbConfig', {
  state: () => {
    return {
      iotdbConfig: {},
    }
  },
  actions: {
    set(config: IotDBConfig) {
      this.iotdbConfig = config
    },
  },
})
