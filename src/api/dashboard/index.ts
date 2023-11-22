import { http } from '@/utils/axios'

export async function getIoTDBConfigId(ic: IotDBConfig) {
  return http.request({
    url: '/iotdb-config',
    method: 'POST',
    data: ic,
  })
}

export async function getIoTDBAggregationInfo(id: number) {
  return http.request({
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
