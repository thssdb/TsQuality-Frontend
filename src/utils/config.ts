import { MenuOption } from 'naive-ui'
import { h } from 'vue'

export const topMenuList: MenuOption[] = [
  {
    label: () =>
      h(
        'a',
        {
          href: '',
          target: '_blank',
          rel: 'noopenner noreferrer',
        },
        '仪表盘'
      ),
    key: 'dashboard',
  },
  {
    label: '分析页',
    key: 'pinball-1973',
    disabled: true,
  },
  {
    label: '寻羊冒险记',
    key: 'a-wild-sheep-chase',
  },
  {
    label: '舞，舞，舞',
    key: 'dance-dance-dance',
  },
]
