<template>
  <n-grid
    cols="1 s:2 m:3 l:4 xl:4 2xl:4"
    responsive="screen"
    :x-gap="12"
    :y-gap="8"
  >
    <n-grid-item>
      <AggregationInfoItem
        tag-type="success"
        :title="$t('dashboard.total_count.data_points.title')"
        :tag="$t('dashboard.total_count.data_points.tag')"
        :content="aggregationInfo.num_data_points"
        :is-loading="isAggregationInfoLoading"
      />
    </n-grid-item>

    <n-grid-item>
      <AggregationInfoItem
        tag-type="info"
        :title="$t('dashboard.total_count.time_series.title')"
        :tag="$t('dashboard.total_count.time_series.tag')"
        :content="aggregationInfo.num_time_series"
        :is-loading="isAggregationInfoLoading"
      />
    </n-grid-item>

    <n-grid-item>
      <AggregationInfoItem
        tag-type="warning"
        :title="$t('dashboard.total_count.device.title')"
        :tag="$t('dashboard.total_count.device.tag')"
        :content="aggregationInfo.num_devices"
        :is-loading="isAggregationInfoLoading"
      />
    </n-grid-item>

    <n-grid-item>
      <AggregationInfoItem
        tag-type="error"
        :title="$t('dashboard.total_count.database.title')"
        :tag="$t('dashboard.total_count.database.tag')"
        :content="aggregationInfo.num_databases"
        :is-loading="isAggregationInfoLoading"
      />
    </n-grid-item>
  </n-grid>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import AggregationInfoItem from './AggregationInfoItem.vue'

type AggregationInfo = {
  num_data_points: number
  num_time_series: number
  num_devices: number
  num_databases: number
}

defineProps({
  aggregationInfo: {
    type: Object as PropType<AggregationInfo>,
    required: true,
  },
  isAggregationInfoLoading: {
    type: Boolean,
  },
})
</script>
