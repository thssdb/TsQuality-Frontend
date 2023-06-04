import { getQueryParam } from '@/utils/urlUtils'
import Mock from 'mockjs'

const GLOB_API_URL = 'http://mock'
const GLOB_API_PREFIX = GLOB_API_URL + '/api/'

const API = {
  IoTDB_CONFIG_API: {
    GET_TASKS: new RegExp(`${GLOB_API_PREFIX}\\d+\/tasks`),
    GET_AGGREGATE_INFO: new RegExp(`${GLOB_API_PREFIX}\\d+/aggregate-info`),
    GET_TIME_SERIES_DATA_SIZE: new RegExp(
      `${GLOB_API_PREFIX}\\d+/ts-data-size`
    ),
  },
}

Mock.setup({
  timeout: 1500,
})

const Random = Mock.Random

// Mock.mock(API.IoTDB_CONFIG_API.GET_TASKS, 'get', {
//   code: 0,
//   type: 'success',
//   message: 'get success',
//   data: {
//     'tasks|10-50': [
//       {
//         tid: '@increment',
//         icid: 1,
//         time_series: 'root.@word(3, 6).@word(3, 6).@word(3, 6)',
//         'start_time|1': ['@date("T")', '0'],
//         'end_time|1': ['@date("T")', '0'],
//         value_filter: '@word(0, 15)',
//         'completeness|0-0.1-2': 1,
//         'consistency|0-0.1-2': 1,
//         'timeliness|0-0.1-2': 1,
//         'validity|0-0.1-2': 1,
//       },
//     ],
//   },
// })

// /{icid}/tasks
Mock.mock(API.IoTDB_CONFIG_API.GET_TASKS, 'get', ({ url }) => {
  // total number of tasks
  const total = 100
  const pageSize = getQueryParam(url, 'page_size')
  const pageIndex = getQueryParam(url, 'page_index')
  if (pageSize && isNaN(+pageSize)) {
    return {
      code: -1,
      type: 'error',
      message: 'incorrect page_size',
    }
  }
  if (pageIndex && isNaN(+pageIndex)) {
    return {
      code: -1,
      type: 'error',
      message: 'incorrect page_index',
    }
  }
  // pagination or not
  const pagination = !!pageSize
  // number of tasks: { pageSize } or [10 - 50)
  const taskNums = pagination ? +pageSize : Math.random() * (50 - 10) + 10
  const tasks = []
  for (let i = 0; i < taskNums; i++) {
    tasks.push({
      tid: Random.increment(),
      icid: 1,
      time_series: `root.${Random.word(3, 6)}.${Random.word(
        3,
        6
      )}.${Random.word(3, 6)}`,
      start_time: Random.pick(['0', Random.date('T')]),
      end_time: Random.pick(['0', Random.date('T')]),
      value_filter: Random.word(0, 15),
      completeness: Random.float(0, 0, 0, 99),
      consistency: Random.float(0, 0, 0, 99),
      timeliness: Random.float(0, 0, 0, 99),
      validity: Random.float(0, 0, 0, 99),
    })
  }

  return {
    code: 0,
    type: 'success',
    message: 'get success',
    data: {
      tasks,
      total,
      page_index: pageIndex,
      page_size: pageSize ? +pageSize : total,
      page_count: pageSize ? total / +pageSize : 1,
    },
  }
})

// /{icid}/aggregate-info
Mock.mock(API.IoTDB_CONFIG_API.GET_AGGREGATE_INFO, 'get', {
  code: 0,
  type: 'success',
  message: 'get success',
  data: {
    time_series_num: '@integer(10000, 100000)',
    device_num: '@integer(1000, 10000)',
    database_num: '@integer(100, 1000)',
    analysis_num: '@integer(20, 100)',
  },
})

Mock.mock(API.IoTDB_CONFIG_API.GET_TIME_SERIES_DATA_SIZE, 'get', ({ url }) => {
  // total number of time series
  const total = 100
  const pageSize = getQueryParam(url, 'page_size')
  const pageIndex = getQueryParam(url, 'page_index')
  if (pageSize && isNaN(+pageSize)) {
    return {
      code: -1,
      type: 'error',
      message: 'incorrect page_size',
    }
  }
  if (!pageIndex || isNaN(+pageIndex)) {
    return {
      code: -1,
      type: 'error',
      message: 'incorrect page_index',
    }
  }
  // pagination or not
  const pagination = !!pageSize
  // number of timeseries: { pageSize } or [50-100]
  const tsNums = pagination ? +pageSize : Math.random() * (100 - 50) + 50
  const info = []
  for (let i = 0; i < tsNums; i++) {
    info.push({
      name: `root.${Random.word(3, 6)}.${Random.word(3, 6)}.${Random.word(
        3,
        6
      )}`,
      data_size: Random.integer(10000, 100000),
    })
  }
  // sort in descending order according to data_size
  info.sort((a, b) => b.data_size - a.data_size)

  return {
    code: 0,
    type: 'success',
    message: 'get success',
    data: {
      info,
      total,
      page_index: +pageIndex,
      page_count: pagination ? total / +pageSize : 1,
    },
  }
})
