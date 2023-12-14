import { DQMetrics } from './dataQuality'

// DQDetailItem represents one bar in the data quality bar chart,
// which is the data quality aggregated result of the time dimension
export class DQAggregationDetailItem extends DQMetrics {
  time: string
  dataSize: bigint

  constructor(
    time: string,
    dataSize: bigint,
    completeness: number,
    consistency: number,
    timeliness: number,
    validity: number,
  ) {
    super(completeness, consistency, timeliness, validity)
    this.time = time
    this.dataSize = dataSize
  }
}

export class DQAggregationDetailItemBuilder {
  time: string = ''
  dataSize: bigint = BigInt(0)
  completeness: number = 0
  consistency: number = 0
  timeliness: number = 0
  validity: number = 0

  setTime(time: string): this {
    this.time = time
    return this
  }

  setDataSize(dataSize: bigint): this {
    this.dataSize = dataSize
    return this
  }

  setCompleteness(completeness: number): this {
    this.completeness = completeness
    return this
  }

  setConsistency(consistency: number): this {
    this.consistency = consistency
    return this
  }

  setTimeliness(timeliness: number): this {
    this.timeliness = timeliness
    return this
  }

  setValidity(validity: number): this {
    this.validity = validity
    return this
  }

  build(): DQAggregationDetailItem {
    return new DQAggregationDetailItem(
      this.time,
      this.dataSize,
      this.completeness,
      this.consistency,
      this.timeliness,
      this.validity,
    )
  }
}
