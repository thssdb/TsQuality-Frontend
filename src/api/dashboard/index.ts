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

export async function getIoTDBAggregationInfo() {
  return http.request<AggregationInfo>({
    url: `/iotdb/overall-data-profile`,
  })
}

export async function getDataQualityOverview(type: string = 'time-series') {
  return http.request<Array<DQOverviewDto>>({
    url: `/iotdb/${type}/overview`,
  })
}

export async function getLatestTimeSeriesPaths(
  path: string,
  limit: number = 10,
) {
  return http.request<Array<string>>({
    url: `/iotdb/time-series/latest`,
    params: {
      path,
      limit,
    },
  })
}

export async function getTimeSeriesRecentData(
  path: string = '',
  limit: number = 100,
) {
  return http.request<TimeSeriesRecentDataDto>({
    url: `/iotdb/time-series/data`,
    params: {
      path,
      limit,
    },
  })
}
