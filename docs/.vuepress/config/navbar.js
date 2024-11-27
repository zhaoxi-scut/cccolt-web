import { defineNavbarConfig } from 'vuepress-theme-plume'

export default defineNavbarConfig([
  {
    text: '首页',
    icon: 'solar:home-2-linear',
    link: '/'
  },
  {
    text: '项目',
    icon: 'solar:pen-new-square-linear',
    link: '/projects/'
  },
  {
    text: '网络',
    icon: 'solar:shield-network-linear',
    link: '/proxy/'
  },
  {
    text: '教程',
    icon: 'solar:book-2-linear',
    link: '/tutorial/'
  },
  {
    text: '更多',
    icon: 'solar:menu-dots-circle-linear',
    items: [
      {
        text: '简介',
        icon: 'solar:info-circle-linear',
        link: '/guide.md'
      },
      {
        text: '喝杯奶茶',
        icon: 'solar:tea-cup-linear',
        link: '/donate.md'
      }
    ]
  },
  {
    text: 'Github',
    icon: 'mdi:github',
    link: 'https://github.com/zhaoxi-scut/cccolt-web'
  }
])
