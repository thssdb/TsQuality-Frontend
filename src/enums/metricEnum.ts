export enum MetricEnum {
  COMPLETENESS = 'Completeness',
  CONSISTENCY = 'Consistency',
  TIMELINESS = 'Timeliness',
  VALIDITY = 'Validity',
}

export enum MetricRangeEnum {
  LOWEST = '[0.0-0.6)',
  LOW = '[0.6-0.7)',
  MEDIUM = '[0.7-0.8)',
  HIGH = '[0.8-0.9)',
  HIGHEST = '[0.9-1.0]',
}

export function numberToMetricRange(value: number): MetricRangeEnum {
  if (value >= 0.0 && value < 0.6) {
    return MetricRangeEnum.LOWEST
  } else if (value >= 0.6 && value < 0.7) {
    return MetricRangeEnum.LOW
  } else if (value >= 0.7 && value < 0.8) {
    return MetricRangeEnum.MEDIUM
  } else if (value >= 0.8 && value < 0.9) {
    return MetricRangeEnum.HIGH
  } else if (value >= 0.9 && value <= 1.0) {
    return MetricRangeEnum.HIGHEST
  }
  throw new Error('Value is out of range')
}
