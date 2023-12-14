import {
  MetricEnum,
  MetricRangeEnum,
  numberToMetricRange,
} from '@/enums/metricEnum'

export class DQDistribution {
  items: Map<MetricEnum, DQDistributionItem>

  constructor(items: Map<MetricEnum, DQDistributionItem>) {
    this.items = items
  }

  static default(): DQDistribution {
    const items = new Map<MetricEnum, DQDistributionItem>()
    for (const metric of Object.values(MetricEnum)) {
      items.set(metric, new DQDistributionItem([0]))
    }
    return new DQDistribution(items)
  }
}

export class DQDistributionItem {
  metricRanges: Map<MetricRangeEnum, number>

  constructor(metrics: number[]) {
    this.metricRanges = this.countMetricRanges(metrics)
  }

  private countMetricRanges(metrics: number[]): Map<MetricRangeEnum, number> {
    const counters = {
      [MetricRangeEnum.LOWEST]: 0,
      [MetricRangeEnum.LOW]: 0,
      [MetricRangeEnum.MEDIUM]: 0,
      [MetricRangeEnum.HIGH]: 0,
      [MetricRangeEnum.HIGHEST]: 0,
    }

    for (const metric of metrics) {
      const metricRange = numberToMetricRange(metric)
      counters[metricRange]++
    }

    const total = metrics.length
    const metricRanges = new Map<MetricRangeEnum, number>()
    for (const [metricRange, count] of Object.entries(counters)) {
      metricRanges.set(metricRange as MetricRangeEnum, count / total)
    }

    return metricRanges
  }
}
