import { AxiosRequestConfig } from 'axios'
import TsQualityAxios from './axios'

function createAxios(config?: AxiosRequestConfig) {
  return new TsQualityAxios({
    timeout: 10 * 1000,
    // baseURL: 'http://mock/api',
    baseURL: 'http://localhost:8888/api/v1',
  })
}

export const http = createAxios()
