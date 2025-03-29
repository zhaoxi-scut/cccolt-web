import { plumeTheme } from 'vuepress-theme-plume'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { headData } from './config/head.js'
import navbar from './config/navbar.js'
import notes from './config/sidebar.js'

export default defineUserConfig({
  lang: 'zh-CN',

  title: 'Cccolt 个人主页',
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
        languages: ['bash', 'json', 'cmake', 'cpp', 'makefile', 'shell', 'python']
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
          code: 404,
          title: '未找到该页面 o(╥﹏╥)o',
          quote: '不是所有的旅行都有终点，不是所有的 404 都是错误',
          linkText: '返回首页 ←'
        },
      }
    }
  }),

  bundler: viteBundler(),
})
