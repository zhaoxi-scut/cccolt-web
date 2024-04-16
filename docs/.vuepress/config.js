import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'
import {
  sidebarData,
  navbarData,
  headData
} from './config/index'

export default defineUserConfig({
  lang: 'zh-CN',

  title: 'Cccolt 个人主页',
  description: '带你快速了解 Cccolt 的个人信息',
  head: headData,
  theme: defaultTheme({
    hostname: 'https://www.cccolt.top',
    logo: '/images/favicon.png',
    navbar: navbarData,
    sidebar: sidebarData,
    sidebarDepth: 3,
    // theme-level locales config
    locales: {
      '/': {
        // custom containers
        tip: '提示',
        warning: '注意',
        danger: '警告',
        // page meta
        lastUpdatedText: '上次更新',
        contributorsText: '贡献者',
        // 404 page
        notFound: [
          '未找到该页面 o(╥﹏╥)o'
        ],
        backToHome: '返回首页 ←',
        // a11y
        openInNewWindow: '在新窗口打开',
        toggleColorMode: '切换颜色模式',
        toggleSidebar: '切换侧边栏',
      }
    }
  }),

  bundler: viteBundler(),
})
