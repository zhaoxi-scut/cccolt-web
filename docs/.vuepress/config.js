import { plumeTheme } from 'vuepress-theme-plume'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { headData } from './config/head.js'
import navbar from './config/navbar.js'
import notes from './config/sidebar.js'

export default defineUserConfig({
  lang: 'zh-CN',

  title: 'Cccolt 个人主页',
  description: '带你快速了解 Cccolt 的个人信息',
  head: headData,
  theme: plumeTheme({
    hostname: 'https://www.cccolt.top',
    logo: '/images/favicon.png',
    docsRepo: 'zhaoxi-scut/cccolt-web',
    docsBranch: 'master',
    docsDir: 'docs',

    navbar,
    notes,

    plugins: {
      shiki: {
        languages: ['bash', 'json', 'cmake', 'cpp', 'makefile', 'shell']
      },
      markdownPower: {
        bilibili: true
      }
    },

    autoFrontmatter: false,

    // theme-level locales config
    locales: {
      '/': {
        // page meta
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdatedText: '上次更新',
        contributorsText: '贡献者',
        // 404 page
        notFound: {
          title: '未找到该页面 o(╥﹏╥)o',
          linkText: '返回首页 ←'
        },
      }
    }
  }),

  bundler: viteBundler(),
})
