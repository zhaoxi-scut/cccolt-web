// export const sidebarData = {
//   '/projects/rmvl/': [
//     {
//       text: 'RMVL',
//       children: [
//         '/projects/rmvl/',
//         '/projects/rmvl/quick_start',
//         '/projects/rmvl/doc_navigation'
//       ]
//     }
//   ],
//   '/projects/repo': [
//     {
//       text: '个人 Debian 软件源',
//       children: [
//         '/projects/repo/install',
//         '/projects/repo/software',
//       ]
//     }
//   ],
//   '/proxy/': [
//     '/proxy/',
//     '/proxy/client',
//     '/proxy/server'
//   ],
//   '/tutorial/git/': [
//     {
//       text: 'Git 教程',
//       children: [
//         '/tutorial/git/01',
//         '/tutorial/git/02',
//         '/tutorial/git/03'
//       ]
//     }
//   ],
//   '/tutorial/cmake/': [
//     {
//       text: '现代 CMake 教程',
//       children: [
//         '/tutorial/cmake/01',
//         '/tutorial/cmake/02',
//         '/tutorial/cmake/03',
//         '/tutorial/cmake/04',
//         '/tutorial/cmake/05',
//         '/tutorial/cmake/06',
//         '/tutorial/cmake/07',
//         '/tutorial/cmake/08',
//         '/tutorial/cmake/09',
//         '/tutorial/cmake/10',
//         '/tutorial/cmake/11',
//         '/tutorial/cmake/12',
//         '/tutorial/cmake/13'
//       ]
//     }
//   ]
// };

import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume'

const projects = defineNoteConfig({
  dir: 'projects',
  link: '/projects/',
  sidebar: [
    {
      text: 'RMVL',
      items: [
        'rmvl/',
        'rmvl/quick_start',
        'rmvl/doc_navigation'
      ]
    },
    {
      text: '软件源',
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
    '',
    'client',
    'server'
  ]
});

const tutorial = defineNoteConfig({
  dir: 'tutorial',
  link: '/tutorial/',
  sidebar: [
    {
      text: 'Git 教程',
      items: [
        'git/01',
        'git/02',
        'git/03'
      ]
    },
    {
      text: '现代 CMake 教程',
      items: [
        'cmake/',
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
      ]
    }
  ]
});

export default defineNotesConfig({
  dir: '/',
  link: '/',
  notes: [projects, proxy, tutorial]
});
