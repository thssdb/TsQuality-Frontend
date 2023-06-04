import { AxiosRequestConfig } from 'axios'
import { TsQualityAxios } from './axios'

function createAxios(config?: AxiosRequestConfig) {
  return new TsQualityAxios({
    timeout: 10 * 1000,
    baseURL: 'http://mock/api',
  })
}

export const http = createAxios()
