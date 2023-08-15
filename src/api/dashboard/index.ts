import { http } from '@/utils/axios'

export async function getIoTDBConfigId(ic: IotDBConfig) {
  try {
    const res = await http.request({
      url: '/iotdb-config',
      method: 'POST',
      data: ic,
    })
    return res
  } catch (err) {
    throw err
  }
}

export async function getIoTDBAggregateInfo(icid: number) {
  try {
    // TODO: icid
    const res = await http.request({
      url: `/iotdb-config/${icid}/aggregation-info`,
    })
    return res
  } catch (err) {
    throw err
  }
}

export async function getTSDataSize(params?: object) {
  try {
    // TODO: icid
    const res = await http.request({
      url: '/1/ts-data-size',
      params,
    })
    return res
  } catch (err) {
    throw err
  }
}

export async function getTaskList(params?: object) {
  try {
    // TODO: icid
    const res = await http.request({
      url: '/1/tasks',
      params,
    })
    return res
  } catch (err) {
    throw err
  }
}
