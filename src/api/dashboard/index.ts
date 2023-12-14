import { http } from '@/utils/axios'
import { AggregationInfo } from '@/models/dataQuality'
import { DQOverviewDto, TimeSeriesRecentDataDto } from '#/dto'

export async function getIoTDBConfigId(ic: IoTDBConfig) {
  return http.request<number>({
    url: '/iotdb-config',
    method: 'POST',
    data: ic,
  })
}

export async function getIoTDBAggregationInfo(id: number) {
  return http.request<AggregationInfo>({
    url: `/iotdb/${id}/aggregation-info`,
  })
}

export async function getDataQualityOverview(
  id: number,
  type: string = 'time-series',
) {
  return http.request<Array<DQOverviewDto>>({
    url: `/iotdb/${id}/${type}/overview`,
  })
}

export async function getLatestTimeSeriesPaths(
  id: number,
  path: string,
  limit: number = 10,
) {
  return http.request<Array<string>>({
    url: `/iotdb/${id}/time-series/latest`,
    params: {
      path,
      limit,
    },
  })
}

export async function getTimeSeriesRecentData(
  id: number,
  path: string = '',
  limit: number = 100,
) {
  return http.request<TimeSeriesRecentDataDto>({
    url: `/iotdb/${id}/time-series/data`,
    params: {
      path,
      limit,
    },
  })
}
