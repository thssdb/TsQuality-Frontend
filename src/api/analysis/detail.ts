import {
  TimestampAnomalyRequestDto,
  ValueAnomalyRequestDto,
} from '@/models/anomaly'
import { http } from '@/utils/axios'
import {
  TimeSeriesTimeOverviewDto,
  TimestampAnomalyResponseDto,
  ValueAnomalyResponseDto,
} from '#/dto'

export async function getTimeseriesTimeOverview(path: string) {
  return http.request<TimeSeriesTimeOverviewDto>({
    url: '/time-series/overview',
    method: 'get',
    params: { path },
  })
}

export async function timestampAnomalyQuery(
  request: TimestampAnomalyRequestDto,
) {
  return http.request<TimestampAnomalyResponseDto>({
    url: '/timestamp-anomaly',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    method: 'post',
    data: {
      path: request.path,
      startTimestamp: request.startTimestamp,
      endTimestamp: request.endTimestamp,
      method: request.method,
      interval: request.interval,
    },
  })
}

export async function valueAnomalyQuery(request: ValueAnomalyRequestDto) {
  return http.request<ValueAnomalyResponseDto>({
    url: '/value-anomaly',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    method: 'post',
    data: {
      path: request.path,
      startTimestamp: request.startTimestamp,
      endTimestamp: request.endTimestamp,
      method: request.method,
      args: request.args,
    },
  })
}
