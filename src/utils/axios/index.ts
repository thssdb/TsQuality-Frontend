import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { Result } from '@/utils/axios/types'

function createAxios(): AxiosInstance {
  return axios.create({
    timeout: 10 * 1000,
    baseURL: 'http://localhost:8888/api/v1',
  })
}

export const http = createAxios()

http.interceptors.response.use(
  (res: AxiosResponse<Result>) => res.data,
  (err) => {
    console.log(err)
    return Promise.reject(err)
  },
)
