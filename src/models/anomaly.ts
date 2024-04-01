export class TimestampAnomalyRequestDto {
  path: string
  startTimestamp: number
  endTimestamp: number
  method: string
  interval: number
}

export class ValueAnomalyRequestDto {
  path: string
  startTimestamp: number
  endTimestamp: number
  method: string
  args: string
}
