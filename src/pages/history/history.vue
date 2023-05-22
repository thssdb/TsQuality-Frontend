<template>
  <n-card class="mt-4" title="历史分析">
    <n-data-table
      striped
      :bordered="false"
      :columns="columns"
      :data="historyData"
    >
    </n-data-table>
  </n-card>
</template>

<script setup lang="ts">
import { NButton } from 'naive-ui'
import { h, ref } from 'vue'

type Row = {
  no: number
  ts: string
  tf: string
  vf: string
  completeness: number
  consistency: number
  timeliness: number
  validity: number
}

const columns = [
  {
    title: 'No',
    key: 'no',
    align: 'center',
  },
  {
    title: '时间序列',
    key: 'ts',
    align: 'center',
    resizable: true,
    minWidth: 100,
    maxWidth: 300,
  },
  {
    title: '时间条件',
    key: 'tf',
    align: 'center',
    resizable: true,
    minWidth: 100,
    maxWidth: 300,
  },
  {
    title: '值条件',
    key: 'vf',
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

const historyData: Row[] = [
  {
    no: 1,
    ts: 'root.sg1.d1.s1',
    tf: '2023-04-21 00:00\n2023-04-22 00:00',
    vf: 's1 > 1000',
    completeness: 0.91,
    consistency: 0.83,
    timeliness: 0.64,
    validity: 0.72,
  },
  {
    no: 2,
    ts: 'root.sg1.d1.s1',
    tf: '/',
    vf: '/',
    completeness: 0.91,
    consistency: 0.83,
    timeliness: 0.64,
    validity: 0.72,
  },
  {
    no: 3,
    ts: 'root.sg1.d1.s1',
    tf: '2023-04-21 00:00\n2023-04-22 00:00',
    vf: '/',
    completeness: 0.91,
    consistency: 0.83,
    timeliness: 0.64,
    validity: 0.72,
  },
  {
    no: 4,
    ts: 'root.sg1.d1.s1',
    tf: '/',
    vf: 's1 > 1000',
    completeness: 0.91,
    consistency: 0.83,
    timeliness: 0.64,
    validity: 0.72,
  },
]
</script>
