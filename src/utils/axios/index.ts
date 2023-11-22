import { Axios } from 'axios'

// function createAxios(config?: AxiosRequestConfig) {
//   return new TsQualityAxios({
//     timeout: 10 * 1000,
//     // baseURL: 'http://mock/api',
//     baseURL: 'http://localhost:8888/api/v1',
//   })
// }

function createAxios(): Axios {
  return new Axios({
    timeout: 10 * 1000,
    baseURL: 'http://localhost:8888/api/v1',
  })
}

export const http = createAxios()
