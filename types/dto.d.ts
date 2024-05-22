/** {@file dto.d.ts}: definitions from the backend  */

export interface PreAggregationProgressDto {
  totalFileCount: bigint
  processedFileCount: bigint
}
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

export type AggregateDQDto = Map<string, number[]>
export type DataSizeDistributionDto = Map<string, number>

export interface TimeSeriesTimeOverviewDto {
  count: bigint
  minTimestamp: bigint
  maxTimestamp: bigint
}

export interface TimestampAnomalyResponseDto {
  originalData: Array<TimeSeriesDataPointDto>
  repairedData: Array<TimeSeriesDataPointDto>
}

export type ValueAnomalyResponseDto = {
  data: Array<ValueAnomalyResponseItemDto>
}
export interface ValueAnomalyResponseItemDto {
  timestamp: bigint
  original: number
  repaired: number
}
