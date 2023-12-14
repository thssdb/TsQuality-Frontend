<template>
  <v-chart
    autoresize
    :option="dataSizeBarChartOption"
    :style="{ width, height }"
  />
  <v-chart
    autoresize
    :option="dataQualityBarChartOption"
    :style="{ width, height }"
  />
</template>

<script setup lang="ts">
import VChart from 'vue-echarts'
import { setupECharts } from '@/utils/lib/echarts'
import { computed, onMounted, PropType, reactive, ref } from 'vue'
import { EChartsOption } from 'echarts'
import { useI18n } from 'vue-i18n'
import { getDQAggregationDetail } from '@/api/analysis/overview'
import { DQAggregationDetailItemDto } from '#/dto'
import {
  DQAggregationDetailItem,
  DQAggregationDetailItemBuilder,
} from '@/models/dqAggregationDetailItem'
import { DQAggregationType } from '@/models/dqAggregationType'
import { DQDistribution, DQDistributionItem } from '@/models/dqDistribution'
import { MetricEnum } from '@/enums/metricEnum'

const props = defineProps({
  type: {
    type: String as PropType<
      DQAggregationType.DAY | DQAggregationType.MONTH | DQAggregationType.YEAR
    >,
    required: true,
  },
})

const emit = defineEmits<{
  change: [type: DQDistribution, DQAggregationDetailItem[]]
}>()

setupECharts()

const { t } = useI18n()

const width = '100%'
const height = '30vh'

const dataSizeXAxisData = ref<string[]>([])
const dataSizeYAxisData = ref<bigint[]>([])
const dataSizeBarChartOption = reactive<EChartsOption>({
  title: {
    left: 'center',
    text: t('analysis.overview.aggregation.data_size.bar_chart.title'),
  },
  xAxis: {
    data: dataSizeXAxisData as unknown as string[],
  },
  yAxis: {},
  series: {
    type: 'bar',
    name: t('analysis.overview.aggregation.data_size.bar_chart.title'),
    data: dataSizeYAxisData as unknown as number[],
  },
  grid: {
    left: '2%',
    right: '2%',
  },
  tooltip: {
    show: true,
  },
})

const dataQualityXAxisData = ref<string[]>([])
const dataQualityYAxisData = ref<DQAggregationDetailItem[]>([])
const completenessData = computed(() => {
  return dataQualityYAxisData.value.map((item) => item.completeness)
})
const consistencyData = computed(() => {
  return dataQualityYAxisData.value.map((item) => item.consistency)
})
const timelinessData = computed(() => {
  return dataQualityYAxisData.value.map((item) => item.timeliness)
})
const validityData = computed(() => {
  return dataQualityYAxisData.value.map((item) => item.validity)
})
const dataQualityBarChartOption = reactive<EChartsOption>({
  title: {
    left: 'center',
    text: t('analysis.overview.aggregation.data_quality.bar_chart.title'),
  },
  xAxis: {
    data: dataQualityXAxisData as unknown as string[],
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      name: t('global.data_quality.metrics.completeness'),
      data: completenessData as unknown as object[],
    },
    {
      type: 'bar',
      name: t('global.data_quality.metrics.consistency'),
      data: consistencyData as unknown as object[],
    },
    {
      type: 'bar',
      name: t('global.data_quality.metrics.timeliness'),
      data: timelinessData as unknown as object[],
    },
    {
      type: 'bar',
      name: t('global.data_quality.metrics.validity'),
      data: validityData as unknown as object[],
    },
  ],
  tooltip: {
    show: true,
  },
})

const valueDigits = 3
async function getDQAggregationData() {
  try {
    const res = await getDQAggregationDetail(props.type)
    dataSizeXAxisData.value = res.data.map(
      (item: DQAggregationDetailItemDto) => item.time,
    )
    dataSizeYAxisData.value = res.data.map(
      (item: DQAggregationDetailItemDto) => item.dataSize,
    )
    dataQualityXAxisData.value = res.data.map(
      (item: DQAggregationDetailItemDto) => item.time,
    )
    dataQualityYAxisData.value = res.data.map(
      (item: DQAggregationDetailItemDto) =>
        new DQAggregationDetailItemBuilder()
          .setTime(item.time)
          .setDataSize(item.dataSize)
          .setCompleteness(+item.completeness.toFixed(valueDigits))
          .setConsistency(+item.consistency.toFixed(valueDigits))
          .setTimeliness(+item.timeliness.toFixed(valueDigits))
          .setValidity(+item.validity.toFixed(valueDigits))
          .build(),
    )
  } catch (err) {
    console.log(err)
  }
}

function dqYAxisDataToDQDistribution(): DQDistribution {
  const items = new Map<MetricEnum, DQDistributionItem>()
  items.set(
    MetricEnum.COMPLETENESS,
    new DQDistributionItem(completenessData.value),
  )
  items.set(
    MetricEnum.CONSISTENCY,
    new DQDistributionItem(consistencyData.value),
  )
  items.set(MetricEnum.TIMELINESS, new DQDistributionItem(timelinessData.value))
  items.set(MetricEnum.VALIDITY, new DQDistributionItem(validityData.value))
  return new DQDistribution(items)
}

onMounted(async () => {
  await getDQAggregationData()
  const dqDistribution = dqYAxisDataToDQDistribution()
  emit('change', dqDistribution, dataQualityYAxisData.value)
})
</script>
