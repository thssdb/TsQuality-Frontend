import { http } from '@/utils/axios'
import { AggregateDQDto } from '#/dto'
import { AggregateDqRequestDto } from '@/models/dataQuality'

export async function getDQAggregationDetail(request: AggregateDqRequestDto) {
  return http.request<AggregateDQDto>({
    url: '/time-series/data-quality/aggregation',
    method: 'GET',
    params: {
      path: request.path,
      type: request.type,
      startTime: request.startTimestamp,
      endTime: request.endTimestamp,
    },
  })
}

export async function getDataSizeDistribution(request: AggregateDqRequestDto) {
  return http.request<AggregateDQDto>({
    url: '/time-series/data-quality/data-size',
    method: 'GET',
    params: {
      path: request.path,
      type: request.type,
      startTime: request.startTimestamp,
      endTime: request.endTimestamp,
    },
  })
}
