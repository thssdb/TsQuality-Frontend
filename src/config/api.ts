const GLOB_API_URL = 'http://mock'
const GLOB_API_PREFIX = GLOB_API_URL + '/api'

export const iotdbConfigAPIs = {
  tasks: `${GLOB_API_PREFIX}/tasks`,
  getAllTask: (icid: number) => {
    return `${GLOB_API_PREFIX}/${icid}/tasks`
  },
}
