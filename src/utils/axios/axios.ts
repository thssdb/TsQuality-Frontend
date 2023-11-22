import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
} from 'axios'
import { Result } from './types'

export default class TsQualityAxios {
  private instance: AxiosInstance

  private config: AxiosRequestConfig

  constructor(config: AxiosRequestConfig) {
    this.config = config
    this.instance = axios.create(config)
    this.setupInterceptors()
  }

  private setupInterceptors() {
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => res,
      (err: AxiosError) => Promise.reject(err.response?.data)
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
    return new Promise<Result>((resolve, reject) => {
      this.instance
        .request<Result, AxiosResponse<Result>>(config)
        .then((res: AxiosResponse<Result>) => {
          resolve(res.data)
        })
        .catch((e: Error) => {
          reject(e)
        })
    })
  }
}
