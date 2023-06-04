export interface Result<T = any> {
  code: number
  type?: 'success' | 'error'
  message: string
  data?: T
}
