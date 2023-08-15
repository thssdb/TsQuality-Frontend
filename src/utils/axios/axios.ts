import axios, { AxiosError, AxiosInstance } from 'axios'
import { AxiosResponse } from 'axios'
import { AxiosRequestConfig } from 'axios'
import { Result } from './types'

export class TsQualityAxios {
  private instance: AxiosInstance
  private config: AxiosRequestConfig

  constructor(config: AxiosRequestConfig) {
    this.config = config
    this.instance = axios.create(config)
    this.setupInterceptors()
  }

  private setupInterceptors() {
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        // TODO: handle according to the data returned by the backend
        return res
      },
      (err: AxiosError) => {
        return Promise.reject(err.response?.data)
      }
    )
  }

  public getAxiosInstance(): AxiosInstance {
    return this.instance
  }

  public configAxios(config: AxiosRequestConfig) {
    if (!this.instance) {
      return
    }
    this.config = config
    this.instance = axios.create(config)
  }

  public request(config: AxiosRequestConfig) {
    return new Promise((resolve, reject) => {
      this.instance
        .request<Result, AxiosResponse<Result>>(config)
        .then((res: AxiosResponse<Result>) => {
          if (res.data.code == 0) {
            resolve(res.data)
          } else {
            reject(res)
          }
        })
        .catch((e: Error) => {
          reject(e)
        })
    })
  }
}
