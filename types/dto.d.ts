/** {@file dto.d.ts}: definitions from the backend  */

// "export" is required to make the interface available in *.vue files
// otherwise, it's only available in *.ts files
export interface DQOverviewDto {
  cnt: bigint
  path: string
  device: string
  database: string
  completeness: number
  consistency: number
  timeliness: number
  validity: number
}

export interface TimeSeriesDataPointDto {
  timestamp: bigint
  value: number
}

export interface TimeSeriesRecentDataDto {
  path: string
  points: Array<TimeSeriesDataPointDto>
}
