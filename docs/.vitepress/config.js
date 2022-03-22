import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Manager UI 和 Explorer UI 功能交互文档',
  description: 'Manager UI 和 Explorer UI 功能交互文档，作为UI开发者开发功能升级版本的参考',
  lang: 'zh-hans',
  base: '/',
  themeConfig: {
    nav: [
      {
        text: '帮助',
        link: '/help',
        activeMatch: '^/help$'
      },
      {
        text: '简介',
        link: '/',
        activeMatch: '^/$'
      },
      {
        text: 'Manager UI',
        link: '/managerUI/',
        activeMatch: '^/managerUI/'
      },
      {
        text: 'Explorer UI',
        link: '/explorerUI/',
        activeMatch: '^/explorerUI/'
      }
    ],
    sidebar: {
      '/managerUI/': getManagerUISidebar(),
      '/explorerUI/': getExplorerUISidebar(),
      '/help': getHelpSidebar(),
      '/': getIntroductionSidebar()
    },
  },
})

function getIntroductionSidebar() {
  return [
    {
      text: '简介',
      children: [
        {
          text: '功能交互文档说明',
          link: '/'

        },
      ],
    }
  ]
}

function getHelpSidebar() {
  return [
    {
      text: '帮助',
      link: '/help'
    }
  ]
}

function getManagerUISidebar() {
  return [
    {
      text: 'Manger UI 介绍',
      link: '/managerUI/'
    },
    {
      text: '新增功能',
      link: '/managerUI/features/index',
      children: [
        {
          text: '容器环境变量配置',
          link: '/managerUI/features/env-vars/'
        },
      ],
    },
    {
      text: 'Bug Fixes',
      link: '/managerUI/bugfixes/index'
    },
   
  ]
}
function getExplorerUISidebar() {
  return [
    {
      text: 'Explorer UI 介绍',
      link: '/explorerUI/'
    },
    {
      text: '新增功能',
      link: '/explorerUI/features/index',
      children: [
        {
          text: '密文卷/配置映射卷条目路径设置',
          link: '/explorerUI/features/key-to-path/'
        },
        {
          text: '容器默认资源限制',
          link: '/explorerUI/features/container-resource-limit/'
        }
      ],
    },
    {
      text: 'Bug Fixes',
      link: '/explorerUI/bugfixes/index'
    },
  ]
}
