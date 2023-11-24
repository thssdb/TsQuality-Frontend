import { http } from '@/utils/axios'
import { AggregationInfo } from '@/models/dataQuality'

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

export async function getTSDataSize(params?: object) {
  return http.request({
    url: '/1/ts-data-size',
    params,
  })
}

export async function getTaskList(params?: object) {
  return http.request({
    url: '/1/tasks',
    params,
  })
}
