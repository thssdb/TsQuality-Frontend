import { TimestampAnomalyRequestDto } from '@/models/timestampAnomaly'
import { http } from '@/utils/axios'
import { TimestampAnomalyResponseDto } from '#/dto'

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
