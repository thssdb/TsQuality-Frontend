// DQMetrics represents the four data quality metrics
export class DQMetrics {
  completeness: number = 0
  consistency: number = 0
  timeliness: number = 0
  validity: number = 0

  constructor(
    completeness: number,
    consistency: number,
    timeliness: number,
    validity: number,
  ) {
    this.completeness = completeness
    this.consistency = consistency
    this.timeliness = timeliness
    this.validity = validity
  }
}

// AggregationInfo represents one n-grid-item in DashboardHeader
export class AggregationInfo extends DQMetrics {
  numDataPoints: number = 0
  numTimeSeries: number = 0
  numDevices: number = 0
  numDatabases: number = 0
}
