export class TimestampAnomalyRequestDto {
  path: string
  startTimestamp: number
  endTimestamp: number
  method: string
  interval: number
}

export class TimestampAnomalyRequestDtoBuilder {
  path: string = ''
  startTimestamp: number = 0
  endTimestamp: number = 0
  method: string = ''
  interval: number = 0

  setPath(path: string): this {
    this.path = path
    return this
  }

  setStartTimestamp(startTimestamp: number): this {
    this.startTimestamp = startTimestamp
    return this
  }

  setEndTimestamp(endTimestamp: number): this {
    this.endTimestamp = endTimestamp
    return this
  }

  setMethod(method: string): this {
    this.method = method
    return this
  }

  setInterval(interval: number): this {
    this.interval = interval
    return this
  }

  build(): TimestampAnomalyRequestDto {
    return new TimestampAnomalyRequestDto(
      this.path,
      this.startTimestamp,
      this.endTimestamp,
      this.method,
      this.interval,
    )
  }
}
