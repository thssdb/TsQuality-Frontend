<template>
  <n-grid
    class="mb-6"
    cols="1 s:2 m:3 l:4 xl:4 2xl:4"
    responsive="screen"
    :x-gap="gridItemXGap"
    :y-gap="gridItemYGap"
  >
    <n-grid-item>
      <AggregationInfoItem
        tag-type="success"
        :title="$t('dashboard.total_count.data_points.title')"
        :tag="$t('dashboard.total_count.data_points.tag')"
        :content="aggregationInfo.numDataPoints"
        :show-separator="true"
        :is-loading="isAggregationInfoLoading"
      />
    </n-grid-item>

    <n-grid-item>
      <AggregationInfoItem
        tag-type="info"
        :title="$t('dashboard.total_count.time_series.title')"
        :tag="$t('dashboard.total_count.time_series.tag')"
        :content="aggregationInfo.numTimeSeries"
        :show-separator="true"
        :is-loading="isAggregationInfoLoading"
      />
    </n-grid-item>

    <n-grid-item>
      <AggregationInfoItem
        tag-type="warning"
        :title="$t('dashboard.total_count.device.title')"
        :tag="$t('dashboard.total_count.device.tag')"
        :content="aggregationInfo.numDevices"
        :show-separator="true"
        :is-loading="isAggregationInfoLoading"
      />
    </n-grid-item>

    <n-grid-item>
      <AggregationInfoItem
        tag-type="error"
        :title="$t('dashboard.total_count.database.title')"
        :tag="$t('dashboard.total_count.database.tag')"
        :content="aggregationInfo.numDatabases"
        :show-separator="true"
        :is-loading="isAggregationInfoLoading"
      />
    </n-grid-item>
  </n-grid>

  <n-grid
    class="mb-4"
    cols="1 s:2 m:3 l:4 xl:4 2xl:4"
    responsive="screen"
    :x-gap="gridItemXGap"
    :y-gap="gridItemYGap"
  >
    <n-grid-item>
      <AggregationInfoItem
        :title="$t('global.data_quality.metrics.completeness')"
        :content="aggregationInfo.completeness"
        :precision="3"
        :is-loading="isAggregationInfoLoading"
      />
    </n-grid-item>

    <n-grid-item>
      <AggregationInfoItem
        :title="$t('global.data_quality.metrics.consistency')"
        :content="aggregationInfo.consistency"
        :precision="3"
        :is-loading="isAggregationInfoLoading"
      />
    </n-grid-item>

    <n-grid-item>
      <AggregationInfoItem
        :title="$t('global.data_quality.metrics.timeliness')"
        :content="aggregationInfo.timeliness"
        :precision="3"
        :is-loading="isAggregationInfoLoading"
      />
    </n-grid-item>

    <n-grid-item>
      <AggregationInfoItem
        :title="$t('global.data_quality.metrics.validity')"
        :content="aggregationInfo.validity"
        :precision="3"
        :is-loading="isAggregationInfoLoading"
      />
    </n-grid-item>
  </n-grid>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import AggregationInfoItem from './AggregationInfoItem.vue'
import { AggregationInfo } from '@/models/dataQuality'

const gridItemXGap = 12
const gridItemYGap = 8

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
