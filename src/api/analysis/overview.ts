import { http } from '@/utils/axios'
import { DQAggregationDetailItemDto } from '#/dto'

export async function getDQAggregationDetail(type: string) {
  return http.request<DQAggregationDetailItemDto[]>({
    url: '/time-series/data-quality/aggregation',
    method: 'GET',
    params: {
      type,
    },
  })
}
