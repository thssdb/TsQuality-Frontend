// DQMetrics represents the four data quality metrics
class DQMetrics {
  completeness: number = 0
  consistency: number = 0
  timeliness: number = 0
  validity: number = 0
}

// AggregationInfo represents one n-grid-item in DashboardHeader
export class AggregationInfo extends DQMetrics {
  numDataPoints: number = 0
  numTimeSeries: number = 0
  numDevices: number = 0
  numDatabases: number = 0
}

// DQOverview represents one row of the data quality overview table in dashboard
export class DQOverviewItem extends DQMetrics {
  id: number // row id
  name: string // name of a time series / device / database
  dataSize: bigint // data size

  constructor(
    id: number,
    name: string,
    dataSize: bigint,
    completeness: number,
    consistency: number,
    timeliness: number,
    validity: number,
  ) {
    super()
    this.id = id
    this.name = name
    this.dataSize = dataSize
    this.completeness = completeness
    this.consistency = consistency
    this.timeliness = timeliness
    this.validity = validity
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
