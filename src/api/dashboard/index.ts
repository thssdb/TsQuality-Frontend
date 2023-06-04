import { http } from '@/utils/axios'

export async function getIoTDBAggregateInfo() {
  try {
    // TODO: icid
    const res = await http.request({
      url: '/1/aggregate-info',
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
