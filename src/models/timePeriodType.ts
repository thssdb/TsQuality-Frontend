export enum TimePeriodType {
  YEAR = 'year',
  MONTH = 'month',
  DAY = 'day',
}

export function strToTimePeriodType(str: string): TimePeriodType {
  switch (str) {
    case 'year':
      return TimePeriodType.YEAR
    case 'month':
      return TimePeriodType.MONTH
    case 'day':
      return TimePeriodType.DAY
    default:
      throw new Error(`Invalid time period type: ${str}`)
  }
}
