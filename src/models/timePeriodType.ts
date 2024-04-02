export enum TimePeriodType {
  YEAR = 'year',
  MONTH = 'month',
  DAY = 'day',
  HOUR = 'hour',
  MINUTE = 'minute',
}

export function strToTimePeriodType(str: string): TimePeriodType {
  switch (str) {
    case 'year':
      return TimePeriodType.YEAR
    case 'month':
      return TimePeriodType.MONTH
    case 'day':
      return TimePeriodType.DAY
    case 'hour':
      return TimePeriodType.HOUR
    case 'minute':
      return TimePeriodType.MINUTE
    default:
      throw new Error(`Invalid time period type: ${str}`)
  }
}
