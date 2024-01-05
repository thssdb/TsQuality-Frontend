import { http } from '@/utils/axios'
import { DQAggregationDetailDto } from '#/dto'

export async function getDQAggregationDetail(type: string) {
  return http.request<DQAggregationDetailDto>({
    url: '/time-series/data-quality/aggregation',
    method: 'GET',
    params: {
      type,
    },
  })
}
