import { DQMetrics } from './dataQuality'

// DQOverview represents one row of the data quality overview table in dashboard
export class DQOverviewItem extends DQMetrics {
  id: number // row id
  name: string // name of a time series / device / database
  dataSize: bigint

  constructor(
    id: number,
    name: string,
    dataSize: bigint,
    completeness: number,
    consistency: number,
    timeliness: number,
    validity: number,
  ) {
    super(completeness, consistency, timeliness, validity)
    this.id = id
    this.name = name
    this.dataSize = dataSize
  }
}

export class DQOverviewItemBuilder {
  id: number = 0
  name: string = ''
  dataSize: bigint = BigInt(0)
  completeness: number = 0
  consistency: number = 0
  timeliness: number = 0
  validity: number = 0

  setId(id: number): this {
    this.id = id
    return this
  }

  setName(name: string): this {
    this.name = name
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

  build(): DQOverviewItem {
    return new DQOverviewItem(
      this.id,
      this.name,
      this.dataSize,
      this.completeness,
      this.consistency,
      this.timeliness,
      this.validity,
    )
  }
}
