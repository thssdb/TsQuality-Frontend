/** {@file dto.d.ts}: definitions from the backend  */

export interface DQOverviewDto {
  totalCount: bigint
  stats: DQOverviewStatDto[]
}

// "export" is required to make the interface available in *.vue files
// otherwise, it's only available in *.ts files
export interface DQOverviewStatDto {
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

export interface DQAggregationDetailDto {
  items: DQAggregationDetailItemDto[]
}

export interface DQAggregationDetailItemDto {
  time: string
  dataSize: bigint
  completeness: number
  consistency: number
  timeliness: number
  validity: number
}

export interface TimestampAnomalyResponseDto {
  originalData: Array<TimeSeriesDataPointDto>
  repairedData: Array<TimeSeriesDataPointDto>
}

export type ValueAnomalyResponseDto = ValueAnomalyResponseItemDto[]

export interface ValueAnomalyResponseItemDto {
  timestamp: bigint
  original: number
  repaired: number
}
