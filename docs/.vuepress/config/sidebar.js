import { defaultTheme } from '@vuepress/theme-default'

export const sidebarData = {
  '/projects/rmvl/': [
    {
      text: 'RMVL',
      children: [
        '/projects/rmvl/',
        '/projects/rmvl/quick_start',
        '/projects/rmvl/doc_navigation'
      ]
    }
  ],
  '/projects/repo': [
    {
      text: '个人 Debian 软件源',
      children: [
        '/projects/repo/install',
        '/projects/repo/software',
      ]
    }
  ],
  '/proxy/': [
    '/proxy/',
    '/proxy/client',
    '/proxy/server'
  ],
  '/tutorial/git/': [
    {
      text: 'Git 教程',
      children: [
        '/tutorial/git/01',
        '/tutorial/git/02',
        '/tutorial/git/03'
      ]
    }
  ],
  '/tutorial/cmake/': [
    {
      text: '现代 CMake 教程',
      children: [
        '/tutorial/cmake/01',
        '/tutorial/cmake/02',
        '/tutorial/cmake/03',
        '/tutorial/cmake/04',
        '/tutorial/cmake/05',
        '/tutorial/cmake/06',
        '/tutorial/cmake/07',
        '/tutorial/cmake/08',
        '/tutorial/cmake/09',
        '/tutorial/cmake/10',
        '/tutorial/cmake/11',
        '/tutorial/cmake/12',
        '/tutorial/cmake/13'
      ]
    }
  ]
};