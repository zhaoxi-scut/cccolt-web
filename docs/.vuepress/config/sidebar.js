import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume'

const projects = defineNoteConfig({
  dir: 'projects',
  link: '/projects/',
  sidebar: [
    {
      text: 'RMVL',
      icon: '/images/rmvl.png',
      items: [
        'rmvl/',
        'rmvl/quick_start',
        'rmvl/doc_navigation'
      ]
    },
    {
      text: '软件源',
      icon: 'solar:database-linear',
      items: [
        'repo/',
        'repo/install',
        'repo/software',
      ]
    }
  ]
});

const proxy = defineNoteConfig({
  dir: 'proxy',
  link: '/proxy/',
  sidebar: [
    {
      text: '网络代理',
      icon: 'clarity:network-settings-line',
      items: [
        '',
        'client',
        'server'
      ]
    }
  ]
});

const tutorial = defineNoteConfig({
  dir: 'tutorial',
  link: '/tutorial/',
  sidebar: [
    {
      text: '现代 C++ 教程',
      icon: 'mdi:language-cpp',
      link: 'cpp/',
      items: [
        'cpp/01',
        'cpp/02',
        'cpp/03',
        'cpp/04'
      ],
      collapsed: true
    },
    {
      text: '现代 CMake 教程',
      icon: 'devicon-plain:cmake',
      link: 'cmake/',
      items: [
        'cmake/01',
        'cmake/02',
        'cmake/03',
        'cmake/04',
        'cmake/05',
        'cmake/06',
        'cmake/07',
        'cmake/08',
        'cmake/09',
        'cmake/10',
        'cmake/11',
        'cmake/12',
        'cmake/13'
      ],
      collapsed: true
    },
    {
      text: 'Git 教程',
      icon: 'devicon-plain:git',
      link: 'git/',
      items: [
        'git/01',
        'git/02',
        'git/03'
      ],
      collapsed: true
    },
    {
      text: '附录',
      items: [
        {
          text: 'Git 附录'
        },
        {
          text: 'CMake 附录',
          items: [
            { text: 'OpenCVModules', link: 'cmake/10/OpenCVModules.cmake' },
            { text: 'OpenCVModules-release', link: 'cmake/10/OpenCVModules-release.cmake' },
            { text: 'OpenCVConfig', link: 'cmake/10/OpenCVConfig.cmake' }
          ]
        }
      ],
      collapsed: true
    }
  ]
});

export default defineNotesConfig({
  dir: '/',
  link: '/',
  notes: [projects, proxy, tutorial]
});
