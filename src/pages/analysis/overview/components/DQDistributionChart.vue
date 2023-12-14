<template>
  <n-card>
    <n-tabs type="line" animated>
      <n-tab-pane
        name="tab-result"
        :tab="$t('analysis.overview.pie_chart.title')"
      >
        <n-grid x-gap="12" y-gap="8" responsive="screen" cols="1">
          <n-grid-item>
            <v-chart autoresize :option="option" :style="{ width, height }" />
          </n-grid-item>
        </n-grid>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<script setup lang="ts">
import VChart from 'vue-echarts'
import { setupECharts } from '@/utils/lib/echarts'
import { computed, PropType, ref } from 'vue'
import { EChartsOption, SeriesOption } from 'echarts'
import { MetricEnum, MetricRangeEnum } from '@/enums/metricEnum'
import { DQDistribution } from '@/models/dqDistribution'
import {
  OptionDataValue,
  OptionSourceData,
  OptionSourceDataArrayRows,
} from 'echarts/types/src/util/types'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  distribution: {
    type: Object as PropType<DQDistribution>,
    required: true,
  },
})

setupECharts()

const width = '100%'
const height = '60vh'

const centers = [
  ['25%', '30%'],
  ['75%', '30%'],
  ['25%', '75%'],
  ['75%', '75%'],
]

const { t } = useI18n()
function metricToText(metric: MetricEnum) {
  return t(`global.data_quality.metrics.${metric.toLowerCase()}`)
}

const series: SeriesOption[] = Object.values(MetricEnum).map(
  (metric: MetricEnum, index: number) => {
    return {
      type: 'pie',
      radius: ['25%', '35%'],
      center: centers[index],
      encode: {
        itemName: 0,
        value: metric,
      },
      name: metricToText(metric),
      label: {
        position: 'inner',
        formatter: '{d}%',
      },
    }
  },
)

const metricDistributionFractionDigits = 3

/** @example
 * // example of return values:
 * [
 *   [
 *     'metric',
 *     MetricEnum.COMPLETENESS,
 *     MetricEnum.CONSISTENCY,
 *     MetricEnum.TIMELINESS,
 *     MetricEnum.VALIDITY,
 *   ],
 *   ['[0.0-0.6)', 0.2, 0.4, 0.1, 0.1],
 *   ['[0.6-0.7)', 0.3, 0.2, 0.4, 0.1],
 *   ['[0.7-0.8)', 0.1, 0.3, 0.2, 0.4],
 *   ['[0.8-0.9)', 0.1, 0.1, 0.3, 0.2],
 *   ['[0.9-1.0]', 0.4, 0.1, 0.1, 0.3],
 * ]
 */
function dqDistributionToSource(): OptionSourceData {
  const source: OptionSourceDataArrayRows = [
    ['metric', ...Object.values(MetricEnum)],
  ]
  for (const metricRange of Object.values(MetricRangeEnum)) {
    const row: OptionDataValue[] = [metricRange]
    for (const metric of Object.values(MetricEnum)) {
      const item = props.distribution.items.get(metric)!
      const value = item.metricRanges.get(metricRange)!
      row.push(value.toFixed(metricDistributionFractionDigits))
    }
    source.push(row)
  }
  return source
}
const source = computed(() => dqDistributionToSource())

const option = ref<EChartsOption>({
  series,
  legend: {},
  tooltip: {},
  label: {
    show: true,
    position: 'center',
  },
  dataset: {
    source: source as unknown as OptionSourceData,
  },
})
</script>
