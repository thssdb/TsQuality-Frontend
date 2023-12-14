import { DataTableColumns, NButton } from 'naive-ui'
import i18n from '@/locales'
import { h } from 'vue'
import { DQOverviewItem } from '@/models/dqOverviewItem'

const { t } = i18n.global

export const createColumns = ({
  click,
}: {
  click: (row: DQOverviewItem) => void
}): DataTableColumns<DQOverviewItem> => {
  return [
    {
      title: t('dashboard.overview_table.columns.no.title'),
      key: 'id',
    },
    {
      title: t('dashboard.overview_table.columns.name.title'),
      key: 'name',
    },
    {
      title: t('dashboard.overview_table.columns.data_size.title'),
      key: 'dataSize',
    },
    {
      title: t('global.data_quality.metrics.completeness'),
      key: 'completeness',
    },
    {
      title: t('global.data_quality.metrics.consistency'),
      key: 'consistency',
    },
    {
      title: t('global.data_quality.metrics.timeliness'),
      key: 'timeliness',
    },
    {
      title: t('global.data_quality.metrics.validity'),
      key: 'validity',
    },
    {
      title: t('dashboard.overview_table.columns.action.title'),
      key: 'action',
      render(row: DQOverviewItem) {
        return h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: 'small',
            onClick: () => click(row),
          },
          {
            default: () => t('dashboard.overview_table.columns.action.content'),
          },
        )
      },
    },
  ]
}
