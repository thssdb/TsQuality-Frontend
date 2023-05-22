<template>
  <div>
    <n-grid
      cols="1 s:2 m:3 l:4 xl:4 2xl:4"
      responsive="screen"
      :x-gap="12"
      :y-gap="8"
    >
      <n-grid-item>
        <n-card
          hoverable
          size="small"
          title="时间序列总数"
          :bordered="false"
          :segmented="{ content: true, footer: true }"
        >
          <template #header-extra>
            <n-tag type="success">序列</n-tag>
          </template>

          <div class="px-1 py-1">
            <n-skeleton v-if="loading" :width="100" size="medium" />
            <div v-else class="text-3xl">{{ data.series }}</div>
          </div>
        </n-card>
      </n-grid-item>

      <n-grid-item>
        <n-card
          hoverable
          size="small"
          title="设备总数"
          :bordered="false"
          :segmented="{ content: true, footer: true }"
        >
          <template #header-extra>
            <n-tag type="info">设备</n-tag>
          </template>

          <div class="px-1 py-1">
            <n-skeleton v-if="loading" :width="100" size="medium" />
            <div v-else class="text-3xl">{{ data.device }}</div>
          </div>
        </n-card>
      </n-grid-item>

      <n-grid-item>
        <n-card
          hoverable
          size="small"
          title="数据库总数"
          :bordered="false"
          :segmented="{ content: true, footer: true }"
        >
          <template #header-extra>
            <n-tag type="warning">数据</n-tag>
          </template>

          <div class="px-1 py-1">
            <n-skeleton v-if="loading" :width="100" size="medium" />
            <div v-else class="text-3xl">{{ data.database }}</div>
          </div>
        </n-card>
      </n-grid-item>

      <n-grid-item>
        <n-card
          hoverable
          size="small"
          title="历史分析总数"
          :bordered="false"
          :segmented="{ content: true, footer: true }"
        >
          <template #header-extra>
            <n-tag type="error">历史</n-tag>
          </template>

          <div class="px-1 py-1">
            <n-skeleton v-if="loading" :width="100" size="medium" />
            <div v-else class="text-3xl">{{ data.history }}</div>
          </div>
        </n-card>
      </n-grid-item>
    </n-grid>

    <n-card class="mt-4">
      <TimeSeriesCount />
    </n-card>

    <n-card class="mt-4" title="历史分析">
      <n-data-table
        striped
        :data="historyData"
        :bordered="false"
        :columns="columns"
      />
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { NButton } from 'naive-ui'
import { h, onMounted, ref } from 'vue'
import TimeSeriesCount from './components/TimeSeriesCount.vue'

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

const data = ref<any>({
  series: 46572,
  device: 6554,
  database: 724,
  history: 28,
})
const loading = ref(true)

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

onMounted(async () => {
  loading.value = false
})
</script>

<style scoped></style>
