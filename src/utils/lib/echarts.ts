import { use } from 'echarts/core'
import { BarChart, LineChart } from 'echarts/charts'
import {
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

    SVGRenderer,

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
