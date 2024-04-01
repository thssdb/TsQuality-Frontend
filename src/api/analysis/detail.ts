import {
  TimestampAnomalyRequestDto,
  ValueAnomalyRequestDto,
} from '@/models/anomaly'
import { http } from '@/utils/axios'
import { TimestampAnomalyResponseDto, ValueAnomalyResponseDto } from '#/dto'

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
