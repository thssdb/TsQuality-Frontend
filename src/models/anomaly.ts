export class TimestampAnomalyRequestDto {
  path: string = ''
  startTimestamp: number = 0
  endTimestamp: number = 0
  method: string = ''
  interval: number | null = null
}

export class ValueAnomalyRequestDto {
  path: string = ''
  startTimestamp: number = 0
  endTimestamp: number = 0
  method: string = ''
  args: string = ''
}
