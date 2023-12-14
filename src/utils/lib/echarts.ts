import { use } from 'echarts/core'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import {
  DatasetComponent,
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  RadarComponent,
  TimelineComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
} from 'echarts/components'

import { SVGRenderer } from 'echarts/renderers'

export function setupECharts() {
  use([
    BarChart,
    LineChart,
    PieChart,

    SVGRenderer,

    DatasetComponent,
    DataZoomComponent,
    GridComponent,
    LegendComponent,
    RadarComponent,
    TimelineComponent,
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
  ])
}
