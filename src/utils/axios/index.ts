import axios, { AxiosInstance } from 'axios'

function createAxios(): AxiosInstance {
  return axios.create({
    timeout: 10 * 1000,
    baseURL: 'http://localhost:8888/api/v1',
  })
}

export const http = createAxios()
