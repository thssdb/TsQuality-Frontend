export function getQueryParam(url: string, key: string): string | null {
  const index = url.indexOf('?')
  if (index === -1) {
    return null
  }

  const params = url.substring(index + 1).split('&')
  for (const param of params) {
    const [paramKey, paramValue] = param.split('=')
    if (paramKey === key) {
      return paramValue
    }
  }
  return null
}

export function stringToMap(input: string): Map<string, string> {
  const result = new Map<string, string>()
  const pairs = input.split(',').map((pair) => pair.trim())
  pairs.forEach((pair) => {
    const [key, value] = pair.split('=')
    if (key && value) {
      result.set(key.trim(), value.trim())
    }
  })
  return result
}
