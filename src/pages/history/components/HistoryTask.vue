<template>
  <n-card class="mt-4" title="历史分析">
    <n-data-table
      remote
      striped
      :data="data"
      :bordered="false"
      :columns="columns"
      :loading="loading"
      :pagination="pagination"
      @update:page="handleTableDataPageChange"
    >
    </n-data-table>
  </n-card>
</template>

<script lang="ts" setup>
import { getTaskList } from '@/api/dashboard'
import { NButton } from 'naive-ui'
import { h, onMounted, reactive, ref } from 'vue'

onMounted(async () => {
  getData()
})

type Row = {
  tid: number
  time_series: string
  time_filter: string
  value_filter: string
  completeness: number
  consistency: number
  timeliness: number
  validity: number
}

let loading = ref(true)
const data = ref<Row>()
const pagination = reactive({
  page: 1,
  pageCount: 0,
  pageSize: 10,
  itemCount: 0,
})

const columns = [
  {
    title: 'No',
    key: 'no',
    align: 'center',
  },
  {
    title: '时间序列',
    key: 'time_series',
    align: 'center',
    resizable: true,
    minWidth: 100,
    maxWidth: 300,
  },
  {
    title: '时间条件',
    key: 'time_filter',
    align: 'center',
    resizable: true,
    minWidth: 100,
    maxWidth: 300,
  },
  {
    title: '值条件',
    key: 'value_filter',
    align: 'center',
    resizable: true,
    minWidth: 100,
    maxWidth: 300,
  },
  {
    title: '完整性',
    key: 'completeness',
    align: 'center',
  },
  {
    title: '一致性',
    key: 'consistency',
    align: 'center',
  },
  {
    title: '时效性',
    key: 'timeliness',
    align: 'center',
  },
  {
    title: '有效性',
    key: 'validity',
  },
  {
    title: '操作',
    key: 'action',
    render() {
      return h(
        NButton,
        {
          strong: true,
          tertiary: true,
          size: 'small',
        },
        { default: () => '删除' }
      )
    },
  },
]

const getData = (page_index: number = pagination.page) => {
  loading.value = true
  getTaskList({
    page_index,
    page_size: pagination.pageSize,
  })
    .then((res: any) => {
      loading.value = false
      pagination.page = page_index
      pagination.pageCount = res.data.page_count
      pagination.pageSize = res.data.page_size
      pagination.itemCount = res.data.total
      data.value = res.data.tasks.map((x: any, index: number) => {
        x.no = index + 1
        // TODO: convert start_time, end_time to time_filter
        x.time_filter =
          `${x.start_time != '0' ? `time > ${x.start_time}` : ''}` +
          `${x.end_time != '0' ? ` time < ${x.end_time}` : ''}`
        x.time_filter = x.time_filter === '' ? '/' : x.time_filter
        x.value_filter = x.value_filter === '' ? '/' : x.value_filter
        return x
      })
    })
    .catch((err) => {
      console.log(err)
      loading.value = false
    })
}

function handleTableDataPageChange(currentPage: number) {
  if (loading.value) {
    // still loading table data, ignore page change event
    return
  }
  getData(currentPage)
}
</script>
