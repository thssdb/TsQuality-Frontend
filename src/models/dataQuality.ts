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
  dataSize: number
  // metrics: DQMetrics = new DQMetrics()

  constructor(id: number, name: string, dataSize: number = 0) {
    super()
    this.id = id
    this.name = name
    this.dataSize = dataSize
  }
}
