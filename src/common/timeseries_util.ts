const TIME_SERIES_PATH_REGEX =
  /root\.([\w | \u2E80-\u9FFF]+\.)*([\w | \u2E80-\u9FFF]+)/

export function isValidTimeSeries(path: string): boolean {
  return TIME_SERIES_PATH_REGEX.test(path)
}

export function isValidTimeSeriesPrefix(path: string): boolean {
  return path === 'root' || TIME_SERIES_PATH_REGEX.test(path)
}
