export interface Result<T = never> {
  code: number
  type?: 'success' | 'error'
  message: string
  data?: T
}
